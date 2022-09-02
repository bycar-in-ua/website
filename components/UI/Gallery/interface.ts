import { PropType } from "vue";

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

export interface IActiveGalleryItem {
  currentItemIndex: number;
  prevItemIndex: number | null;
  nextItemIndex: number | null;
}

export type TSetGalleryActiveItem = (
  itemIndex: number,
  direction?: "next" | "prev" | null,
) => void;

export type TToggleGalleryFullScreen = () => void;
