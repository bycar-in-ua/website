<script setup lang="ts">
import SectionContainer from "./SectionContainer.vue";

const { user } = useAuthStore();
</script>

<template>
  <SectionContainer title="Особисті дані">
    <template #default>
      <div class="space-y-6">
        <div class="flex gap-8">
          <div class="w-80">
            <span>Ваше фото</span>
          </div>

          <div class="flex justify-between w-lg">
            <div>
              <UAvatar
                v-if="user?.avatar"
                :src="user.avatar"
                class="min-w-20 h-20"
              />
              <UIcon
                v-else
                name="i-heroicons-user-circle"
                class="min-w-20 h-20"
              />
            </div>

            <div
              class="flex flex-col-reverse md:flex-row items-center justify-around gap-x-4"
            >
              <UButton variant="ghost" size="xs" color="neutral">
                Видалити
              </UButton>
              <UButton variant="ghost" size="xs"> Замінити </UButton>
            </div>
          </div>
        </div>

        <USeparator />

        <div class="flex gap-8">
          <div class="w-80">
            <span>Ваше імʼя</span>
          </div>

          <UInput placeholder="Вкажіть ім'я" class="w-lg" />
        </div>

        <USeparator />

        <div class="flex gap-8">
          <div class="w-80">
            <span>Ваше прізвище</span>
          </div>

          <UInput placeholder="Вкажіть прізвище" class="w-lg" />
        </div>

        <USeparator />

        <div class="flex gap-8">
          <div class="w-80">
            <span>Ваша пошта</span>
          </div>

          <UInput placeholder="Вкажіть email" class="w-lg" />
        </div>

        <USeparator />

        <div class="flex gap-8">
          <div class="w-80">
            <span>Ваш номер телефону</span>
          </div>

          <UInput placeholder="Вкажіть номер телефону" class="w-lg" />
        </div>
      </div>
    </template>
  </SectionContainer>
</template>
