import Contact from "../components/Contact";
import HarikosAI from "../components/HarikosAI";
import Hero from "../components/Hero";
import HStudio from "../components/HStudio";
import WhatWeBuild from "../components/WhatWeBuild";

export default function Home() {
  return (
    <main className="flex-grow">
      <Hero />
      <WhatWeBuild />
      <HarikosAI />
      <HStudio />
      <Contact />
    </main>
  );
}
