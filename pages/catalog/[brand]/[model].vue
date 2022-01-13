<template>
  <div class="bycar-container py-5 lg:py-10">
    <Title />
    <Media class="max-h-64" />
    <GeneralInfo />
    <Tabs />
  </div>
</template>

<script lang="ts">
export default {
  name: "CarModelPage",
};
</script>

<script setup lang="ts">
import Title from "@/components/Single/Title.vue";
import Media from "@/components/Single/Media.vue";
import GeneralInfo from "@/components/Single/GeneralInfo.vue";
import Tabs from "@/components/Single/Tabs.vue";
</script>
