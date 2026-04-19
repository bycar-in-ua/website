<script setup lang="ts">
import type { FormError } from "#ui/types";
import { useMutation } from "@tanstack/vue-query";

const props = withDefaults(defineProps<{ page: string;
  id?: string; }>(), { id: "contact-form" });

const { user } = useUserSession();

type FormState = {
  name: string;
  phone: string;
};

const formState = reactive<FormState>({
  name: user?.value?.data?.firstName ?? "",
  phone: user?.value?.data?.phone ?? "",
});

watch([user], () => {
  formState.name = user?.value?.data?.firstName ?? "";
  formState.phone = user?.value?.data?.phone ?? "";
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
    "contact-form-submit", props.page, user?.value?.data?.id,
  ],
  mutationFn: ({ name, phone }: FormState) => $fetch("/api/contact-form", {
    method: "POST",
    body: {
      name,
      phone,
      page: props.page,
      userId: user?.value?.data?.id,
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

// TODO: use real data
const orderItems = ref([
  "Авто під мій бюджет",
  "Авто під стиль життя",
  "Сімейне авто",
  "Авто для бізнесу",
  "Авто для початківця",
  "Інше",
]);
const orderValue = ref("");
</script>

<template>
  <UForm
    :state="formState"
    :validate="validate"
    class="p-4 md:p-8 flex flex-col gap-4 shadow-xl bg-white sm:max-w-104 min-w-64 w-full"
    :validate-on="['blur']"
    @submit="(e) => submitForm(e.data)"
  >
    <UFormField name="name" label="Імʼя" :ui="{ container: 'mt-1.5' }">
      <UInput
        :id="`${id}-name`"
        v-model:model-value="formState.name"
        placeholder="Введіть ваше імʼя"
        size="lg"
        :disabled="isSuccess"
        class="w-full placeholder:text-gray-500 font-medium text-base text-gray-950"
      />
    </UFormField>

    <UFormField name="phone" label="Телефон" :ui="{ container: 'mt-1.5' }">
      <UInput
        :id="`${id}-phone`"
        v-model:model-value="formState.phone"
        placeholder="+380"
        size="lg"
        mask="+38 (###) ###-##-##"
        type="tel"
        :disabled="isSuccess"
        class="w-full placeholder:text-gray-500 font-medium text-base text-gray-950"
      />
    </UFormField>

    <UFormField
      name="request"
      label="Запит"
      class="mb-4"
      :ui="{ container: 'mt-1.5' }"
    >
      <USelectMenu
        v-model="orderValue"
        :items="orderItems"
        placeholder="Оберіть ваш запит"
        class="w-full p-0 pb-1.5 border-b border-gray-200 disabled:border-gray-200 hover:border-primary font-medium text-base text-gray-950"
        variant="none"
        :ui="{
          placeholder:
            'text-gray-500 font-semibold hover:text-gray-700 w-full text-start',
          input: 'hidden px-4',
          group: 'py-3 px-3 gap-2',
          item: ['p-0 data-highlighted:not-data-disabled:before:bg-elevated/0'],
        }"
      >
        <template #item="{ item, index }">
          <div class="w-full">
            <URadioGroup
              v-model="orderValue"
              :items="[item]"
              indicator="end"
              size="sm"
              class="font-semibold text-sm text-gray-700"
              :ui="{
                wrapper: 'font-semibold text-sm text-gray-700',
              }"
            />
            <USeparator v-if="index !== orderItems.length - 1" class="my-2" />
          </div>
        </template>
      </USelectMenu>
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
