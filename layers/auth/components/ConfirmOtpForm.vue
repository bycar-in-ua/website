<script setup lang="ts">
import Logo from "~/components/UI/Logo.vue";
import { useAuthSlideoverStore } from "#layers/auth/stores/auth-slideover";
import { useSignIn } from "../composables/useSignIn";
import AuthFormHeadline from "./AuthFormHeadline.vue";

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

const canResendOtp = computed(() => {
  return authStore.otpTimer === 0;
});

const twoDigits = new Intl.NumberFormat("uk-UA", {
  minimumIntegerDigits: 2,
  useGrouping: false,
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
    <div class="mt-4 md:mt-3 flex flex-col md:flex-row gap-1 justify-center items-center text-sm text-muted font-medium">
      <span>Не отримали код?</span>

      <UButton
        v-if="canResendOtp"
        label="Надіслати код повторно"
        variant="link"
        size="sm"
        @click="signIn()"
      />

      <span v-else>
        Надіслати повторно через
        <span class="font-semibold text-gray-900">
          00:{{ twoDigits.format(authStore.otpTimer) }} сек
        </span>
      </span>
    </div>
  </UForm>
</template>
