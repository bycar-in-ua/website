<script setup lang="ts">
definePageMeta({ name: "profile-personal" });

const {
  state,
  schema,
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
    <UFormField label="Ім'я" name="firstName">
      <UInput
        v-model="state.name"
        placeholder="Вкажіть ім'я"
        class="w-full"
      />
    </UFormField>

    <UFormField label="Пошта" name="email">
      <UInput
        v-model="state.email"
        class="w-full"
      />
    </UFormField>

    <UFormField label="Телефон" name="phone">
      <UInput
        v-model="state.phone"
        class="w-full"
      />
    </UFormField>

    <div class="flex flex-col items-start sm:flex-row sm:justify-between gap-6">
      <UButton
        label="Зберегти"
        :disabled="!form?.dirty"
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
