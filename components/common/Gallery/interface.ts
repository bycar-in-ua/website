import { PropType } from "vue";

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
    type: String as PropType<"horizontal" | "vertical">,
    default: "horizontal",
  },
};

export const ThumbnailsListProps = {};

export interface IGalleryItem {
  id: number;
  variant: "image" | "video";
  source: string;
  alt?: string;
}

export interface IActiveGalleryItem extends IGalleryItem {
  prevItemIndex: number | null;
  nextItemIndex: number | null;
}

export type TSetGalleryActiveItem = (itemIndex: number) => void;
