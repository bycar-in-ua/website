<script setup lang="ts">
import InputPassword from "@/components/UI/InputPassword.vue";
import { useLoginForm } from "@/layers/profile/composables/useLoginForm";
import { useSignInStage } from "@/layers/profile/composables/useSignInStage";
import GoogleSignIn from "./GoogleSignIn.vue";

const { state, loginSchema, login, loading } = useLoginForm();

const { setStage } = useSignInStage();
</script>

<template>
  <UForm
    ref="form"
    :schema="loginSchema"
    :state="state"
    class="space-y-4"
    @submit="login"
  >
    <FormHeadline
      title="Вхід до акаунту"
      description="Доступ до вибраних авто та найкращих цін"
    />

    <UFormField label="Email або телефон" name="emailOrPhone">
      <UInput
        v-model="state.login"
        placeholder="Введіть ваш email або телефон"
        class="w-full"
        size="xl"
        autocomplete="phone"
      />
    </UFormField>

    <UFormField label="Пароль" name="password">
      <InputPassword v-model="state.password" />
    </UFormField>

    <div class="flex justify-end my-6">
      <UButton variant="link" disabled> Забули пароль? </UButton>
    </div>

    <UButton size="xl" block type="submit" :loading> Увійти </UButton>

    <GoogleSignIn />

    <div class="flex justify-center items-center text-sm mt-4">
      <span class="text-gray-500">Немає акаунту?</span>
      <UButton variant="link" @click="setStage('signup')">
        Зареєструватися
      </UButton>
    </div>
  </UForm>
</template>
