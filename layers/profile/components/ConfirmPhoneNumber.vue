<script setup lang="ts">
const authStore = useAuthStore();

const {
  state, isValid, confirmPhone, loading,
} = useConfirmPhoneForm();
</script>

<template>
  <UForm :state="state" class="space-y-4">
    <FormHeadline title="Ласкаво просимо">
      <template #description>
        Для завершення реєстрації - підтвердіть свій номер телефону.
        {{
          authStore.user?.phone
            ? `Код надісланий на номер ${authStore.user.phone}`
            : ""
        }}
      </template>
    </FormHeadline>

    <UFormField class="flex justify-center">
      <UPinInput v-model="state.code" :length="4" size="xl" />
    </UFormField>

    <UButton
      block
      size="xl"
      type="submit"
      :loading="loading"
      :disabled="!isValid"
      @click="confirmPhone()"
    >
      Підтвердити та зареєструватися
    </UButton>

    <div class="flex justify-center items-center text-sm mt-4">
      <span class="text-gray-500">Не отримали код?</span>
      <UButton variant="link" disabled>
        Надіслати повторно
      </UButton>
    </div>
  </UForm>
</template>
