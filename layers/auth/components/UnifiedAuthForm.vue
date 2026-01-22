<script setup lang="ts">
import { useUnifiedAuth } from "../composables/useUnifiedAuth";
import GoogleSignInButton from "./GoogleSignInButton.vue";
import AuthFormHeadline from "./AuthFormHeadline.vue";

const {
  state, formSchema, initiateAuth, loading,
} = useUnifiedAuth();
</script>

<template>
  <UForm
    :schema="formSchema"
    :state="state"
    class="w-full"
    @submit="initiateAuth"
  >
    <AuthFormHeadline
      title="Вхід до акаунту"
      description="Доступ до вибраних авто та найкращих цін"
    />

    <GoogleSignInButton />

    <USeparator label="або" :ui="{ root: 'my-8', border: 'border-gray-200', label: 'text-gray-200 text-base' }" />

    <UFormField label="Телефон або пошта" name="credential" class="mb-6">
      <UInput
        v-model="state.credential"
        placeholder="Введіть ваш телефон або пошту"
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
      Увійти
    </UButton>

    <p class="text-sm text-center mt-3">
      Натискаючи кнопку, ви погоджуєтесь з
      <NuxtLink
        to="/privacy-policy"
        class="underline"
      >
        Політикою конфіденційності
      </NuxtLink>
    </p>
  </UForm>
</template>
