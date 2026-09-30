import Hero from '../components/Hero'
import Categories from '../components/Categories'
import ProductSection from '../components/ProductSection'
import AboutSection from '../components/AboutSection'
import ClosingCTA from '../components/ClosingCTA'

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <ProductSection
        label="Best Sellers"
        title="Best Sellers"
        subtitle="The ones everyone keeps coming back for."
        filter="best"
        variant="alt"
      />
      <AboutSection />
      <ProductSection
        label="Just In"
        title="New Arrivals"
        subtitle="Fresh drops, straight from the lab."
        filter="new"
      />
      <ClosingCTA />
    </>
  )
}