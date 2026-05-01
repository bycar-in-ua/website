<script setup lang="ts">
import Logo from "~/components/UI/Logo.vue";
import AuthFormHeadline from "./AuthFormHeadline.vue";
import { useAuthSlideoverStore } from "../stores/auth-slideover";
import { useSignIn } from "../composables/useSignIn";

const store = useAuthSlideoverStore();

const { signIn, isPending } = useSignIn();
</script>

<template>
  <UForm :state="store.signInFormState" class="space-y-4">
    <Logo class="h-8 sm:h-10 mb-6 mx-auto" />

    <AuthFormHeadline title="Вхід до акаунту" description="Доступ до вибраних авто та найкращих цін" />

    <UFormField
      label="Введіть пароль"
      name="password"
      autocomplete="password"
    >
      <UInput v-model="store.signInFormState.password" type="password" class="w-full" />
    </UFormField>

    <UButton
      block
      type="submit"
      :loading="isPending"
      @click="signIn()"
    >
      Увійти
    </UButton>
  </UForm>
</template>
