import SiteHeader from '@/components/layout/SiteHeader';
import HomeScrollHeader from '@/components/layout/HomeScrollHeader';
import AnimatedVideoSection from '@/components/sections/AnimatedVideoSection';
import ProductPhilosophy from '@/components/sections/ProductPhilosophy';
import WhyShilpakale from '@/components/sections/WhyShilpakale';
import BrandPositioning from '@/components/sections/BrandPositioning';
import FeaturedCollections from '@/components/sections/FeaturedCollections';
import MasterCollections from '@/components/sections/MasterCollections';

export default function Home() {
  return (
    <>
      <HomeScrollHeader />
      <SiteHeader />
      <AnimatedVideoSection />
      <ProductPhilosophy />
      <WhyShilpakale />
      <BrandPositioning />
      <FeaturedCollections />
      <MasterCollections />
    </>
  );
}
