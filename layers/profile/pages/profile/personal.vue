<script setup lang="ts">
import SectionContainer from "../../components/SectionContainer.vue";

definePageMeta({
  name: "profile-personal",
});

const authStore = useAuthStore();

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
  <SectionContainer title="Персональні дані">
    <template #actions>
      <UButton :disabled="!form?.dirty" :loading @click="form?.submit()">
        Зберегти
      </UButton>
    </template>

    <UForm
      ref="form"
      :state="state"
      class="space-y-6"
      @submit="updatePersonalData"
    >
      <ProfileFormField label="Ваше фото" name="avatar">
        <div class="flex justify-between flex-col sm:flex-row gap-4">
          <UserAvatar :avatar="authStore.user?.avatar" class="w-40 h-40 text-current" />
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

          <div class="flex md:flex-row items-start gap-4">
            <UButton
              v-if="authStore.user?.avatar"
              variant="ghost"
              size="xs"
              color="neutral"
              @click="removeAvatar"
            >
              Видалити
            </UButton>
            <UButton
              variant="ghost"
              size="xs"
              :loading="isUploadingAvatar"
              @click="fileInput?.inputRef?.click()"
            >
              Завантажити
            </UButton>
          </div>
        </div>
      </ProfileFormField>

      <USeparator />

      <ProfileFormField label="Ім'я" name="firstName">
        <UInput
          v-model="state.firstName"
          placeholder="Вкажіть ім'я"
          class="w-full"
        />
      </ProfileFormField>

      <ProfileFormField label="Прізвище" name="lastName">
        <UInput
          v-model="state.lastName"
          placeholder="Вкажіть прізвище"
          class="w-full"
        />
      </ProfileFormField>
    </UForm>
  </SectionContainer>
</template>
