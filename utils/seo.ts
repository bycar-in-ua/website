const siteDomain = "bycar.in.ua";

export function generatePageTitle(title: string) {
  return `${title} | ${siteDomain}`;
}

export function generateCanonicalUrl(path: string) {
  return `https://${siteDomain}${path}`;
}
