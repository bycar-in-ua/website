<script setup lang="ts">
import { useAuthSlideoverStore } from "#layers/auth/stores/auth-slideover";
import { useSignIn } from "../composables/useSignIn";
import AuthFormHeadline from "./AuthFormHeadline.vue";

const authStore = useAuthSlideoverStore();

const {
  signIn, isPending, data: signInData,
} = useSignIn();

const descriptionText = computed(() => {
  if (!signInData.value || !isNextStepResponse(signInData.value)) {
    return "Введіть його нижче, щоб ми знали, що це саме ви.";
  }

  if (signInData.value.loginType === "phone") {
    return `Надіслали SMS із кодом на телефон ${authStore.signInFormState.login}.\nВведіть його нижче, щоб ми знали, що це саме ви.`;
  }

  if (signInData.value.loginType === "email") {
    return `Надіслали код на пошту ${authStore.signInFormState.login}.\nВведіть його нижче, щоб ми знали, що це саме ви.`;
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
  <UForm :state="authStore.signInFormState">
    <AuthFormHeadline title="Останній штрих">
      <template #description>
        <span class="whitespace-pre-line">{{ descriptionText }}</span>
      </template>
    </AuthFormHeadline>

    <UFormField label="Введіть код" name="otp" :ui="{ root: 'mb-6 sm:mb-8' }">
      <UInput
        v-model="authStore.signInFormState.otp"
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
