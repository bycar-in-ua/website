<script setup lang="ts">
import InputPassword from "../UI/InputPassword.vue";

const { user } = useAuthStore();
</script>

<template>
  <div class="w-full grow space-y-8">
    <div class="space-y-4">
      <h2 class="text-lg lg:text-xl sm:text-2xl">Аватар профіля</h2>

      <div class="space-x-8">
        <UAvatar :src="user?.avatar" class="w-40 h-40" />
        <UButton>Змінити аватар</UButton>
        <UButton variant="outline"> Видалити аватар </UButton>
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-lg lg:text-xl sm:text-2xl">Особиста інформація</h2>

      <div class="flex flex-wrap items-center gap-x-10 gap-y-4">
        <UFormField label="Ім'я">
          <UInput
            placeholder="Вкажіть Ваше ім'я"
            class="w-72"
            :value="user?.firstName"
          />
        </UFormField>

        <UFormField label="Прізвище">
          <UInput
            placeholder="Вкажіть Ваше прізвище"
            class="w-72"
            :value="user?.lastName"
          />
        </UFormField>
      </div>

      <div class="flex items-center gap-10">
        <UFormField label="Email">
          <div class="flex flex-wrap items-center gap-x-10 gap-y-4">
            <UInput
              placeholder="Вкажіть Ваш email"
              :value="user?.email"
              class="w-72"
            />

            <div
              v-if="user?.emailVerified"
              class="flex items-center gap-4 w-72 text-primary-500"
            >
              <UIcon name="i-heroicons-check-circle" class="min-w-8 h-8" />
              Email підтверджено
            </div>
            <div v-else class="flex items-center gap-4 w-72 text-secondary-600">
              <UIcon
                name="i-heroicons-exclamation-circle"
                class="min-w-8 h-8"
              />
              Email не підтверджено
            </div>
          </div>
        </UFormField>
      </div>

      <div class="flex items-center gap-10">
        <UFormField label="Phone">
          <div class="flex flex-wrap items-center gap-x-10 gap-y-4">
            <UInput
              placeholder="Вкажіть Ваш телефон"
              :value="user?.phone"
              class="w-72"
            />

            <div
              v-if="user?.phoneVerified"
              class="flex items-center gap-4 w-72 text-primary-500"
            >
              <UIcon name="i-heroicons-check-circle" class="min-w-8 h-8" />
              Номер підтверджено
            </div>
            <div v-else class="flex items-center gap-4 w-72 text-secondary-600">
              <UIcon
                name="i-heroicons-exclamation-circle"
                class="min-w-8 h-8"
              />
              Номер не підтверджено
            </div>
          </div>
        </UFormField>
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-lg lg:text-xl sm:text-2xl">Пароль</h2>

      <p class="text-sm">
        Натисніть цю кнопку, щоб змінити пароль. Ми надішлемо листа на вашу
        електронну пошту з подальшими інструкціями.
      </p>

      <UButton>Змінити пароль</UButton>

      <UFormField label="Новий пароль">
        <InputPassword
          placeholder="Введіть новий пароль"
          size="md"
          class="w-72"
        />
      </UFormField>
    </div>

    <div class="space-y-4">
      <h2 class="text-lg lg:text-xl sm:text-2xl">Інтеграції</h2>

      <UFormField label="Підключити google профіль">
        <InputPassword
          placeholder="Введіть новий пароль"
          size="md"
          class="w-72"
        />
      </UFormField>
    </div>

    <div class="space-y-4">
      <h2 class="text-lg lg:text-xl sm:text-2xl">Видалити аккаунт</h2>

      <UButton variant="outline" color="error"> Видалити аккаунт </UButton>
    </div>
  </div>
</template>
