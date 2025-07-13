<script setup lang="ts">
import SectionContainer from "./SectionContainer.vue";
import ProfileFormField from "./ProfileFormField.vue";
import EmailForm from "./EmailForm.vue";
</script>

<template>
  <SectionContainer title="Безпека">
    <EmailForm />

    <USeparator class="my-6" />

    <ProfileFormField label="Телефон">
      <UInput class="w-full" />
    </ProfileFormField>

    <USeparator class="my-6" />

    <UForm :state="{}" class="space-y-6">
      <ProfileFormField label="Поточний пароль" name="password">
        <UIInputPassword
          class="w-full"
          size="lg"
          placeholder="Введіть ваш пароль"
        />
      </ProfileFormField>

      <ProfileFormField label="Новий пароль" name="newPassword">
        <UIInputPassword
          class="w-full"
          size="lg"
          placeholder="Введіть новий пароль"
        />
      </ProfileFormField>

      <ProfileFormField label="Підтвердження паролю" name="confirmPassword">
        <UIInputPassword
          class="w-full"
          size="lg"
          placeholder="Підтвердіть ваш пароль"
        />
      </ProfileFormField>
    </UForm>
  </SectionContainer>
</template>
