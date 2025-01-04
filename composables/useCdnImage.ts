import { joinURL } from "ufo";

const _supportedSizes = ["thumbnail", "small", "medium", "large"] as const;

export type SupportedSize = (typeof _supportedSizes)[number];

export function useCdnImage() {
  const {
    public: { cdnHost },
  } = useRuntimeConfig();

  return (src: string, size: SupportedSize) =>
    joinURL(cdnHost, src.replace("images", size));
}

export default useCdnImage;
