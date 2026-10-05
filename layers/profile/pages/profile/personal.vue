<script setup lang="ts">
import ContactField from "../../components/ContactField.vue";

definePageMeta({ name: "profile-personal" });

const {
  state,
  schema,
  isNameChanged,
  updatePersonalData,
  loading,
} = usePersonalDataForm();

const form = useTemplateRef("form");

const { logout } = useLogout();
</script>

<template>
  <UForm
    ref="form"
    :state
    :schema
    class="space-y-6"
    @submit="(e) => { updatePersonalData(e.data) }"
  >
    <UFormField label="Ім'я" name="name">
      <UInput
        v-model="state.name"
        placeholder="Вкажіть ім'я"
        class="w-full"
      />
    </UFormField>

    <ContactField
      v-model="state.email"
      type="email"
      label="Пошта"
    />

    <ContactField
      v-model="state.phone"
      type="phone"
      label="Телефон"
    />

    <div class="flex flex-col items-start sm:flex-row sm:justify-between gap-6">
      <UButton
        label="Зберегти"
        :disabled="!isNameChanged"
        :loading
        class="max-sm:w-full justify-center"
        @click="form?.submit()"
      />

      <UButton
        label="Вийти"
        icon="i-lucide-log-out"
        variant="outline"
        color="neutral"
        class="max-sm:w-full justify-center lg:hidden"
        @click="logout()"
      />
    </div>
  </UForm>
</template>
