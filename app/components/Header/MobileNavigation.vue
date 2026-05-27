<script setup lang="ts">
import type { NavigationMenuItem } from "#ui/types";
import Socials from "~/components/UI/Socials.vue";
import { BookmarkFilled } from "~/components/UI/Icons";
import { useQuizStore } from "#layers/quiz/stores/quiz";

const { t } = useI18n();
const { profile } = useProfile();

const open = ref(false);

watchEffect(() => {
  if (import.meta.server) return;

  document.documentElement.style.overflow = open.value ? "hidden" : "";

  if (open.value) {
    document.documentElement.scrollIntoView({ behavior: "smooth" });
  }
});

const savedCarsCount = computed(() => profile.data.value?.savedCars?.length || 0);

const menuItems: NavigationMenuItem[] = [
  {
    label: "Обране",
    to: "/profile/saved-cars",
    icon: profile.data.value?.savedCars?.length ? BookmarkFilled : "i-lucide-bookmark",
    chip: savedCarsCount.value
      ? {
          text: String(savedCarsCount.value),
          size: "3xl",
          color: "neutral",
        }
      : false,
  },
  {
    label: "Aвто в наявності",
    to: "/catalog/available",
  },
  {
    label: "Каталог моделей",
    to: "/catalog",
  },
  {
    label: t("menu.about"),
    to: "/about",
  },
];

const quizStore = useQuizStore();

const handleOpenQuiz = () => {
  open.value = false;
  quizStore.openQuiz();
};

const router = useRouter();

router.afterEach(() => {
  open.value = false;
});
</script>

<template>
  <div>
    <UButton
      :leading-icon="open ? 'i-lucide-x' : 'i-lucide-menu'"
      variant="link"
      color="secondary"
      size="sm"
      :ui="{ leadingIcon: 'size-6 lg:size-5' }"
      @click="open = !open"
    />

    <USlideover
      v-model:open="open"
      side="left"
      :close="false"
      :dismissible="false"
      :overlay="false"
      :modal="false"
      :ui="{ content: 'max-w-screen sm:max-w-screen w-full bottom-0 top-18 border-t border-gray-200', body: 'pt-0' }"
    >
      <template #body>
        <UNavigationMenu
          :items="menuItems"
          orientation="vertical"
          variant="link"
          :ui="{
            link: 'uppercase px-0 py-4 text-primary-900 font-semibold data-active:text-primary',
            linkLeadingIcon: 'size-6 text-current',
            list: 'divide-y divide-gray-200 border-b border-gray-200',
          }"
        />
        <Socials class="mt-4" link-class="bg-primary" />
      </template>

      <template #footer>
        <UButton
          size="sm"
          block
          @click="handleOpenQuiz"
        >
          Підбір авто
        </UButton>
      </template>
    </USlideover>
  </div>
</template>
