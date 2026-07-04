import { LenisProvider } from "./components/shared";
import MouseTrail from "./components/MouseTrail";
import BottomDock from "./components/BottomDock";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import FeelGood from "./components/FeelGood";
import VideoBreak from "./components/VideoBreak";
import StackedSection from "./components/StackedSection";
import FlightMap from "./components/FlightMap";
import BigCTA from "./components/BigCTA";
import XpFooter from "./components/XpFooter";

export default function ExperiencePage() {
  return (
    <LenisProvider>
      <MouseTrail />
      <BottomDock />
      <main>
        <Hero />
        <AboutSection />
        <FeelGood />
        <VideoBreak />
        <StackedSection />
        <FlightMap />
        <BigCTA />
        <XpFooter />
      </main>
    </LenisProvider>
  );
}
