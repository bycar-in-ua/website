<script setup lang="ts">
import InputPassword from "~/components/UI/InputPassword.vue";

const {
  state, formSchema, resetPassword, loading,
} = useResetPasswordForm();
</script>

<template>
  <UForm
    :state="state"
    :schema="formSchema"
    class="space-y-4"
    @submit="resetPassword"
  >
    <FormHeadline
      title="Встановлення нового паролю"
      description="Введіть код підтвердження та новий пароль"
    />

    <UFormField
      label="Код підтвердження"
      name="code"
      class="flex flex-col items-center gap-2"
    >
      <UPinInput v-model="state.code" :length="6" size="xl" />
    </UFormField>

    <UFormField label="Новий пароль" name="newPassword">
      <InputPassword v-model="state.newPassword" />
    </UFormField>

    <UFormField label="Підтвердження паролю" name="confirmPassword">
      <InputPassword v-model="state.confirmPassword" />
    </UFormField>

    <UButton
      size="xl"
      block
      type="submit"
      :loading
    >
      Змінити пароль
    </UButton>
  </UForm>
</template>
