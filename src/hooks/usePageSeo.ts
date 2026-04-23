import { useEffect } from "react";
import { buildAbsoluteUrl, siteConfig } from "../lib/site";

interface PageSeoOptions {
  title: string;
  description: string;
  pathname: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const ensureMeta = (attr: "name" | "property", value: string) => {
  let meta = document.head.querySelector(`meta[${attr}="${value}"]`) as HTMLMetaElement | null;

  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attr, value);
    document.head.appendChild(meta);
  }

  return meta;
};

const ensureCanonical = () => {
  let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;

  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }

  return link;
};

const ensureStructuredData = () => {
  const existing = document.getElementById("page-structured-data");
  if (existing) {
    return existing as HTMLScriptElement;
  }

  const script = document.createElement("script");
  script.id = "page-structured-data";
  script.type = "application/ld+json";
  document.head.appendChild(script);
  return script;
};

const toAbsoluteImageUrl = (image?: string) => {
  if (!image) {
    return undefined;
  }

  return image.startsWith("http://") || image.startsWith("https://")
    ? image
    : buildAbsoluteUrl(image);
};

export const usePageSeo = ({
  title,
  description,
  pathname,
  image,
  type = "website",
  noIndex = false,
  structuredData
}: PageSeoOptions) => {
  useEffect(() => {
    const canonicalUrl = buildAbsoluteUrl(pathname);
    const absoluteImage = toAbsoluteImageUrl(image);
    const ogImageMeta = ensureMeta("property", "og:image");
    const twitterImageMeta = ensureMeta("name", "twitter:image");
    const structuredDataScript = document.getElementById("page-structured-data") as HTMLScriptElement | null;

    document.title = title;

    ensureMeta("name", "description").content = description;
    ensureMeta("name", "robots").content = noIndex ? "noindex, nofollow" : "index, follow";
    ensureMeta("name", "twitter:card").content = absoluteImage ? "summary_large_image" : "summary";
    ensureMeta("name", "twitter:title").content = title;
    ensureMeta("name", "twitter:description").content = description;

    ensureMeta("property", "og:type").content = type;
    ensureMeta("property", "og:site_name").content = siteConfig.name;
    ensureMeta("property", "og:title").content = title;
    ensureMeta("property", "og:description").content = description;
    ensureMeta("property", "og:url").content = canonicalUrl;

    if (absoluteImage) {
      ogImageMeta.content = absoluteImage;
      twitterImageMeta.content = absoluteImage;
    } else {
      ogImageMeta.remove();
      twitterImageMeta.remove();
    }

    ensureCanonical().href = canonicalUrl;

    if (structuredData) {
      const script = ensureStructuredData();
      script.textContent = JSON.stringify(structuredData);
    } else if (structuredDataScript) {
      structuredDataScript.remove();
    }
  }, [description, image, noIndex, pathname, structuredData, title, type]);
};
