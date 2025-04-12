<script setup lang="ts">
defineProps<{
  price: string | number;
  discountPrice?: string | number;
}>();
</script>

<template>
  <template v-if="discountPrice">
    <div class="line-through text-sm opacity-70">
      {{ price }}
    </div>
    <div>
      {{ discountPrice }}
    </div>
  </template>
  <template v-else>
    {{ price }}
  </template>
</template>
