<script setup lang="ts">
import * as v from "valibot";
import { emailSchema, phoneSchema } from "#shared/validation";
import { useAuthSlideoverStore } from "../stores/auth-slideover";
import { useUnconfirmedContact } from "../composables/useUnconfirmedContact";
import AuthFormHeadline from "./AuthFormHeadline.vue";

const unconfirmedContact = useUnconfirmedContact();

const schema = v.object({
  contact: v.union(
    [emailSchema, phoneSchema],
    "Це обов'язкове поле",
  ),
});

const state = reactive({ contact: undefined });

const authSlideoverStore = useAuthSlideoverStore();
const { mutate: updateContact, isPending } = useUpdateContact();

const submitHandler = () => {
  updateContact(state.contact!, {
    onSuccess: () => {
      authSlideoverStore.setStage("confirm-second-contact");
    },
  });
};
</script>

<template>
  <UForm :schema :state @submit="submitHandler">
    <AuthFormHeadline
      title="Останній штрих"
      :description="[
        unconfirmedContact?.type === 'phone' && 'Введіть ваш номер телефону',
        unconfirmedContact?.type === 'email' && 'Введіть вашу пошту',
        ', щоб мати другий спосіб входу та можливість швидкого зв’язку щодо ваших запитів/']
        .filter(Boolean)
        .join(' ')"
      class="mb-10"
    />

    <UFormField :label="unconfirmedContact?.type === 'phone' ? 'Телефон' : 'Пошта'" name="contact">
      <UInput v-model="state.contact" :placeholder="unconfirmedContact?.type === 'phone' ? '+380' : 'example@example.com'" class="w-full" />
    </UFormField>

    <UButton
      type="submit"
      class="mt-8"
      block
      :loading="isPending"
    >
      Продовжити
    </UButton>
  </UForm>
</template>
