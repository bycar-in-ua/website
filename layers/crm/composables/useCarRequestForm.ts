import * as v from "valibot";
import type { InjectionKey } from "vue";
import { phoneSchema, defaultMandatoryStringMessage } from "#layers/profile/vaidation.shema";
import type { RequestFormProps } from "../crm.types";
import { useMutation } from "@tanstack/vue-query";

export type CarRequestStage = "form" | "success";

const schema = v.object({
  name: v.pipe(v.string(defaultMandatoryStringMessage), v.minLength(1, defaultMandatoryStringMessage)),
  phone: phoneSchema,
  email: v.optional(v.pipe(v.string(), v.email())),
  vehicleFlexible: v.optional(v.boolean()),
  trimFlexible: v.optional(v.boolean()),
});

type FormSchema = v.InferOutput<typeof schema>;

export function useCarRequestForm() {
  const { user } = useUserSession();

  const stage = ref<CarRequestStage>("form");

  const state = reactive<FormSchema>({
    name: user.value?.data.firstName || "",
    phone: user.value?.data.phone || "",
    email: user.value?.data.email,
    vehicleFlexible: undefined,
    trimFlexible: undefined,
  });

  const leadService = useLeadService();

  const {
    mutateAsync: submit, isPending, data: successData,
  } = useMutation({
    mutationKey: ["create-lead"],
    mutationFn: async (payload: FormSchema & RequestFormProps) => {
      return leadService.createLead(payload);
    },
    onSuccess: () => {
      stage.value = "success";
    },
  });

  const api = {
    state,
    schema,
    submit,
    isPending,
    stage,
    successData,
  };

  provide(carRequestFormKey, api);

  return api;
}

type CarRequestFormApi = ReturnType<typeof useCarRequestForm>;

const carRequestFormKey = Symbol("car-request-form") as InjectionKey<CarRequestFormApi>;

export function useCarRequestFormContext() {
  const ctx = inject(carRequestFormKey);
  if (!ctx) {
    throw new Error("useCarRequestFormContext must be used within a CarRequestSlideover");
  }
  return ctx;
}
