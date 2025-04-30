const siteDomain = "bycar.in.ua";

export function generatePageTitle(title: string) {
  return `${title} | ${siteDomain}`;
}

export function generateCanonicalUrl(path: string) {
  return `https://${siteDomain}${path}`;
}

type BreadcrumbDataItem = { name: string; path: string };

export function generateBreadcrumbsJsonLd(crumbs: BreadcrumbDataItem[]) {
  const baseUrl = `https://${siteDomain}`;
  const mainPage = {
    "@type": "ListItem",
    "position": 1,
    "name": "Головна",
    "item": baseUrl,
  };

  const dynamicPages = crumbs.map((crumb, index) => {
    return {
      "@type": "ListItem",
      "position": index + 2,
      "name": crumb.name,
      "item": baseUrl + crumb.path,
    };
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [mainPage, ...dynamicPages],
  };
}
