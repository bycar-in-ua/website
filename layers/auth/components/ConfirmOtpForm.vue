<script setup lang="ts">
import AuthFormHeadline from "./AuthFormHeadline.vue";
import { useSignIn } from "../composables/useSignIn";

const {
  signInData, signInPending, state, signIn,
} = useSignIn();

const messageText = computed(() => {
  if (!signInData?.value || !isNextStepResponse(signInData.value)) {
    return "";
  }

  if (signInData.value.loginType === "email") {
    return "Ми надіслали код пошту " + state.login;
  }

  if (signInData.value.loginType === "phone") {
    return "Ми надіслали код номер " + state.login;
  }

  return "" as never;
});

const pinInputModel = computed({
  get: () => state.otp?.split("").map((char) => char) || [],
  set: (val: number[]) => {
    state.otp = val.join("");
  },
});
</script>

<template>
  <UForm :state class="space-y-4">
    <AuthFormHeadline title="Вхід до акаунту" description="Доступ до вибраних авто та найкращих цін" />

    <UFormField label="Введіть код" name="otp">
      <UPinInput v-model="pinInputModel" :length="4" />

      <template #help>
        {{ messageText }}
      </template>

      <template #hint>
        Відправити повторно
      </template>
    </UFormField>

    <UButton
      block
      size="xl"
      type="submit"
      :loading="signInPending"
      @click="signIn()"
    >
      Підтвердити
    </UButton>
  </UForm>
</template>
