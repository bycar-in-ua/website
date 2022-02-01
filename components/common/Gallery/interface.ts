import { PropType } from "vue";

export enum GalleryPlacement {
  horizontal = "horizontal",
  vertical = "vertical",
}

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
  mode: {
    type: String as PropType<GalleryPlacement>,
    default: GalleryPlacement.horizontal,
  },
};

export interface IGalleryItem {
  id: number;
  variant: GalleryItemVariant;
  source: string;
  alt?: string;
}

export interface IActiveGalleryItem extends IGalleryItem {
  prevItemIndex: number | null;
  nextItemIndex: number | null;
}

export type TSetGalleryActiveItem = (
  itemIndex: number,
  direction?: "next" | "prev" | null
) => void;
