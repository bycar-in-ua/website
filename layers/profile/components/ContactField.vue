<script setup lang="ts">
import * as v from "valibot";
import { emailSchema, phoneSchema } from "#shared/validation";
import { useContactVerification, type ContactType } from "../composables/useContactVerification";
import ContactVerificationSlideover from "./ContactVerificationSlideover.vue";

const props = defineProps<{
  type: ContactType;
  label: string;
}>();

const value = defineModel<string>({ default: "" });

const { user } = useUserSession();
const toast = useToast();

const savedContact = computed(() => props.type === "phone" ? user.value?.data?.phone : user.value?.data?.email);
const savedVerified = computed(() => props.type === "phone" ? user.value?.data?.phoneVerified : user.value?.data?.emailVerified);

const isConfirmed = computed(() => Boolean(value.value) && value.value === savedContact.value && savedVerified.value);
const canConfirm = computed(() => Boolean(value.value.trim()) && !isConfirmed.value);

const warning = computed(() => {
  if (isConfirmed.value) {
    return;
  }

  const purpose = "щоб мати другий спосіб входу та можливість швидкого зв’язку щодо ваших запитів.";

  if (!value.value) {
    return props.type === "phone"
      ? `Введіть ваш номер телефону, ${purpose}`
      : `Введіть вашу пошту, ${purpose}`;
  }

  return props.type === "phone"
    ? `Підтвердіть ваш номер телефону, ${purpose}`
    : `Підтвердіть вашу пошту, ${purpose}`;
});

const confirmLabel = computed(() => props.type === "phone" ? "Підтвердити номер" : "Підтвердити пошту");

const validationError = ref<string>();

watch(value, () => {
  validationError.value = undefined;
});

const {
  isOpen,
  pendingContact,
  timer,
  codeError,
  isSending,
  isVerifying,
  start,
  resend,
  verify,
} = useContactVerification();

const confirmHandler = async () => {
  const contact = value.value.trim();
  const result = v.safeParse(props.type === "phone" ? phoneSchema : emailSchema, contact);

  if (!result.success) {
    validationError.value = result.issues[0].message;
    return;
  }

  await start(contact);
};

const verifyHandler = async (code: string) => {
  if (await verify(code)) {
    toast.add({
      description: props.type === "phone"
        ? "Чудово! Ваш номер успішно підтверджено."
        : "Чудово! Вашу пошту успішно підтверджено.",
      color: "neutral",
    });
  }
};
</script>

<template>
  <UFormField :label :name="type" :error="validationError">
    <template v-if="canConfirm" #hint>
      <UButton
        variant="link"
        size="xs"
        :loading="isSending"
        class="uppercase p-0 sm:hidden"
        @click="confirmHandler"
      >
        Підтвердити
      </UButton>
    </template>

    <UInput
      v-model="value"
      :type="type === 'phone' ? 'tel' : 'email'"
      :placeholder="type === 'phone' ? '+380' : 'example@gmail.com'"
      class="w-full"
      @keydown.enter.prevent="canConfirm && confirmHandler()"
    >
      <template v-if="canConfirm" #trailing>
        <UButton
          variant="link"
          size="xs"
          :loading="isSending"
          class="uppercase p-0 max-sm:hidden"
          @click="confirmHandler"
        >
          {{ confirmLabel }}
        </UButton>
      </template>
    </UInput>

    <UAlert
      v-if="warning"
      :description="warning"
      color="warning"
      variant="subtle"
      icon="i-lucide-circle-alert"
      class="mt-4"
    />

    <ContactVerificationSlideover
      v-model:open="isOpen"
      :type
      :contact="pendingContact"
      :timer
      :loading="isVerifying"
      :error="codeError"
      @verify="verifyHandler"
      @resend="resend"
    />
  </UFormField>
</template>
