<script setup lang="ts">
import * as v from "valibot";
import InputPassword from "~/components/UI/InputPassword.vue";
import { useSignIn } from "../composables/useSignIn";
import { useAuthSlideover } from "../composables/useAuthSlideover";
import AuthFormHeadline from "./AuthFormHeadline.vue";

const { setStage } = useSignIn();

const passwordSchema = v.pipe(
  v.string("Це обов'язкове поле"),
  v.minLength(8, "Пароль не може бути коротшим за 8 символів"),
);

const formSchema = v.object({
  code: v.pipe(
    v.array(v.number(), "Це обов'язкове поле"),
    v.length(6, "Код має містити 6 символів"),
  ),
  newPassword: passwordSchema,
  confirmPassword: passwordSchema,
});

const state = reactive({
  code: [],
  newPassword: "",
  confirmPassword: "",
});

const loading = ref(false);

async function resetPassword() {
  if (state.newPassword !== state.confirmPassword) {
    // TODO: Show validation error
    return;
  }

  loading.value = true;

  try {
    // TODO: Replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Success: close modal
    const { closeSlideover } = useAuthSlideover();
    closeSlideover();
  } catch (error) {
    console.error("Password reset failed:", error);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <UForm
    :state="state"
    :schema="formSchema"
    class="space-y-4"
    @submit="resetPassword"
  >
    <AuthFormHeadline
      title="Встановлення нового паролю"
    >
      <template #description>
        Код надісланий на
        <span class="font-medium text-gray-700">---</span>
      </template>
    </AuthFormHeadline>

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
      :loading="loading"
    >
      Змінити пароль
    </UButton>

    <div class="flex justify-center">
      <UButton
        variant="link"
        color="neutral"
        @click="setStage('enter-credential')"
      >
        Повернутися до форми входу
      </UButton>
    </div>
  </UForm>
</template>
