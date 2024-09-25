<script setup lang="ts">
import Logo from "@/components/UI/Logo.vue";
</script>

<template>
  <div class="text-xs flex flex-col gap-2">
    <Logo />

    ©{{ new Date().getFullYear() }} | Усі права захищені
  </div>
</template>
