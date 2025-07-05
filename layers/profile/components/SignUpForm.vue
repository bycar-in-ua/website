<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";
import Google from "@/components/UI/Icons/Google.vue";
import InputPassword from "@/components/UI/InputPassword.vue";

defineEmits(["open-login-modal"]);

const schema = z.object({
  firstName: z.string().optional(),
  secondName: z.string().optional(),
  email: z
    .string({ required_error: "Це обовʼязкове поле" })
    .email("Недійсний email"),
  password: z
    .string({ required_error: "Це обовʼязкове поле" })
    .min(8, "Має бути хочаб 8 символів")
    .regex(/\p{L}/u, "Пароль має містити хоча б одну літеру")
    .regex(/\d/, "Пароль має містити хоча б одну цифру"),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  firstName: undefined,
  secondName: undefined,
  email: undefined,
  password: undefined,
});

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<Schema>) {
  // TODO:
  toast.add({
    title: "Success",
    description: "The form has been submitted.",
    color: "success",
  });
  console.log(event.data);
}
async function googleLogin() {
  // TODO:
}
</script>

<template>
  <div class="flex flex-col gap-8 p-6">
    <!-- <ModalHeader title="Реєстрація" /> -->

    <UForm :schema="schema" :state="state" class="space-y-6" @submit="onSubmit">
      <div class="space-y-4">
        <UFormField label="Імʼя" name="firstName">
          <UInput
            v-model="state.firstName"
            placeholder="Введіть ваше імʼя"
            class="w-full"
            size="xl"
            type="email"
          />
        </UFormField>
        <UFormField label="Прізвище" name="secondName">
          <UInput
            v-model="state.secondName"
            placeholder="Введіть ваше прізвище"
            class="w-full"
            size="xl"
            type="email"
          />
        </UFormField>
        <UFormField label="Email" name="email">
          <UInput
            v-model="state.email"
            placeholder="Введіть ваш email"
            class="w-full"
            size="xl"
            type="email"
          />
        </UFormField>
        <UFormField label="Пароль" name="password">
          <InputPassword
            v-model="state.password"
            placeholder="Створіть пароль"
          />
        </UFormField>
      </div>

      <div class="flex flex-col gap-4">
        <UButton class="flex justify-center h-11" type="submit">
          Зареєструватися
        </UButton>
        <UButton
          variant="outline"
          class="flex items-center justify-center gap-2 h-11 ring-gray-300"
          @click="googleLogin"
        >
          <Google />
          <span>Зареєструватися через Google</span>
        </UButton>
      </div>
    </UForm>
    <div class="flex justify-center items-center text-sm">
      <span class="text-gray-500">Вже є акаунт?</span>
      <UButton variant="link" @click="$emit('open-login-modal')">
        Увійти
      </UButton>
    </div>
  </div>
</template>
