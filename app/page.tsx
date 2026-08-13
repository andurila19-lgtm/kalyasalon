import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileStickyCta } from "@/components/layout/mobile-sticky-cta";
import { Hero } from "@/components/sections/hero/hero";
import { TrustBar } from "@/components/sections/hero/trust-bar";
import { About } from "@/components/sections/about/about";
import { CustomerExperience } from "@/components/sections/about/customer-experience";
import { Services } from "@/components/sections/services/services";
import { FeaturedServices } from "@/components/sections/services/featured-services";
import { PriceList } from "@/components/sections/price-list/price-list";
import { WhyKalya } from "@/components/sections/about/why-kalya";
import { Gallery } from "@/components/sections/gallery/gallery";
import { Reviews } from "@/components/sections/reviews/reviews";
import { SocialMedia } from "@/components/sections/location/social-media";
import { Location } from "@/components/sections/location/location";
import { FinalCta } from "@/components/sections/booking/final-cta";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Premium Sticky / Scrolled Navbar */}
      <Navbar />

      <main className="grow">
        {/* 1. Hero Section with Architectural Arch */}
        <Hero />

        {/* 2. Trust Statistics Bar immediately below Hero */}
        <TrustBar />

        {/* 3. About Section (More Than Just A Salon) */}
        <About isPreview={true} />

        {/* 4. Customer Experience (01 to 04 Editorial Standard) */}
        <CustomerExperience />

        {/* 5. Featured Services (Most Loved Treatments) */}
        <FeaturedServices />

        {/* 6. Comprehensive Services Menu with Filter Tabs */}
        <Services />

        {/* 7. Dedicated Physical-Salon Style Price List */}
        <PriceList />

        {/* 8. Why Kalya & Verified Track Record */}
        <WhyKalya />

        {/* 9. Inside Kalya Visual Gallery */}
        <Gallery />

        {/* 10. Loved by Our Customers (Google Reviews) */}
        <Reviews />

        {/* 11. Social Media Links (Instagram & TikTok) */}
        <SocialMedia />

        {/* 12. Find Us in Madiun (Location & Map) */}
        <Location />

        {/* 13. Final Conversion CTA Banner */}
        <FinalCta />
      </main>

      {/* Luxury Footer */}
      <Footer />

      {/* Mobile Sticky Booking Bar */}
      <MobileStickyCta />
    </div>
  );
}
