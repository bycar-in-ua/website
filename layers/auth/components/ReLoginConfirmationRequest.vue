<script setup lang="ts">
import AuthFormHeadline from "./AuthFormHeadline.vue";
</script>

<template>
  <div>
    <AuthFormHeadline title="Останній штрих" description="Ви вказали цей номер під час знайомства, але не встигли його підтвердити. Зробіть це зараз, щоб мати два способи входу та зв’язку щодо ваших запитів." />

    <div class="my-10 text-center text-lg font-bold">
      +380 67 *** ** 12
    </div>

    <UButton class="mb-2" block>
      Підтвердити цей номер
    </UButton>
    <UButton variant="outline" block>
      Вказати інший номер
    </UButton>
  </div>
</template>
