<script setup lang="ts">
import RoadSign from "~/components/UI/RoadSign.vue";

defineProps<{ title: string; }>();

defineEmits<{ done: []; }>();
</script>

<template>
  <div class="flex flex-col items-center gap-6">
    <RoadSign>
      Вибір
      <br>
      підтверджено
    </RoadSign>

    <p class="text-center font-semibold text-xl text-toned">
      Дані по {{ title }} успішно передані дилеру. Очікуйте дзвінок менеджера для обговорення деталей.
    </p>

    <UButton label="Готово" block @click="$emit('done')" />
  </div>
</template>
