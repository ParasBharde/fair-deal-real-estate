export const siteConfig = {
  name: "FAIR DEAL REAL ESTATE",
  siteUrl: import.meta.env.VITE_SITE_URL || "https://www.fairdealrealestate.in",
  defaultTitle: "FAIR DEAL REAL ESTATE | PCMC Property Consultants",
  defaultDescription:
    "FAIR DEAL REAL ESTATE helps buyers, sellers, landlords, and investors across Akurdi, Nigdi, Ravet, Kiwale, and Wakad with transparent property consulting."
};

export const buildAbsoluteUrl = (pathname = "/") =>
  new URL(pathname, siteConfig.siteUrl.endsWith("/") ? siteConfig.siteUrl : `${siteConfig.siteUrl}/`).toString();
