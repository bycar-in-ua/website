<script setup lang="ts">
import GoogleSignIn from "./GoogleSignIn.vue";

const {
  state, formSchema, sendForgotPasswordRequest, loading,
}
  = useForgotPasswordForm();

const { setStage } = useSignInStage();
</script>

<template>
  <UForm
    ref="form"
    :state="state"
    :schema="formSchema"
    class="space-y-4"
    @submit="sendForgotPasswordRequest"
  >
    <FormHeadline
      title="Забули пароль?"
      description="Введіть ваш email або телефон для отримання коду підтвердження"
    />

    <UFormField label="Email або телефон" name="login">
      <UInput
        v-model="state.login"
        placeholder="Введіть ваш email або телефон"
        class="w-full"
        size="xl"
        autocomplete="phone"
      />
    </UFormField>

    <UButton
      size="xl"
      block
      type="submit"
      :loading
    >
      Надіслати
    </UButton>

    <GoogleSignIn />

    <div class="flex justify-center items-center text-sm mt-4">
      <UButton variant="link" @click="setStage('login')">
        Повернутися до форми входу
      </UButton>
    </div>
  </UForm>
</template>
