import { motion } from 'motion/react';
import { fadeUp, staggerContainer } from '../../lib/motion';

// Placeholder sponsor list — swap names/logos for real ones, or fetch
// from an API later. Glassmorphism tiles keep it visually light so it
// doesn't compete with the event content around it.
const sponsors = [
  { name: 'Nova Labs', logo: '🚀' },
  { name: 'Brightline', logo: '⚡' },
  { name: 'Northwind Co.', logo: '🧭' },
  { name: 'Vertex Studio', logo: '◆' },
  { name: 'Circuit & Co', logo: '🔌' },
];

const SponsorsSection = () => (
  <section className="flex flex-col gap-4">
    <div className="text-center">
      <p className="text-label-sm uppercase tracking-wider text-text-muted">Backed by</p>
      <h2 className="font-display text-headline-sm text-text-primary">Our Sponsors</h2>
    </div>

    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer(0.08)}
      className="glass-panel flex flex-wrap items-center justify-center gap-3 rounded-xl p-md sm:gap-5 sm:p-lg"
    >
      {sponsors.map((sponsor) => (
        <motion.div
          key={sponsor.name}
          variants={fadeUp}
          whileHover={{ y: -3, scale: 1.03 }}
          className="flex items-center gap-2 rounded-md border border-border bg-surface/60 px-4 py-2.5 text-body-md text-text-secondary backdrop-blur-glass transition-colors hover:border-primary/40 hover:text-text-primary"
        >
          <span className="text-lg">{sponsor.logo}</span>
          {sponsor.name}
        </motion.div>
      ))}
    </motion.div>
  </section>
);

export default SponsorsSection;