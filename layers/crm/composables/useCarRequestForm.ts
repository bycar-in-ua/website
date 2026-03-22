import * as v from "valibot";
import { phoneSchema, defaultMandatoryStringMessage } from "#layers/profile/vaidation.shema";
import type { RequestFormProps } from "../crm.types";
import { useMutation } from "@tanstack/vue-query";

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

  const state = reactive<FormSchema>({
    name: user.value?.data.firstName || "",
    phone: user.value?.data.phone || "",
    email: user.value?.data.email,
    vehicleFlexible: undefined,
    trimFlexible: undefined,
  });

  const leadService = useLeadService();
  const toast = useToast();

  const { mutateAsync: submit, isPending } = useMutation({
    mutationKey: ["create-lead"],
    mutationFn: async (payload: FormSchema & RequestFormProps) => {
      await leadService.createLead(payload);
    },
    onSuccess: () => {
      toast.add({
        title: "Запит надіслано",
        description: "Ми зв'яжемося з вами найближчим часом",
        color: "success",
      });
    },
  });

  return {
    state,
    schema,
    submit,
    isPending,
  };
}
