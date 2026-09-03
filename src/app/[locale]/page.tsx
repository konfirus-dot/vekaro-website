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
      {/* id lives on this stable, untransformed wrapper rather than on
          <Services>'s own <section> — that section is a Reveal child, so
          while its reveal transition hasn't fired yet it briefly sits at
          `translateY(24px)`. Next's anchor-scroll math reads the target's
          rect at click time, so scrolling to an id still inside the Reveal
          transform landed 24px short of the settled position, leaving the
          preceding section peeking out from under the sticky header. A
          wrapper outside Reveal keeps the scroll target's rect stable no
          matter what the reveal animation is doing. Same reasoning for
          #about and #contact below. */}
      <div id="services">
        <Reveal>
          <Services />
        </Reveal>
      </div>
      <Reveal>
        <Advantages />
      </Reveal>
      <div id="about">
        <Reveal>
          <About />
        </Reveal>
      </div>
      <Reveal>
        <PromoBanner />
      </Reveal>
      <div id="contact">
        <Reveal>
          <Contact />
        </Reveal>
      </div>
    </main>
  );
}
