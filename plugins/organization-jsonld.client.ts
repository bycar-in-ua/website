export default defineNuxtPlugin(() => {
  const jsonld = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ByCar",
    "url": "https://bycar.in.ua",
    "logo": "https://bycar.in.ua/logo.png",
    "description":
      "ByCar — автомобільний портал для пошуку, оренди та купівлі автомобілів в Україні.",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Обслуговування клієнтів",
      "areaServed": "UA",
    },
    "sameAs": [
      "https://facebook.com/bycar",
      "https://instagram.com/bycar",
      "https://twitter.com/bycar",
    ],
  };

  useHead({
    script: [
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify(jsonld),
      },
    ],
  });
});
