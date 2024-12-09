<script setup lang="ts">
import BluredEllipse from "@/components/UI/BluredEllipse.vue";
import type { FormError } from "#ui/types";

const props = defineProps<{ page: string }>();

type FormState = {
  name: string;
  phone: string;
};

const formState = reactive<FormState>({
  name: "",
  phone: "",
});

const validate = (state: FormState): FormError[] => {
  const errors = [];

  if (!state.name) {
    errors.push({ path: "name", message: "Будь ласка, вкажіть ім'я" });
  }

  if (!state.phone) {
    errors.push({
      path: "phone",
      message: "Будь ласка, вкажіть номер телефону",
    });
  }

  if (!/^\d{10,12}$/.test(state.phone.replace(/\D/g, ""))) {
    errors.push({
      path: "phone",
      message: "Введіть коректний номер телефону",
    });
  }

  if (/[a-zA-Z]/.test(state.phone)) {
    errors.push({
      path: "phone",
      message: "Номер телефону не повинен містити літер",
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
      },
    });
  },
);

const messageSent = computed(() => status.value === "success");
</script>

<template>
  <section
    class="my-4 md:my-24 flex flex-wrap md:flex-nowrap justify-center md:justify-normal gap-8 py-6 md:py-12 relative"
  >
    <slot name="ellipse">
      <BluredEllipse
        class="absolute w-[410px] h-[220px] right-14 -bottom-14 -z-10"
      />
    </slot>
    <div>
      <h3 class="text-2xl font-bold mb-2">
        Не впевнений, яке авто тобі підходить?<br />
        Запитай у експерта!
      </h3>
      <p class="text-base text-gray-500 mb-4">
        Сьогодні на зв'язку Євген. Справжній автофанат,<br />
        любить БМВ і свого песика Тобі
      </p>
      <UButton
        icon="i-heroicons-chat-bubble-bottom-center"
        trailing
        variant="outline"
        to="https://t.me/AJ201997"
        target="_blank"
      >
        Написати в чат
      </UButton>
    </div>

    <UForm
      :state="formState"
      :validate="validate"
      class="p-5 md:ml-auto flex flex-col gap-4 shadow-xl rounded-2xl bg-white max-w-[340px] w-full"
      :validate-on="['submit']"
      :disabled="true"
      @submit="submitForm"
    >
      <UFormGroup name="name">
        <UInput
          v-model:model-value="formState.name"
          placeholder="Ваше ім’я"
          size="lg"
          :disabled="messageSent"
        />
      </UFormGroup>

      <UFormGroup name="phone">
        <UInput
          v-model:model-value="formState.phone"
          placeholder="Ваш номер телефону"
          size="lg"
          mask="+38 (###) ###-##-##"
          type="tel"
          :disabled="messageSent"
        />
      </UFormGroup>

      <UButton v-if="messageSent" block disabled>
        Заявку надіслано!<br />
        Дякуємо за звернення
      </UButton>
      <UButton
        v-else
        icon="i-heroicons-phone"
        trailing
        block
        type="submit"
        :loading="status === 'pending'"
      >
        Передзвоніть мені
      </UButton>
    </UForm>
  </section>
</template>
