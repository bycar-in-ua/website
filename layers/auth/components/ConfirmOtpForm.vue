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
</script>

<template>
  <UForm :state="authStore.state" class="space-y-4">
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
      :loading="authStore.signInPending"
      @click="authStore.signIn()"
    >
      Підтвердити
    </UButton>
  </UForm>
</template>
