<script setup lang="ts">
import InputPassword from "../UI/InputPassword.vue";
import SectionContainer from "./SectionContainer.vue";
</script>

<template>
  <SectionContainer title="Пароль">
    <template #default>
      <div class="space-y-6">
        <div class="flex gap-8">
          <div class="w-80">
            <span>Діючий пароль</span>
          </div>

          <InputPassword
            size="md"
            placeholder="Вкажіть діючий пароль"
            class="w-lg"
          />
        </div>

        <USeparator />

        <div class="flex gap-8">
          <div class="w-80">
            <span>Новий пароль</span>
          </div>

          <InputPassword
            size="md"
            placeholder="Вкажіть новий пароль"
            class="w-lg"
          />
        </div>

        <USeparator />

        <div class="flex gap-8">
          <div class="w-80">
            <span>Підтвердити новий пароль</span>
          </div>

          <InputPassword
            size="md"
            placeholder="Підтвердіть новий пароль"
            class="w-lg"
          />
        </div>
      </div>
    </template>
  </SectionContainer>
</template>
