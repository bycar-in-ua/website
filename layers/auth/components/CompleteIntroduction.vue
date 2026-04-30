<script setup lang="ts">
import * as v from "valibot";
import { emailSchema, phoneSchema } from "#shared/validation";
import AuthFormHeadline from "./AuthFormHeadline.vue";

const { user } = useUserSession();

const showPhoneInput = computed(() => !user.value?.data.phone);
const showEmailInput = computed(() => !user.value?.data.email);

const contactSchema = v.pipe(
  v.object({
    name: v.optional(v.string()),
    phone: v.optional(phoneSchema),
    email: v.optional(emailSchema),
  }),
  v.check(
    (input) => !!(input.phone || input.email),
    "Це поле обовʼязкове",
  ),
);

type FormState = v.InferInput<typeof contactSchema>;

const state = reactive<FormState>({
  name: "",
  phone: "",
  email: "",
});
</script>

<template>
  <UForm :state :schema="contactSchema">
    <AuthFormHeadline title="Давайте знайомитись" description="Вкажіть свої контакти, щоб ми могли тримати вас у курсі (і просто знати, як вас звати)" class="mb-10" />

    <UFormField label="імʼя" name="name" class="mb-4 sm:mb-6">
      <UInput placeholder="Введіть ваше імʼя" class="w-full" />
    </UFormField>

    <UFormField v-if="showPhoneInput" label="Телефон" name="phone">
      <UInput placeholder="+380" class="w-full" />
    </UFormField>

    <UFormField v-if="showEmailInput" label="Email" name="email">
      <UInput placeholder="Введіть ваш email" class="w-full" />
    </UFormField>

    <UButton
      block
      type="submit"
      class="mt-6 sm:mt-8"
    >
      Продовжити
    </UButton>
  </UForm>
</template>
