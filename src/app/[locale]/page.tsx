import { Hero } from "@/components/sections/Hero/Hero";
import { SloganBanner } from "@/components/sections/SloganBanner/SloganBanner";
import { Services } from "@/components/sections/Services/Services";
import { Advantages } from "@/components/sections/Advantages/Advantages";
import { About } from "@/components/sections/About/About";
import { PromoBanner } from "@/components/sections/PromoBanner/PromoBanner";
import { Contact } from "@/components/sections/Contact/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <SloganBanner />
      <Services />
      <Advantages />
      <About />
      <PromoBanner />
      <Contact />
    </main>
  );
}
