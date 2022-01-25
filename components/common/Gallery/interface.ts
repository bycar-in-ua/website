import { PropType } from "vue";

export const GalleryProps = {
  items: {
    type: Array as PropType<GalleryItem[]>,
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

export interface GalleryItem {
  id: number;
  variant: "image" | "video";
  source: string;
  alt?: string;
}
