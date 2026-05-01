import * as v from "valibot";
import { useMutation } from "@tanstack/vue-query";
import { phoneSchema, emailSchema } from "#shared/validation";
import { useAuthSlideoverStore } from "../stores/auth-slideover";
import { useUpdateContact } from "./useUpdateContact";

const schema = v.object({
  name: v.optional(v.string()),
  contact: v.union(
    [emailSchema, phoneSchema],
    "Це обов'язкове поле",
  ),
});

type State = v.InferInput<typeof schema>;

export function useCompleteIntroduction() {
  const state = reactive<State>({
    name: undefined,
    contact: "",
  });

  const userSession = useUserSession();
  const fetch = useRequestFetch();

  const authSlideoverStore = useAuthSlideoverStore();

  const { mutateAsync: updateContact } = useUpdateContact();

  const { mutateAsync: submit, isPending } = useMutation({
    mutationKey: ["complete-introduction"],
    mutationFn: async () => {
      const isEmail = v.safeParse(emailSchema, state.contact).success;
      const isPhone = v.safeParse(phoneSchema, state.contact).success;

      // Save name and a contact to show later on UI
      const profilePromise = fetch("/api/auth/personal-data", {
        method: "PATCH",
        body: {
          name: state.name,
          email: isEmail ? state.contact : undefined,
          phone: isPhone ? state.contact : undefined,
        },
      });

      const updateContactResponse = await updateContact(state.contact);

      await profilePromise;

      return updateContactResponse;
    },
    onSuccess: () => {
      userSession.fetch();
      authSlideoverStore.setStage("confirm-second-contact");
      authSlideoverStore.startOtpTimer();
    },
  });

  return {
    schema,
    state,
    submit,
    isPending,
  };
}
