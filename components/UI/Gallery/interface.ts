import type { DeepReadonly, InjectionKey } from "vue";

export enum GalleryItemVariant {
  image = "image",
  video = "video",
}

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
