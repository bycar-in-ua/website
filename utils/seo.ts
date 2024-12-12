const siteDomain = "bycar.in.ua";

export function generatePageTitle(title: string) {
  return `${title} | ${siteDomain}`;
}

export function generatePageDescription(description: string) {
  return `${description} | ${siteDomain} - Легкий шлях до нового авто`;
}
