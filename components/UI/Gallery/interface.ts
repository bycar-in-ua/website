import type { DeepReadonly, InjectionKey, PropType } from "vue";

export enum GalleryItemVariant {
  image = "image",
  video = "video",
}

export const GalleryProps = {
  items: {
    type: Array as PropType<IGalleryItem[]>,
    default: () => [],
  },
  height: {
    type: String as PropType<string>,
    default: "auto",
  },
};

export interface IGalleryItem {
  id: number;
  variant: GalleryItemVariant;
  source: string;
  alt?: string;
}

export const GalleryItemsKey: InjectionKey<IGalleryItem[]> =
  Symbol("galleryItems");

export interface IActiveGalleryItem {
  currentItemIndex: number;
  prevItemIndex: number | null;
  nextItemIndex: number | null;
}

export const ActiveItemKey: InjectionKey<
  DeepReadonly<Ref<IActiveGalleryItem>>
> = Symbol("activeGalleryItem");

export type TSetGalleryActiveItem = (
  itemIndex: number,
  direction?: "next" | "prev" | null,
) => void;

export const SetGalleryActiveItemKey: InjectionKey<TSetGalleryActiveItem> =
  Symbol("setGalleryActiveItem");

export type TToggleGalleryFullScreen = () => void;

export const ToggleGalleryFullScreenKey: InjectionKey<TToggleGalleryFullScreen> =
  Symbol("toggleGalleryFullScreen");
