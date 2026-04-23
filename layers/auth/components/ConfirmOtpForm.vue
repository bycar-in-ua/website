<script setup lang="ts">
import AuthFormHeadline from "./AuthFormHeadline.vue";
import { useAuthSlideoverStore } from "#layers/auth/stores/auth-slideover";

const authStore = useAuthSlideoverStore();

const messageText = computed(() => {
  if (!authStore.signInData || !isNextStepResponse(authStore.signInData)) {
    return "";
  }

  if (authStore.signInData.loginType === "email") {
    return "Ми надіслали код пошту " + authStore.state.login;
  }

  if (authStore.signInData.loginType === "phone") {
    return "Ми надіслали код номер " + authStore.state.login;
  }

  return "" as never;
});

const pinInputModel = computed({
  get: () => authStore.state.otp?.split("").map((char: string) => char) || [],
  set: (val: number[]) => {
    authStore.state.otp = val.join("");
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
  <UForm :state="authStore.state">
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
      size="xl"
      type="submit"
      :loading="authStore.signInPending"
      @click="authStore.signIn()"
    >
      Підтвердити
    </UButton>
    <div class="mt-4 md:mt-3 flex flex-col md:flex-row gap-1 justify-center items-center text-sm text-muted font-medium">
      <span>Не отримали код?</span>

      <UButton
        v-if="canResendOtp"
        label="Надіслати код повторно"
        variant="link"
        size="sm"
        @click="authStore.signIn"
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
