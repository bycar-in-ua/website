<script setup lang="ts">
import { useAuthSlideoverStore } from "#layers/auth/stores/auth-slideover";
import GoogleSignInButton from "./GoogleSignInButton.vue";
import AuthFormHeadline from "./AuthFormHeadline.vue";

const store = useAuthSlideoverStore();
</script>

<template>
  <UForm
    :schema="store.formSchema"
    :state="store.state"
    class="w-full"
    :disabled="store.signInPending"
    @submit="store.signIn"
  >
    <AuthFormHeadline
      title="Вхід до акаунту"
      description="Доступ до вибраних авто та найкращих цін"
    />

    <GoogleSignInButton />

    <USeparator label="або" :ui="{ root: 'my-8', border: 'border-gray-200', label: 'text-gray-200 text-base' }" />

    <UFormField label="Телефон або пошта" name="login" class="mb-6">
      <UInput
        v-model="store.state.login"
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
      :loading="store.signInPending"
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
