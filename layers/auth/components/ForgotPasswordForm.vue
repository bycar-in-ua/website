<script setup lang="ts">
import * as v from "valibot";
import { useAuthSlideoverStore } from "#layers/auth/stores/auth-slideover";
import { emailOrPhoneSchema } from "#shared/validation";
import AuthFormHeadline from "./AuthFormHeadline.vue";
import GoogleSignInButton from "./GoogleSignInButton.vue";

const store = useAuthSlideoverStore();

const formSchema = v.object({ login: emailOrPhoneSchema });

const state = reactive({ login: "" });

const loading = ref(false);

async function sendForgotPasswordRequest() {
  loading.value = true;

  try {
    // TODO: Replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    store.setStage("reset-password");
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
        @click="store.setStage('enter-credential')"
      >
        Повернутися до форми входу
      </UButton>
    </div>
  </UForm>
</template>
