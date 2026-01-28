<script setup lang="ts">
definePageMeta({ name: "profile-personal" });

const { user } = useUserSession();

const {
  state,
  updatePersonalData,
  loading,
  uploadAvatar,
  isUploadingAvatar,
  removeAvatar,
} = usePersonalDataForm();

const form = useTemplateRef("form");
const fileInput = useTemplateRef("fileInput");
</script>

<template>
  <div>
    <UForm
      ref="form"
      :state="state"
      class="space-y-6"
      @submit="({ data }) => updatePersonalData(data)"
    >
      <UFormField label="Ваше фото" name="avatar">
        <UserAvatar :avatar="user?.data?.avatar" class="w-40 h-40 text-current mt-4" />
        <UInput
          ref="fileInput"
          type="file"
          accept="image/png, image/jpeg"
          class="sr-only"
          @change="
            (e: Event) => {
              const target = e.target as HTMLInputElement;

              if (!target.files?.[0]) {
                return;
              }

              uploadAvatar(target.files[0]);
            }
          "
        />

        <div class="flex md:flex-row items-start gap-2 mt-4">
          <UButton
            v-if="user?.data?.avatar"
            variant="outline"
            color="neutral"
            size="sm"
            @click="removeAvatar"
          >
            Видалити
          </UButton>
          <UButton
            variant="outline"
            size="sm"
            :loading="isUploadingAvatar"
            @click="fileInput?.inputRef?.click()"
          >
            Оновити
          </UButton>
        </div>
      </UFormField>

      <UFormField label="Ім'я" name="firstName">
        <UInput
          v-model="state.firstName"
          placeholder="Вкажіть ім'я"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Прізвище" name="lastName">
        <UInput
          v-model="state.lastName"
          placeholder="Вкажіть прізвище"
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

      <UButton :disabled="!form?.dirty" :loading @click="form?.submit()">
        Зберегти
      </UButton>
    </UForm>
  </div>
</template>
