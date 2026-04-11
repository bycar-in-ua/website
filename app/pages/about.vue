<script setup lang="ts">
import { generatePageTitle } from "~/utils/seo";
import HeroSection from "~/components/About/HeroSection.vue";
import SubHero from "~/components/About/SubHero.vue";
import ValuesSection from "~/components/About/ValuesSection.vue";
import InfoBullets from "~/components/About/InfoBullets.vue";
import TeamSection from "~/components/About/TeamSection.vue";

const route = useRoute();

const pageTitie = generatePageTitle("Про нас");
const pageDescription
  = "Хто ми? ByCar — це команда професіоналів: дипломовані автомобільні інженери, журналісти та люди з багаторічним досвідом в автобізнесі. Ми закохані в автомобілі та прагнемо бути корисними нашій країні й людям";

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
  <main>
    <HeroSection />
    <SubHero />
    <ValuesSection />
    <InfoBullets />
    <TeamSection />
  </main>
</template>
