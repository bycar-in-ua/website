import type { Brand, Vehicle, VehiclesSearchSchema } from "@bycar-in-ua/sdk";
import type { YouTubeVideoItem } from "~/components/UI/VideoCard";

export type FiltersState = Omit<
  NonNullable<VehiclesSearchSchema["filters"]>,
  "status" | "price"
> & {
  priceFrom?: number;
  priceTo?: number;
};

export type HomepageData = {
  latestYoutubeVideos: YouTubeVideoItem[];
  latestItems: Omit<VehiclesFilterSet, "filters"> & { items: Vehicle[]; };
  totalItems: number;
  establishedBrands: Brand[];
};

export type VehiclesFilterSet = {
  title: string;
  filters: VehiclesSearchSchema["filters"];
  queryString: string;
};
