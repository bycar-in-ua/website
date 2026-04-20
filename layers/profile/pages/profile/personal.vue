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

    <div class="flex flex-col gap-6 sm:flex-row">
      <UButton
        label="Зберегти"
        :disabled="!form?.dirty"
        :loading
        block
        class="lg:w-fit"
        @click="form?.submit()"
      />

      <UButton
        label="Вийти"
        icon="i-lucide-log-out"
        block
        variant="outline"
        color="neutral"
        class="lg:hidden"
        @click="logout()"
      />
    </div>
  </UForm>
</template>
