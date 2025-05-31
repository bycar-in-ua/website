import { BrandPublicService } from "@bycar-in-ua/sdk";
import { ofetch } from "ofetch";
import { generatePageTitle } from "@/utils/seo";

type SeoMetaInput = Parameters<typeof useSeoMeta>[0] & {
  h1?: string;
};

const defaultPageTitle = generatePageTitle("Каталог авто");
const defaultPageH1 = "Каталог автомобілів доступних для покупки в Україні";
const defaultPageDescription =
  "Каталог нових автомобілів від офіційних дилерів в Україні. Звертайтеся за допомогою у підборі нових авто або пишіть в чат для консультації.";

export async function useCatalogSeo(
  brandId?: string | number,
): Promise<SeoMetaInput> {
  const route = useRoute();

  if (!brandId) {
    return {
      title: defaultPageTitle,
      description: defaultPageDescription,
      ogTitle: defaultPageTitle,
      ogUrl: route.fullPath,
      ogImage: {
        url: "/bycar-logo-light.png",
        alt: defaultPageTitle,
      },
      ogDescription: defaultPageDescription,
      h1: defaultPageH1,
    };
  }

  const config = useRuntimeConfig();

  const brandService = new BrandPublicService(config.public.apiHost, ofetch);

  const brand = await brandService.getBrand(Number(brandId));

  const title = brand.metaTitle || defaultPageTitle;
  const description = brand.metaDescription || defaultPageDescription;

  return {
    title,
    description,
    ogTitle: title,
    ogUrl: route.fullPath,
    ogImage: {
      url: "/bycar-logo-light.png",
      alt: title,
    },
    ogDescription: description,
    h1: brand.h1,
  };
}
