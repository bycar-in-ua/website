<script setup lang="ts">
import Logo from "~/components/UI/Logo.vue";
import { useAuthSlideoverStore } from "#layers/auth/stores/auth-slideover";
import { useSignIn } from "../composables/useSignIn";
import AuthFormHeadline from "./AuthFormHeadline.vue";
import OtpTimer from "./OtpTimer.vue";

const authStore = useAuthSlideoverStore();

const {
  signIn, isPending, data: signInData,
} = useSignIn();

const messageText = computed(() => {
  if (!signInData.value || !isNextStepResponse(signInData.value)) {
    return "";
  }

  if (signInData.value.loginType === "email") {
    return "Ми надіслали код пошту " + authStore.signInFormState.login;
  }

  if (signInData.value.loginType === "phone") {
    return "Ми надіслали код номер " + authStore.signInFormState.login;
  }

  return "" as never;
});

const pinInputModel = computed({
  get: () => authStore.signInFormState.otp?.split("").map((char: string) => char) || [],
  set: (val: number[]) => {
    authStore.signInFormState.otp = val.join("");
  },
});
</script>

<template>
  <UForm :state="authStore.signInFormState">
    <Logo class="h-8 sm:h-10 mb-6 mx-auto" />

    <AuthFormHeadline title="Вхід до акаунту" description="Доступ до вибраних авто та найкращих цін" />

    <UFormField label="Введіть код" name="otp" :ui="{ root: 'mb-6 sm:mb-8', help: 'text-sm font-medium' }">
      <UPinInput
        v-model="pinInputModel"
        :length="4"
        placeholder="—"
        class="w-full"
      />

      <template #help>
        {{ messageText }}
      </template>
    </UFormField>

    <UButton
      block
      type="submit"
      :loading="isPending"
      @click="signIn()"
    >
      Продовжити
    </UButton>
    <OtpTimer class="mt-4 md:mt-3" :timer="authStore.otpTimer" @resend="signIn()" />
  </UForm>
</template>
