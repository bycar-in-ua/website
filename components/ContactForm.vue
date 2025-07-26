<script setup lang="ts">
import type { FormError } from "#ui/types";

const props = withDefaults(defineProps<{ page: string; id?: string }>(), {
  id: "contact-form",
});

const { gtag } = useGtag();

const authStore = useAuthStore();

type FormState = {
  name: string;
  phone: string;
};

const formState = reactive<FormState>({
  name: authStore.user?.firstName ?? "",
  phone: authStore.user?.phone ?? "",
});

watchEffect(() => {
  formState.name = authStore.user?.firstName ?? "";
  formState.phone = authStore.user?.phone ?? "";
});

const validate = (state: Partial<FormState>): FormError[] => {
  const errors = [];

  if (!state.name) {
    errors.push({ path: "name", message: "Будь ласка, вкажіть ім'я" });
  }

  const phone = state?.phone;

  if (!phone) {
    errors.push({
      path: "phone",
      message: "Будь ласка, вкажіть номер телефону",
    });

    return errors;
  }

  if (/[a-zA-Z]/.test(phone)) {
    errors.push({
      path: "phone",
      message: "Номер телефону не повинен містити літер",
    });
  }

  const isTooShort = phone.startsWith("0") && phone.length < 10;
  const isNotMatchingFormat = !/^\d{10,12}$/.test(
    state?.phone?.replace(/\D/g, "") ?? "",
  );

  if (isTooShort || isNotMatchingFormat) {
    errors.push({
      path: "phone",
      message: "Введіть коректний номер телефону",
    });
  }

  return errors;
};

const { status, refresh: submitForm } = useAsyncData(
  "submit-contact-form",
  async () => {
    await $fetch("/api/contact-form", {
      method: "POST",
      body: {
        name: formState.name,
        phone: formState.phone,
        page: props.page,
        userId: authStore.user?.id,
      },
    });
    gtag("event", "contact_form_submit", {
      event_category: "engagement",
      event_label: props.page,
    });
  },
  {
    immediate: false,
  },
);

const messageSent = computed(() => status.value === "success");
</script>

<template>
  <UForm
    :state="formState"
    :validate="validate"
    class="p-5 flex flex-col gap-4 shadow-xl rounded-2xl bg-white max-w-[340px] w-full"
    :validate-on="['blur']"
    @submit="submitForm"
  >
    <UFormField name="name">
      <UInput
        :id="`${id}-name`"
        v-model:model-value="formState.name"
        placeholder="Ваше ім’я"
        size="lg"
        :disabled="messageSent"
        class="w-full"
      />
    </UFormField>

    <UFormField name="phone">
      <UInput
        :id="`${id}-phone`"
        v-model:model-value="formState.phone"
        placeholder="Ваш номер телефону"
        size="lg"
        mask="+38 (###) ###-##-##"
        type="tel"
        :disabled="messageSent"
        class="w-full"
      />
    </UFormField>

    <UButton v-if="messageSent" block disabled>
      Заявку надіслано!<br />
      Дякуємо за звернення
    </UButton>
    <UButton
      v-else
      icon="i-heroicons-phone"
      block
      type="submit"
      size="lg"
      :loading="status === 'pending'"
    >
      Передзвоніть мені
    </UButton>
  </UForm>
</template>
