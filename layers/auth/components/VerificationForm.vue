<script setup lang="ts">
import AuthFormHeadline from "./AuthFormHeadline.vue";
import { useAuthSlideoverStore } from "#layers/auth/stores/auth-slideover";

const authStore = useAuthSlideoverStore();

const descriptionText = computed(() => {
  if (!authStore.signInData || !isNextStepResponse(authStore.signInData)) {
    return "Введіть його нижче, щоб ми знали, що це саме ви.";
  }

  if (authStore.signInData.loginType === "phone") {
    return `Надіслали SMS із кодом на телефон ${authStore.state.login}.\nВведіть його нижче, щоб ми знали, що це саме ви.`;
  }

  if (authStore.signInData.loginType === "email") {
    return `Надіслали код на пошту ${authStore.state.login}.\nВведіть його нижче, щоб ми знали, що це саме ви.`;
  }

  return "Введіть його нижче, щоб ми знали, що це саме ви.";
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
    <AuthFormHeadline title="Останній штрих">
      <template #description>
        <span class="whitespace-pre-line">{{ descriptionText }}</span>
      </template>
    </AuthFormHeadline>

    <UFormField label="Введіть код" name="otp" :ui="{ root: 'mb-6 sm:mb-8' }">
      <UInput
        v-model="authStore.state.otp"
        placeholder="– – – – – –"
        size="xl"
        class="w-full"
        :maxlength="6"
        autocomplete="one-time-code"
        inputmode="numeric"
      />
    </UFormField>

    <UButton
      block
      type="submit"
      :loading="authStore.signInPending"
      @click="authStore.signIn()"
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
