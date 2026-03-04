<script setup lang="ts">
import * as v from "valibot";
import { useSignIn } from "../composables/useSignIn";
import AuthFormHeadline from "./AuthFormHeadline.vue";
import GoogleSignInButton from "./GoogleSignInButton.vue";

const { setStage } = useSignIn();

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

const formSchema = v.object({
  login: v.union(
    [emailSchema, phoneSchema],
    "Введіть дійсний email або номер телефону",
  ),
});

const state = reactive({ login: "" });

const loading = ref(false);

async function sendForgotPasswordRequest() {
  loading.value = true;

  try {
    // TODO: Replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Store login for reset password stage
    setStage("reset-password");
  } catch (error) {
    console.error("Forgot password request failed:", error);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <UForm
    :state="state"
    :schema="formSchema"
    class="space-y-4"
    @submit="sendForgotPasswordRequest"
  >
    <AuthFormHeadline
      title="Забули пароль?"
      description="Введіть ваш email або телефон для отримання коду підтвердження"
    />

    <UFormField label="Email або телефон" name="login">
      <UInput
        v-model="state.login"
        placeholder="Введіть ваш email або телефон"
        class="w-full"
        size="xl"
        autocomplete="email tel"
      />
    </UFormField>

    <UButton
      size="xl"
      block
      type="submit"
      :loading="loading"
    >
      Надіслати
    </UButton>

    <GoogleSignInButton />

    <div class="flex justify-center items-center text-sm mt-4">
      <UButton
        variant="link"
        @click="setStage('enter-credential')"
      >
        Повернутися до форми входу
      </UButton>
    </div>
  </UForm>
</template>
