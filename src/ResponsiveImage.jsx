import React from "react";
import imageManifest from "./data/imageManifest.json";

export default function ResponsiveImage({ src, alt, sizes = "100vw", loading = "lazy", ...props }) {
  const image = imageManifest[src];
  return (
    <img
      src={image?.src || src}
      srcSet={image?.srcSet}
      sizes={image ? sizes : undefined}
      width={image?.width}
      height={image?.height}
      alt={alt}
      loading={loading}
      decoding="async"
      {...props}
    />
  );
}
