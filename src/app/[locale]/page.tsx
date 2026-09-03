import { Hero } from "@/components/sections/Hero/Hero";
import { SloganBanner } from "@/components/sections/SloganBanner/SloganBanner";
import { Services } from "@/components/sections/Services/Services";
import { Advantages } from "@/components/sections/Advantages/Advantages";
import { About } from "@/components/sections/About/About";
import { PromoBanner } from "@/components/sections/PromoBanner/PromoBanner";
import { Contact } from "@/components/sections/Contact/Contact";
import { Reveal } from "@/components/ui/Reveal/Reveal";

export default function Home() {
  return (
    <main>
      <Hero />
      <Reveal>
        <SloganBanner />
      </Reveal>
      <Reveal>
        <Services />
      </Reveal>
      <Reveal>
        <Advantages />
      </Reveal>
      <Reveal>
        <About />
      </Reveal>
      <Reveal>
        <PromoBanner />
      </Reveal>
      <Reveal>
        <Contact />
      </Reveal>
    </main>
  );
}
