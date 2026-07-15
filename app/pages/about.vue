<script setup lang="ts">
import { generatePageTitle } from "~/utils/seo";
import HeroSection from "~/components/About/HeroSection.vue";
import SubHero from "~/components/About/SubHero.vue";
import ValuesSection from "~/components/About/ValuesSection.vue";
// import InfoBullets from "~/components/About/InfoBullets.vue";
import TeamSection from "~/components/About/TeamSection.vue";
import PartnersSection from "~/components/About/PartnersSection.vue";
import DualPanel from "~/components/Home/DualPanel.vue";

const route = useRoute();

const pageTitie = generatePageTitle("Про нас");
const pageDescription
  = "Хто ми? ByCar - цей сайт створений тими, хто любить автомобілі. Ми хочемо перетворити вибір авто на простий і цікавий процес. ";

useSeoMeta({
  title: pageTitie,
  description: pageDescription,
  ogTitle: pageTitie,
  ogUrl: route.fullPath,
  ogImage: {
    url: "/bycar-logo-light.png",
    alt: pageTitie,
  },
  ogDescription: pageDescription,
});

useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify(
        generateBreadcrumbsJsonLd([
          {
            name: pageTitie,
            path: route.fullPath,
          },
        ]),
      ),
    },
  ],
});
</script>

<template>
  <main data-testid="about-main">
    <HeroSection />
    <SubHero />
    <ValuesSection />

    <!-- <InfoBullets /> -->
    <section class="container py-12 sm:py-16">
    <p class="text-xl sm:text-2xl md:text-3xl font-bold text-center">
        Із <span class="text-primary">Bycar</span> ваше автомобільне життя стає легшим. Від ідеї до купівлі - ми стаємо вашими <span class="text-primary">партнерами.</span> Від купівлі і до продажу наступному власнику - ми <span class="text-primary">ваші друзі!</span>
    </p>
    </section>

    <TeamSection />
    <PartnersSection />
    <DualPanel />
  </main>
</template>
