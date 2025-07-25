<script setup lang="ts">
import type { TabsItem, DropdownMenuItem } from "@nuxt/ui";
import PersonalDataSection from "../components/PersonalDataSection.vue";
import SecuritySection from "../components/SecuritySection.vue";
import SavedCars from "../components/SavedCars.vue";

definePageMeta({
  middleware: "auth",
  name: "profile",
});

const authStore = useAuthStore();

useHead({
  title: [authStore.name, "Профіль", "Bycar"].filter(Boolean).join(" | "),
});

const activeTab = ref("saved-cars");

const items: TabsItem[] = [
  {
    label: "Збережені авто",
    value: "saved-cars",
    slot: "saved-cars",
    icon: "i-heroicons-solid-heart",
  },
  {
    label: "Персональні дані",
    value: "personal",
    slot: "personal",
    icon: "i-heroicons-solid-user",
  },
  {
    label: "Безпека",
    value: "security",
    slot: "security",
    icon: "i-heroicons-solid-lock-closed",
  },
] as const;

const dropdownItems: DropdownMenuItem[] = items.map(
  ({ label, disabled, value, icon }) => ({
    label,
    disabled,
    icon,
    checked: value === activeTab.value,
    onSelect: () => {
      activeTab.value = value as string;
    },
  }),
);
</script>

<template>
  <main class="container my-24 md:my-32">
    <div class="rounded-3xl overflow-hidden h-24 sm:h-40 md:h-60 relative">
      <img
        src="/images/profile-bg.png"
        alt="Profile background"
        class="h-full w-full object-cover"
      />
    </div>

    <div class="relative -top-10 z-10 px-4 sm:px-8 space-y-2">
      <div class="bg-white rounded-full inline-block">
        <UserAvatar :avatar="authStore.user?.avatar" class="w-20 h-20" />
      </div>

      <div class="flex items-center justify-between">
        <h3 class="font-semibold text-xl sm:text-3xl">
          {{ authStore.name }}
        </h3>
        <UButton
          label="Вийти"
          icon="i-lucide-log-out"
          trailing
          variant="link"
          color="neutral"
          title="Вийти"
          @click="authStore.logout()"
        />
      </div>
    </div>

    <UTabs
      v-model="activeTab"
      variant="link"
      :items="items"
      :ui="{
        root: 'w-full gap-8',
        trigger: 'grow sm:grow-0 basis-1 sm:basis-auto',
      }"
    >
      <template #list-trailing>
        <UDropdownMenu :items="dropdownItems" class="sm:hidden">
          <UButton
            icon="i-heroicons-ellipsis-vertical"
            variant="link"
            color="primary"
          />
        </UDropdownMenu>
      </template>

      <template #saved-cars>
        <SavedCars />
      </template>

      <template #personal>
        <PersonalDataSection />
      </template>
      <template #security>
        <SecuritySection />
      </template>
    </UTabs>
  </main>
</template>
