<script setup lang="ts">
import AuthFormHeadline from "./AuthFormHeadline.vue";
import { useCompleteIntroduction } from "../composables/useCompleteIntroduction";

const { user } = useUserSession();

const showPhoneInput = computed(() => !user.value?.data.phone);
const showEmailInput = computed(() => !user.value?.data.email);

const {
  schema,
  state,
  submit,
  isPending,
} = useCompleteIntroduction();
</script>

<template>
  <UForm
    :state
    :schema
    :disabled="isPending"
    @error="console.log"
    @submit="submit()"
  >
    <AuthFormHeadline title="Давайте знайомитись" description="Вкажіть свої контакти, щоб ми могли тримати вас у курсі (і просто знати, як вас звати)" class="mb-10" />

    <UFormField label="імʼя" name="name" class="mb-4 sm:mb-6">
      <UInput v-model="state.name" placeholder="Введіть ваше імʼя" class="w-full" />
    </UFormField>

    <UFormField v-if="showPhoneInput" label="Телефон" name="contact">
      <UInput v-model="state.contact" placeholder="+380" class="w-full" />
    </UFormField>

    <UFormField v-if="showEmailInput" label="Email" name="contact">
      <UInput v-model="state.contact" placeholder="Введіть ваш email" class="w-full" />
    </UFormField>

    <UButton
      block
      type="submit"
      class="mt-6 sm:mt-8"
      :loading="isPending"
    >
      Продовжити
    </UButton>
  </UForm>
</template>
