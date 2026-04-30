import { Suspense, lazy } from "react";
import ClosingBanner from "../components/ClosingBanner";
import ProcessSection from "../components/ProcessSection";
import PropertyConciergeForm from "../components/PropertyConciergeForm";
import ServiceGrid from "../components/ServiceGrid";
import TestimonialSection from "../components/TestimonialSection";
import TrustStory from "../components/TrustStory";
import { usePageSeo } from "../hooks/usePageSeo";
import { buildAbsoluteUrl, siteConfig } from "../lib/site";
import {
  highlights,
  neighborhoods,
  processSteps,
  properties,
  promisePoints,
  services,
  supportServices,
  testimonials
} from "../data/content";

import PropertyExplorer from "../components/PropertyExplorer";

const MapHero = lazy(() => import("../components/MapHero"));

export default function HomePage() {
  usePageSeo({
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    pathname: "/",
    image: properties[0]?.image,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      name: siteConfig.name,
      url: buildAbsoluteUrl("/"),
      areaServed: neighborhoods.map((item) => item.name),
      description: siteConfig.defaultDescription
    }
  });

  return (
    <main className="bg-background text-body">
      <div>
        <Suspense
          fallback={
            <div className="grid h-screen min-h-[760px] place-items-center bg-surface text-muted-text">
              Loading interactive PCMC map...
            </div>
          }
        >
          <MapHero />
        </Suspense>
      </div>

      <PropertyExplorer />

      <TrustStory highlights={highlights} promisePoints={promisePoints} />
      <ServiceGrid services={services} />
      <ProcessSection processSteps={processSteps} supportServices={supportServices} />
      <TestimonialSection testimonials={testimonials} />
      <PropertyConciergeForm />
      <ClosingBanner />
    </main>
  );
}
