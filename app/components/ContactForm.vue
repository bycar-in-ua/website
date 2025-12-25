<script setup lang="ts">
import type { FormError } from "#ui/types";
import { useMutation } from "@tanstack/vue-query";
import { useAuthStore } from "#layers/profile/stores/auth";

const props = withDefaults(defineProps<{ page: string;
  id?: string; }>(), { id: "contact-form" });

const authStore = useAuthStore();

type FormState = {
  name: string;
  phone: string;
};

const formState = reactive<FormState>({
  name: authStore.user?.firstName ?? "",
  phone: authStore.user?.phone ?? "",
});

watch([authStore.user], () => {
  formState.name = authStore.user?.firstName ?? "";
  formState.phone = authStore.user?.phone ?? "";
});

const validate = (state: Partial<FormState>): FormError[] => {
  const errors = [];

  if (!state.name) {
    errors.push({
      path: "name",
      message: "Будь ласка, вкажіть ім'я",
    });
  }

  const phone = state?.phone;

  if (!phone) {
    errors.push({
      path: "phone",
      message: "Будь ласка, вкажіть номер телефону",
    });

    return errors;
  }

  if (/[a-z]/i.test(phone)) {
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

const { gtag } = useGtag();
const { $fbq } = useNuxtApp();

const {
  mutate: submitForm, isSuccess, isPending,
} = useMutation({
  mutationKey: [
    "contact-form-submit", props.page, authStore.user?.id,
  ],
  mutationFn: ({ name, phone }: FormState) => $fetch("/api/contact-form", {
    method: "POST",
    body: {
      name,
      phone,
      page: props.page,
      userId: authStore.user?.id,
    },
  }),
  onSuccess: () => {
    gtag("event", "contact_form_submit", {
      event_category: "engagement",
      event_label: props.page,
    });
    $fbq?.("track", "Lead", {
      content_name: "Contact Form Submit",
      content_category: props.page,
    });
  },
});
</script>

<template>
  <UForm
    :state="formState"
    :validate="validate"
    class="p-8 flex flex-col gap-4 shadow-xl bg-white max-w-[416px] w-full"
    :validate-on="['blur']"
    @submit="(e) => submitForm(e.data)"
  >
    <UFormField name="name" label="Імʼя">
      <UInput
        :id="`${id}-name`"
        v-model:model-value="formState.name"
        placeholder="Введіть ваше імʼя"
        size="lg"
        :disabled="isSuccess"
        class="w-full"
      />
    </UFormField>

    <UFormField name="phone" label="Телефон">
      <UInput
        :id="`${id}-phone`"
        v-model:model-value="formState.phone"
        placeholder="+380"
        size="lg"
        mask="+38 (###) ###-##-##"
        type="tel"
        :disabled="isSuccess"
        class="w-full"
      />
    </UFormField>

    <UFormField name="request" label="Запит" class="mb-4">
      <USelectMenu placeholder="Оберіть ваш запит" class="w-full" variant="ghost" />
    </UFormField>

    <UButton v-if="isSuccess" block disabled>
      Заявку надіслано!<br>
      Дякуємо за звернення
    </UButton>

    <UButton
      v-else
      block
      type="submit"
      :loading="isPending"
    >
      Отримати консультацію
    </UButton>
  </UForm>
</template>
