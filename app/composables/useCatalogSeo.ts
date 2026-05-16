import { generatePageTitle } from "~/utils/seo";
import { useBrands } from "~/composables/useBrands";

type SeoMetaInput = Parameters<typeof useSeoMeta>[0] & {
  h1?: string;
};

const defaultPageTitle = generatePageTitle("Каталог авто");
const defaultPageH1 = "Каталог автомобілів доступних для покупки в Україні";
const defaultPageDescription
  = "Каталог нових автомобілів від офіційних дилерів в Україні. Звертайтеся за допомогою у підборі нових авто або пишіть в чат для консультації.";

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

  const { data: brands } = useBrands();

  const brand = computed(() => brands.value?.find((b) => b.id === Number(brandId)));

  const title = brand.value?.metaTitle || defaultPageTitle;
  const description = brand.value?.metaDescription || defaultPageDescription;

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
    h1: brand.value?.h1,
  };
}
