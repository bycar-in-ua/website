<script setup lang="ts">
import AuthFormHeadline from "./AuthFormHeadline.vue";
</script>

<template>
  <UForm>
    <AuthFormHeadline title="Останній штрих" description="Введіть ваш номер телефону, щоб мати другий спосіб входу та можливість швидкого зв’язку щодо ваших запитів." class="mb-10" />

    <UFormField label="Телефон" name="phone">
      <UInput placeholder="+380" class="w-full" />
    </UFormField>

    <UButton class="mt-8" block>
      Продовжити
    </UButton>
  </UForm>
</template>
