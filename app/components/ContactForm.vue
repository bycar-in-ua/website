<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import * as v from "valibot";
import { phoneRegex } from "#shared/validation";
import RoadSign from "~/components/UI/RoadSign.vue";

type Props = {
  page: string;
  id?: string;
};

const props = withDefaults(defineProps<Props>(), { id: "contact-form" });

const { user } = useUserSession();

const formStateSchema = v.object({
  name: v.optional(v.string()),
  phone: v.pipe(v.string(), v.regex(phoneRegex, "Недійсний номер телефону")),
  request: v.optional(v.string()),
  message: v.optional(v.string()),
});

type FormState = v.InferInput<typeof formStateSchema>;

const formState = reactive<FormState>({
  name: user?.value?.data?.firstName ?? "",
  phone: user?.value?.data?.phone ?? "",
  request: "",
  message: "",
});

watch([user], () => {
  formState.name = user?.value?.data?.firstName ?? "";
  formState.phone = user?.value?.data?.phone ?? "";
});

const { gtag } = useGtag();
const { $fbq } = useNuxtApp();
const toast = useToast();

const {
  mutate: submitForm, isSuccess, isPending, isIdle, reset: resetMutation,
} = useMutation({
  mutationKey: [
    "contact-form-submit", props.page, user?.value?.data?.id,
  ],
  mutationFn: (state: FormState) => $fetch("/api/contact-form", {
    method: "POST",
    body: {
      ...state,
      page: props.page,
      userId: user?.value?.data?.id,
    },
    onResponseError({ response }) {
      const data = response._data as { message?: string; };

      toast.add({
        color: "error",
        title: "Сталася помилка при відправці форми",
        description: data?.message,
      });
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

const resetForm = () => {
  formState.name = user?.value?.data?.firstName ?? "";
  formState.phone = user?.value?.data?.phone ?? "";
  formState.request = "";
  formState.message = "";
  resetMutation();
};

const requests = ref([
  "Не можу визначитися з вибором авто",
  "Хочу отримати консультацію щодо конкретної моделі",
  "Шукаю кращу ціну на конкретну модель",
  "Інше",
]);
</script>

<template>
  <div class="p-4 md:p-8 shadow-xl bg-white sm:max-w-104 min-w-64 w-full">
    <UForm
      v-if="isIdle"
      :state="formState"
      :schema="formStateSchema"
      :validate-on="['blur']"
      class="flex flex-col gap-4 "
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
        :ui="{ container: 'mt-1.5' }"
      >
        <USelectMenu
          v-model="formState.request"
          :items="requests"
          placeholder="Оберіть ваш запит"
          class="w-full p-0 pb-1.5 border-b border-gray-200 disabled:border-gray-200 hover:border-primary font-medium text-base text-gray-950"
          variant="none"
          :ui="{
            placeholder:
              'text-gray-500 font-semibold hover:text-gray-700 w-full text-start',
            input: 'hidden px-4',
            group: 'py-1 px-4 gap-2 divide-y divide-gray-100',
            item: 'px-0 py-2',
          }"
        >
          <template #item="{ item }">
            <URadioGroup
              v-model="formState.request"
              :items="[item]"
              indicator="end"
              size="sm"
              :ui="{
                root: 'w-full',
                wrapper: 'font-semibold text-sm text-gray-700',
              }"
            />
          </template>
        </USelectMenu>
      </UFormField>

      <UFormField
        v-if="formState.request === 'Інше'"
        name="message"
        label="Повідомлення"
      >
        <UTextarea
          :id="`${id}-message`"
          v-model:model-value="formState.message"
          placeholder="Додайте повідомлення (необовʼязково)"
          size="lg"
          autoresize
          :max-rows="3"
          class="w-full"
        />
      </UFormField>

      <UButton
        block
        type="submit"
        class="mt-4"
        :loading="isPending"
      >
        Отримати консультацію
      </UButton>
    </UForm>

    <div v-if="isSuccess" class="text-default flex flex-col items-center">
      <RoadSign class="mb-2">
        Запит отримано
      </RoadSign>

      <p class="text-center text-toned mb-8">
        Ми вже отримали ваш запит і незабаром зв’яжемось, щоб допомогти з вибором авто
      </p>

      <UButton block label="Залишити ще один запит" @click="resetForm" />
    </div>
  </div>
</template>
