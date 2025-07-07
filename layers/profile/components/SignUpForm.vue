<script setup lang="ts">
import InputPassword from "@/components/UI/InputPassword.vue";
import GoogleSignIn from "./GoogleSignIn.vue";

const { state, signupSchema, signup, loading } = useSignUpForm();

const { setStage } = useSignInStage();
</script>

<template>
  <UForm
    :state="state"
    :schema="signupSchema"
    class="space-y-4"
    @submit="signup"
  >
    <FormHeadline
      title="Реєстрація"
      description="Доступ до вибраних авто та найкращих цін"
    />

    <UFormField label="Імʼя" name="firstName">
      <UInput
        v-model="state.name"
        placeholder="Введіть ваше імʼя"
        class="w-full"
        size="xl"
      />
    </UFormField>

    <UFormField label="Email або телефон" name="emailOrPhone">
      <UInput
        v-model="state.emailOrPhone"
        placeholder="Введіть ваш email або телефон"
        class="w-full"
        size="xl"
        autocomplete="phone"
      />
    </UFormField>

    <UFormField label="Пароль" name="password" class="mb-6">
      <InputPassword v-model="state.password" placeholder="Створіть пароль" />
    </UFormField>

    <UButton block size="xl" type="submit" :loading="loading">
      Зареєструватися
    </UButton>

    <GoogleSignIn disabled> Зареєструватися через Google </GoogleSignIn>

    <div class="flex justify-center items-center text-sm mt-4">
      <span class="text-gray-500">Вже є акаунт?</span>
      <UButton variant="link" @click="setStage('login')"> Увійти </UButton>
    </div>
  </UForm>
</template>
