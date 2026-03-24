<script setup lang="ts">
import AuthFormHeadline from "./AuthFormHeadline.vue";
import { useAuthSlideoverStore } from "../stores/auth-slideover";

const store = useAuthSlideoverStore();
const { signInPending, state } = storeToRefs(store);
const { signIn } = store;
</script>

<template>
  <UForm :state class="space-y-4">
    <AuthFormHeadline title="Вхід до акаунту" description="Доступ до вибраних авто та найкращих цін" />

    <UFormField
      label="Введіть пароль"
      name="password"
      autocomplete="password"
    >
      <UInput v-model="state.password" type="password" class="w-full" />
    </UFormField>

    <UButton
      block
      size="xl"
      type="submit"
      :loading="signInPending"
      @click="signIn()"
    >
      Увійти
    </UButton>
  </UForm>
</template>
