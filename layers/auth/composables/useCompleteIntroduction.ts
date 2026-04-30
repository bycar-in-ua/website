import * as v from "valibot";
import { useMutation } from "@tanstack/vue-query";
import { emailSchema, phoneSchema } from "#shared/validation";
import { useAuthSlideoverStore } from "../stores/auth-slideover";

const formSchema = v.object({
  name: v.optional(v.string()),
  contact: v.union(
    [emailSchema, phoneSchema],
    "Це обов'язкове поле",
  ),
});

type FormState = v.InferInput<typeof formSchema>;

export function useCompleteIntroduction() {
  const state = reactive<FormState>({
    name: "",
    contact: "",
  });

  const userSession = useUserSession();
  const fetch = useRequestFetch();
  const saveName = async (name: string) => {
    const [firstName = "", ...lastNameParts] = name.split(" ");
    const lastName = lastNameParts.join(" ");

    await fetch("/api/auth/personal-data", {
      method: "PATCH",
      body: {
        firstName,
        lastName,
      },
    });
  };

  const submitHandler = async () => {
    if (state.name) {
      await saveName(state.name);
    }

    const updateContactResponse = await fetch("/api/auth/update-contact", {
      method: "PATCH",
      body: { contact: state.contact },
    });

    await userSession.fetch();

    return updateContactResponse;
  };

  const authSlideoverStore = useAuthSlideoverStore();

  const { mutateAsync: submit, isPending } = useMutation({
    mutationKey: ["complete-introduction"],
    mutationFn: submitHandler,
    onSuccess: () => {
      authSlideoverStore.setStage("confirm-second-contact");
    },
  });

  return {
    state,
    formSchema,
    submit,
    isPending,
  };
}
