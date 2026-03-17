import type { FormSubmitEvent } from "@nuxt/ui";
import * as v from "valibot";
import { phoneSchema, defaultMandatoryStringMessage } from "#layers/profile/vaidation.shema";

const schema = v.object({
  name: v.pipe(v.string(defaultMandatoryStringMessage), v.minLength(1, defaultMandatoryStringMessage)),
  phone: phoneSchema,
  email: v.optional(v.pipe(v.string(), v.email())),
});

type FormSchema = v.InferOutput<typeof schema>;

export function useCarRequestForm() {
  const state = reactive<FormSchema>({
    name: "",
    phone: "",
    email: undefined,
  });

  const onSubmit = (event: FormSubmitEvent<FormSchema>) => {
    console.log("Form submitted with:", event);
  };

  return {
    state,
    schema,
    onSubmit,
  };
}
