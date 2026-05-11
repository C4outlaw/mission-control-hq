import Magnetic from '../components/motion/Magnetic';
import Reveal from '../components/motion/Reveal';
import Sunburst from '../components/motion/Sunburst';
import Footer from '../components/layout/Footer';

export const metadata = { title: 'Page not found · Myrie HQ' };

export default function NotFound() {
  return (
    <main className="myrie-marketing">
      <section className="nf-hero">
        <div className="nf-bg" />
        <Sunburst size={680} top={-120} left="50%" right="auto" opacity={0.32} className="nf-sun" />
        <div className="shell nf-copy">
          <Reveal><span className="label-pill">404 · LOST AT SEA</span></Reveal>
          <Reveal delay={0.1}>
            <h1 className="nf-title">
              <span className="display">THIS PAGE</span>
              <span className="script">drifted</span>
              <span className="display">AWAY.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="lead">
              No worries: there&apos;s plenty of other land. Try the homepage, the portfolio, or grab
              a strategy call.
            </p>
          </Reveal>
          <Reveal delay={0.45}>
            <div className="nf-actions">
              <Magnetic><a className="ti-btn primary" href="/">Back to home</a></Magnetic>
              <Magnetic><a className="ti-btn gold" href="/projects">See portfolio</a></Magnetic>
              <Magnetic><a className="ti-btn green" href="mailto:myriework@gmail.com">Contact Myrie</a></Magnetic>
            </div>
          </Reveal>
        </div>
        <div className="wood-strip" />
      </section>

      <Footer />

      <style>{`
        .nf-hero { position: relative; min-height: 78vh; padding: 100px 0 0; overflow: hidden; display: flex; flex-direction: column; justify-content: center; }
        .nf-bg { position: absolute; inset: 0; background: linear-gradient(180deg, #7cc9e8 0%, #4a9bbf 50%, #2a7da3 100%); z-index: -1; }
        .nf-sun { transform: translateX(-50%); }
        .nf-copy { padding: 48px 0; text-align: center; max-width: 760px; }
        .nf-title { display: flex; flex-direction: column; align-items: center; gap: 6px; margin: 22px 0; }
        .nf-title .display { font-size: clamp(2.6rem, 7vw, 5.6rem); color: var(--cream); text-shadow: 0 5px 0 var(--teal-deep), 0 12px 28px rgba(0,0,0,.32); -webkit-text-stroke: 1px rgba(14,55,79,.22); line-height: .9; }
        .nf-title .script { font-size: clamp(3rem, 9vw, 7rem); color: var(--gold); transform: rotate(-3deg) translateY(-.04em); text-shadow: 0 5px 0 var(--orange-deep), 0 12px 26px rgba(0,0,0,.3); line-height: .9; }
        .nf-copy .lead { color: rgba(255,247,230,.95); margin: 0 auto; }
        .nf-actions { margin: 28px auto 0; display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
      `}</style>
    </main>
  );
}
