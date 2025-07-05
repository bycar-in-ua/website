<script setup lang="ts">
import Google from "@/components/UI/Icons/Google.vue";
import InputPassword from "@/components/UI/InputPassword.vue";
import { useLoginForm } from "@/layers/profile/composables/useLoginForm";

const { state, loginSchema, login, loading } = useLoginForm();
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
        v-model="state.emailOrPhone"
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

    <UButton variant="outline" color="neutral" size="xl" block disabled>
      <Google />
      Увійти через Google
    </UButton>

    <div class="flex justify-center items-center text-sm mt-4">
      <span class="text-gray-500">Немає акаунту?</span>
      <UButton variant="link" disabled> Зареєструватися </UButton>
    </div>
  </UForm>
</template>
