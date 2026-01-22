<script setup lang="ts">
import { useAuthStage } from "../composables/useAuthStage";
import AuthFormHeadline from "./AuthFormHeadline.vue";
import { useAuthSlideover } from "../composables/useAuthSlideover";

const { credential, setStage } = useAuthStage();

const loading = ref(false);
const code = ref([]);

const isValid = computed(() => code.value.length === 4);

async function confirmOtp() {
  if (!isValid.value) return;

  loading.value = true;

  try {
    // TODO: Replace with actual API call when backend is ready
    // This should verify OTP and complete login/registration
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Mock: Close modal and redirect to profile
    const { closeSlideover } = useAuthSlideover();
    closeSlideover();

    // TODO: Navigate to profile after successful auth
  } catch (error) {
    console.error("OTP verification failed:", error);
  } finally {
    loading.value = false;
  }
}

async function resendCode() {
  // TODO: Implement resend OTP
  console.log("Resending code to:", credential.value);
}
</script>

<template>
  <UForm :state="{ code }" class="space-y-4">
    <AuthFormHeadline title="Підтвердження">
      <template #description>
        Код надісланий на
        <span class="font-medium text-gray-700">{{ credential }}</span>
      </template>
    </AuthFormHeadline>

    <UFormField class="flex justify-center">
      <UPinInput v-model="code" :length="4" size="xl" />
    </UFormField>

    <UButton
      block
      size="xl"
      type="submit"
      :loading="loading"
      :disabled="!isValid"
      @click="confirmOtp"
    >
      Підтвердити
    </UButton>

    <div class="flex justify-center items-center text-sm mt-4">
      <span class="text-gray-500">Не отримали код?</span>
      <UButton variant="link" @click="resendCode">
        Надіслати повторно
      </UButton>
    </div>

    <div class="flex justify-center">
      <UButton
        variant="link"
        color="neutral"
        @click="setStage('enter-credential')"
      >
        Змінити номер або пошту
      </UButton>
    </div>
  </UForm>
</template>
