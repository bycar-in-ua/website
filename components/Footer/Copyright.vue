<script setup lang="ts">
import Logo from "@/components/UI/Logo.vue";
import { COPYRIGHT_TEXT } from "@/utils/constants";
</script>

<template>
  <div class="text-xs flex flex-col items-start gap-4">
    <Logo class="h-11" />

    {{ COPYRIGHT_TEXT }}
  </div>
</template>
