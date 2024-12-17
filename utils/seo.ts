const siteDomain = "bycar.in.ua";

export const defaultDescription = `${siteDomain} - Легкий шлях до нового авто`;

export function generatePageTitle(title: string) {
  return `${title} | ${siteDomain}`;
}

export function generatePageDescription(description: string) {
  return `${description} | ${defaultDescription}`;
}
