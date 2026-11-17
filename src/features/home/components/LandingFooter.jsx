import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AnimatedReveal } from "@/components/animation/AnimatedReveal";
import { SectionBackground } from "./SectionBackground";

export const LandingFooter = () => {
  const year = new Date().getFullYear();

  return (
    <SectionBackground variant="embedded">
      <div className="container-narrow py-12 lg:py-16">
        <AnimatedReveal delay={0.1} distance={16}>
          <div className="grid gap-10 lg:grid-cols-[1.5fr_2fr] lg:gap-16">
            <FooterBrand />
            <FooterNavGrid />
          </div>
        </AnimatedReveal>

        <AnimatedReveal delay={0.3} distance={12}>
          <FooterLegalBar year={year} />
        </AnimatedReveal>
      </div>
    </SectionBackground>
  );
};

const FooterBrand = () => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
  >
    <Link to="/" className="inline-flex text-2xl font-bold tracking-[-0.04em] text-text-primary">
      SkillHub
    </Link>

    <p className="mt-5 max-w-[380px] text-sm leading-7 text-text-secondary">
      A technical learning platform for discovering resources,
      practising skills, connecting with the community, and
      building knowledge.
    </p>

    <div className="mt-7 flex items-center gap-3">
      <span className="relative flex h-2 w-2">
        <span className="absolute inset-0 animate-ping rounded-full bg-success opacity-40" />
        <span className="relative h-2 w-2 rounded-full bg-success" />
      </span>
      <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-text-muted">
        Platform active
      </span>
    </div>
  </motion.div>
);

const FooterNavGrid = () => (
  <motion.div
    className="grid grid-cols-2 gap-8 sm:grid-cols-4"
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
  >
    <FooterColumn
      title="Explore"
      links={[
        { label: "Resources", href: "#resources" },
        { label: "Learning Paths", href: "#learning" },
        { label: "Workspace", href: "#workspace" },
        { label: "Events", href: "#events" },
        { label: "Tools", href: "#tools" },
      ]}
    />
    <FooterColumn
      title="Community"
      links={[
        { label: "Discussions", href: "/community" },
        { label: "Events", href: "/events" },
        { label: "Contributions", href: "/community/contributions" },
        { label: "Guidelines", href: "/guidelines" },
      ]}
    />
    <FooterColumn
      title="Product"
      links={[
        { label: "Sign in", href: "/login", isLink: true },
        { label: "Create account", href: "/register", isLink: true },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Changelog", href: "/changelog" },
      ]}
    />
    <FooterColumn
      title="Legal"
      links={[
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
        { label: "Cookie Policy", href: "/cookies" },
        { label: "Security", href: "/security" },
      ]}
    />
  </motion.div>
);

const FooterColumn = ({ title, links }) => (
  <div>
    <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-text-muted">{title}</p>
    <nav className="mt-4 flex flex-col gap-2.5 text-sm">
      {links.map((link) => (
        link.isLink ? (
          <Link key={link.href} to={link.href} className="text-text-secondary transition-colors hover:text-text-primary">
            {link.label}
          </Link>
        ) : (
          <a key={link.href} href={link.href} className="text-text-secondary transition-colors hover:text-text-primary">
            {link.label}
          </a>
        )
      ))}
    </nav>
  </div>
);

const FooterLegalBar = ({ year }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
  >
    <div className="mt-12 flex flex-col gap-4 border-t border-border py-8 text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-4">
        <span className="font-semibold text-text-primary">SkillHub</span>
        <span className="h-px w-6 bg-border" />
        <span>&copy; {year}</span>
        <span className="hidden h-3 w-px bg-border sm:block" />
        <Link to="/privacy" className="transition-colors hover:text-text-primary">Privacy</Link>
        <Link to="/terms" className="transition-colors hover:text-text-primary">Terms</Link>
        <Link to="/cookies" className="transition-colors hover:text-text-primary">Cookies</Link>
      </div>

      <div className="flex items-center gap-4">
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-text-muted">Learn</span>
        <span className="h-px w-5 bg-border" />
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-text-muted">Practise</span>
        <span className="h-px w-5 bg-border" />
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-text-muted">Connect</span>
      </div>
    </div>
  </motion.div>
);

export default LandingFooter;
