<script setup lang="ts">
import DrawerSlideover from "~/components/UI/DrawerSlideover.vue";
import AuthFormHeadline from "#layers/auth/components/AuthFormHeadline.vue";
import OtpTimer from "#layers/auth/components/OtpTimer.vue";
import type { ContactType } from "../composables/useContactVerification";

const props = defineProps<{
  type: ContactType;
  contact?: string;
  timer: number;
  loading?: boolean;
  error?: string;
}>();

const emit = defineEmits<{
  verify: [code: string];
  resend: [];
}>();

const open = defineModel<boolean>("open", { default: false });

const pinModel = ref<string[]>([]);

watch(open, (value) => {
  if (value) {
    pinModel.value = [];
  }
});

const title = computed(() => props.type === "phone" ? "Підтвердження номера" : "Підтвердження пошти");

const description = computed(() => {
  const contactPart = props.type === "phone"
    ? `Надіслали SMS із кодом на телефон ${props.contact}.`
    : `Надіслали лист із кодом на пошту ${props.contact}.`;

  return `${contactPart} Введіть його нижче, щоб ми знали, що це саме ви.`;
});

const submitHandler = () => {
  if (pinModel.value.length === 4) {
    emit("verify", pinModel.value.join(""));
  }
};
</script>

<template>
  <DrawerSlideover
    v-model:open="open"
    :ui="{
      header: 'border-b-0',
      body: 'md:px-8',
    }"
  >
    <template #body>
      <div class="mt-1.5 sm:mt-3 md:mt-14">
        <UForm :state="{}" :disabled="loading" @submit="submitHandler">
          <AuthFormHeadline :title :description />

          <UFormField
            label="Введіть код"
            name="code"
            :error
            :ui="{ root: 'mb-6 sm:mb-8' }"
          >
            <UPinInput
              v-model="pinModel"
              :length="4"
              placeholder="—"
              otp
              class="w-full"
              @complete="submitHandler"
            />
          </UFormField>

          <UButton
            block
            type="submit"
            :loading
            :disabled="pinModel.length !== 4"
          >
            Продовжити
          </UButton>

          <OtpTimer class="mt-4 md:mt-3" :timer @resend="emit('resend')" />
        </UForm>
      </div>
    </template>
  </DrawerSlideover>
</template>
