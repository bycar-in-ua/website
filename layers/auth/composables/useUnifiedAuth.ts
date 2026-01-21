import * as v from "valibot";

const emailSchema = v.pipe(
  v.string("Це обов'язкове поле"),
  v.minLength(1, "Це обов'язкове поле"),
  v.email("Недійсний email"),
);

const phoneRegex
  = /^(\+38|38|8)?[\s-]?(\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}|\(?\d{3}\)?[\s-]?\d{2}[\s-]?\d{2}[\s-]?\d{3})$/;

const phoneSchema = v.pipe(
  v.string("Це обов'язкове поле"),
  v.minLength(1, "Це обов'язкове поле"),
  v.regex(phoneRegex, "Недійсний номер телефону"),
);

const credentialSchema = v.union(
  [emailSchema, phoneSchema],
  "Введіть дійсний email або номер телефону",
);

const formSchema = v.object({ credential: credentialSchema });

type FormState = v.InferInput<typeof formSchema>;

/**
 * Composable for unified auth form.
 * Handles credential input (phone/email) and initiates authentication flow.
 */
export function useUnifiedAuth() {
  const { setStage, credential: storedCredential } = useAuthStage();
  const loading = ref(false);

  const state = reactive<FormState>({ credential: "" });

  async function initiateAuth() {
    loading.value = true;

    try {
      // Store credential for OTP verification stage
      storedCredential.value = state.credential;

      // TODO: Replace with actual API call when backend is ready
      // This should:
      // 1. Check if user exists
      // 2. Send OTP to phone/email
      // 3. Return info about whether it's login or registration
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Transition to OTP verification
      setStage("confirm-otp");
    } catch (error) {
      console.error("Auth initiation failed:", error);
    } finally {
      loading.value = false;
    }
  }

  return {
    state,
    formSchema,
    initiateAuth,
    loading,
  };
}
