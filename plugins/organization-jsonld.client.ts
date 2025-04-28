export default defineNuxtPlugin(() => {
  const jsonld = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ByCar",
    "url": "https://bycar.in.ua",
    "logo": "https://bycar.in.ua/logo.png",
    "description":
      "Каталог нових автомобілів від офіційних дилерів в Україні. Звертайтеся за допомогою у підборі нових авто або пишіть в чат для консультації.",
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
