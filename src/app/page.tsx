import SiteHeader from '@/components/layout/SiteHeader';
import HomeScrollHeader from '@/components/layout/HomeScrollHeader';
import AnimatedVideoSection from '@/components/sections/AnimatedVideoSection';
import ProductPhilosophy from '@/components/sections/ProductPhilosophy';
import BrandPositioning from '@/components/sections/BrandPositioning';
import FeaturedCollections from '@/components/sections/FeaturedCollections';
import CollectivesManuscript from '@/components/sections/CollectivesManuscript';
import MasterCollections from '@/components/sections/MasterCollections';

export default function Home() {
  return (
    <>
      <HomeScrollHeader />
      <SiteHeader />
      <BrandPositioning />
      <AnimatedVideoSection />
      <ProductPhilosophy />
      <FeaturedCollections />
      <MasterCollections />
      <CollectivesManuscript />
    </>
  );
}
