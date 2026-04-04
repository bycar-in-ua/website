import { defineStore } from "pinia";
import * as v from "valibot";
import { useMutation } from "@tanstack/vue-query";
import { phoneSchema, defaultMandatoryStringMessage } from "#shared/validation";
import type { RequestFormProps } from "../crm.types";
import type { CreateLeadInput } from "@bycar-in-ua/crm-sdk";

export type CarRequestStage = "form" | "success";

export const carRequestSchema = v.object({
  name: v.pipe(v.string(defaultMandatoryStringMessage), v.minLength(1, defaultMandatoryStringMessage)),
  phone: phoneSchema,
  email: v.optional(v.pipe(v.string(), v.email())),
  vehicleFlexible: v.optional(v.boolean()),
  trimFlexible: v.optional(v.boolean()),
});

type FormSchema = v.InferOutput<typeof carRequestSchema>;

export type CarRequestOpenProps = RequestFormProps & {
  brandId?: number;
};

export const useCarRequestStore = defineStore("car-request", () => {
  const { user } = useUserSession();
  const requestFetch = useRequestFetch();
  const toast = useToast();

  const stage = ref<CarRequestStage>("form");

  const state = reactive<FormSchema>({
    name: user.value?.data.firstName || "",
    phone: user.value?.data.phone || "",
    email: user.value?.data.email,
    vehicleFlexible: undefined,
    trimFlexible: undefined,
  });

  const vehicleContext = ref<CarRequestOpenProps | null>(null);

  const {
    mutateAsync: _submit,
    isPending,
    data: successData,
    error,
    reset: _resetMutation,
  } = useMutation({
    mutationKey: ["create-lead"],
    mutationFn: (payload: CreateLeadInput) => requestFetch("/api/crm/leads", {
      method: "POST",
      body: payload,
    }),
    onSuccess: () => {
      stage.value = "success";
    },
    onError: () => {
      toast.add({
        color: "error",
        title: "Не вдалося надіслати запит. Будь ласка, спробуйте ще раз.",
      });
    },
  });

  function open(props: CarRequestOpenProps) {
    vehicleContext.value = props;
    stage.value = "form";
  }

  function close() {
    resetForm();
  }

  async function submitForm() {
    if (!vehicleContext.value) return;
    const { brandId: _brandId, ...requestProps } = vehicleContext.value;
    await _submit({
      ...state,
      ...requestProps,
    });
  }

  function resetForm() {
    state.name = user.value?.data.firstName || "";
    state.phone = user.value?.data.phone || "";
    state.email = user.value?.data.email;
    state.vehicleFlexible = undefined;
    state.trimFlexible = undefined;
    stage.value = "form";
    _resetMutation();
  }

  return {
    schema: carRequestSchema,
    stage,
    state,
    vehicleContext,
    successData,
    isPending,
    error,
    open,
    close,
    submitForm,
    resetForm,
  };
});
