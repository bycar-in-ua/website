<script setup lang="ts">
import Logo from "~/components/UI/Logo.vue";
import { useQuizStore } from "#layers/quiz/stores/quiz";
import { PersonalProfile, SavedCars } from "#layers/profile/components/NavButtons";
import DesktopNavigation from "./DesktopNavigation.vue";
import MobileNavigation from "./MobileNavigation.vue";

const quizStore = useQuizStore();
</script>

<template>
  <header
    data-testid="bycar-header"
    class="py-4"
  >
    <div
      class="container flex gap-2 items-center justify-between"
    >
      <MobileNavigation class="basis-1/3 lg:hidden" />

      <div class="basis-1/3 inline-flex items-center justify-center lg:justify-normal">
        <NuxtLink to="/" class="flex h-10">
          <Logo class="h-full w-24" />
        </NuxtLink>
      </div>

      <DesktopNavigation class="basis-1/3 hidden lg:block" />

      <div class="basis-1/3 flex items-center justify-end">
        <SavedCars class="hidden lg:inline-flex" />

        <PersonalProfile />

        <UButton
          size="sm"
          class="ml-1.5 hidden lg:inline-flex"
          @click="quizStore.openQuiz"
        >
          Підбір авто
        </UButton>
      </div>
    </div>
  </header>
</template>
