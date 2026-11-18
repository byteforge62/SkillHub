import { motion } from "framer-motion";

export const HeroLearningIllustration = ({
  className = "",
  size = "lg",
  animate = true,
}) => {
  const sizeClasses = {
    sm: "w-[280px] h-[280px]",
    md: "w-[380px] h-[380px]",
    lg: "w-[520px] h-[520px]",
    xl: "w-[640px] h-[640px]",
  };

  return (
    <motion.div
      className={`relative ${sizeClasses[size]} ${className}`}
      initial={animate ? { opacity: 0, scale: 0.95, y: 20 } : { opacity: 1 }}
      animate={animate ? { opacity: 1, scale: 1, y: 0 } : { opacity: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      style={{ flexShrink: 0 }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 520 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        role="img"
        aria-label="Learning journey illustration"
      >
        <Defs />
        <BgShapes />
        <LearningPath animate={animate} />
        <SecondaryPath />
        <KnowledgeNodes animate={animate} />
        <CentralBook animate={animate} />
        <FloatingSymbols animate={animate} />
        <ProgressIndicators animate={animate} />
        <ConnectorLines />
      </svg>
    </motion.div>
  );
};

const Defs = () => (
  <defs>
    <linearGradient id="pathGradient" x1="0" y1="520" x2="520" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stopColor="#2D5A3D" stopOpacity="0.8" />
      <stop offset="50%" stopColor="#3A7A55" stopOpacity="0.9" />
      <stop offset="100%" stopColor="#4ADE80" stopOpacity="0.7" />
    </linearGradient>
    <linearGradient id="accentGradient" x1="0" y1="0" x2="520" y2="520" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stopColor="#C1734A" stopOpacity="0.8" />
      <stop offset="100%" stopColor="#E8D5CB" stopOpacity="0.5" />
    </linearGradient>
    <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <linearGradient id="bookCover" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
      <stop offset="0%" stopColor="#1E3A2F" />
      <stop offset="100%" stopColor="#14231F" />
    </linearGradient>
    <linearGradient id="pageGradient" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
      <stop offset="0%" stopColor="#FBF8F3" stopOpacity="0.95" />
      <stop offset="100%" stopColor="#F3F0EB" stopOpacity="0.9" />
    </linearGradient>
    <filter id="codeGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
);

const BgShapes = () => (
  <g opacity="0.06">
    <circle cx="80" cy="80" r="120" fill="#2D5A3D" />
    <circle cx="440" cy="440" r="140" fill="#C1734A" />
    <ellipse cx="260" cy="260" rx="200" ry="100" fill="#3A7A55" transform="rotate(-30 260 260)" />
  </g>
);

const LearningPath = ({ animate }) => (
  <motion.path
    d="M180,420 C180,380 200,340 240,320 C280,300 340,320 360,360 C380,400 380,450 340,470"
    stroke="url(#pathGradient)"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
    opacity="0.5"
    initial={animate ? { pathLength: 0 } : { pathLength: 1 }}
    animate={animate ? { pathLength: 1 } : { pathLength: 1 }}
    transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
  />
);

const SecondaryPath = () => (
  <path
    d="M120,320 C140,280 180,260 230,250 C280,240 330,250 370,280"
    stroke="#3A7A55"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
    opacity="0.2"
    strokeDasharray="8 6"
  />
);

const KnowledgeNodes = ({ animate }) => (
  <g className="knowledge-nodes">
    <Node animate={animate} cx={180} cy={420} r={28} fill="#1E3A2F" stroke="#2D5A3D" innerR={14} innerFill="#2D5A3D" delay={0.5} icon={<BookIcon />} />
    <Node animate={animate} cx={240} cy={320} r={24} fill="#1E3A2F" stroke="#3A7A55" innerR={11} innerFill="#3A7A55" delay={0.6} icon={<CodeIcon />} />
    <Node animate={animate} cx={360} cy={360} r={26} fill="#1E3A2F" stroke="#4ADE80" innerR={12} innerFill="#4ADE80" delay={0.7} icon={<ArrowIcon />} />
    <Node animate={animate} cx={340} cy={470} r={22} fill="#1E3A2F" stroke="#C1734A" innerR={10} innerFill="#C1734A" delay={0.8} icon={<StarIcon />} />
  </g>
);

const Node = ({ animate, cx, cy, r, fill, stroke, innerR, innerFill, delay, icon }) => (
  <g className="node" transform={`translate(${cx}, ${cy})`}>
    <motion.circle r={r} fill={fill} stroke={stroke} strokeWidth="2" filter="url(#softGlow)" initial={animate ? { scale: 0, opacity: 0 } : { scale: 1 }} animate={animate ? { scale: 1, opacity: 1 } : { scale: 1 }} transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }} />
    <motion.circle r={innerR} fill={innerFill} initial={animate ? { scale: 0 } : { scale: 1 }} animate={animate ? { scale: [1, 1.1, 1] } : { scale: 1 }} transition={{ duration: 2, delay: delay + 0.3, repeat: Infinity, ease: "easeInOut" }} />
    {icon}
  </g>
);

const BookIcon = () => (
  <svg x="-9" y="-9" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FBF8F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 17H20" />
    <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20" />
  </svg>
);

const CodeIcon = () => (
  <svg x="-8" y="-8" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FBF8F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 16l4 4 6-6" />
    <path d="M16 16l-4 4-6-6" />
  </svg>
);

const ArrowIcon = () => (
  <svg x="-8" y="-9" width="16" height="18" viewBox="0 0 24 24" fill="none" stroke="#14231F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 15l-6-6-6 6" />
    <path d="M12 3v18" />
  </svg>
);

const StarIcon = () => (
  <svg x="-7" y="-7" width="14" height="14" viewBox="0 0 24 24" fill="#14231F" stroke="#14231F" strokeWidth="1">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const CentralBook = ({ animate }) => (
  <g className="central-book" transform="translate(180, 160)">
    <motion.path
      d="M160 0 L160 180 Q160 200 140 200 L20 200 Q0 200 0 180 L0 20 Q0 0 20 0 L140 0 Q160 0 160 20"
      fill="url(#bookCover)"
      opacity="0.3"
      initial={animate ? { opacity: 0, y: 30 } : { opacity: 0.3 }}
      animate={animate ? { opacity: 0.3, y: 0 } : { opacity: 0.3 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
    />
    <motion.path
      d="M140 20 L20 20 Q0 20 0 40 L0 180 Q0 200 20 200 L140 200 Q160 200 160 180 L160 40 Q160 20 140 20"
      fill="url(#pageGradient)"
      stroke="#E5E1DA"
      strokeWidth="1"
      initial={animate ? { scaleX: 0, transformOrigin: "160px 100px" } : { scaleX: 1 }}
      animate={animate ? { scaleX: 1, transformOrigin: "160px 100px" } : { scaleX: 1 }}
      transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
    />
    <motion.path
      d="M160 20 L300 20 Q320 20 320 40 L320 180 Q320 200 300 200 L160 200 Q140 200 140 180 L140 40 Q140 20 160 20"
      fill="url(#pageGradient)"
      stroke="#E5E1DA"
      strokeWidth="1"
      initial={animate ? { scaleX: 0, transformOrigin: "160px 100px" } : { scaleX: 1 }}
      animate={animate ? { scaleX: 1, transformOrigin: "160px 100px" } : { scaleX: 1 }}
      transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
    />
    <motion.rect
      x="138"
      y="20"
      width="24"
      height="180"
      rx="2"
      fill="#14231F"
      opacity="0.6"
      initial={animate ? { scaleY: 0, transformOrigin: "center top" } : { scaleY: 1 }}
      animate={animate ? { scaleY: 1, transformOrigin: "center top" } : { scaleY: 1 }}
      transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
    />
    <PageContent animate={animate} />
    <CodeContent animate={animate} />
  </g>
);

const PageContent = ({ animate }) => (
  <g stroke="#2D5A3D" strokeWidth="1.2" opacity="0.5" fill="none">
    <motion.line x1="30" y1="60" x2="120" y2="60" initial={animate ? { opacity: 0 } : { opacity: 1 }} animate={animate ? { opacity: 1 } : { opacity: 1 }} transition={{ duration: 0.3, delay: 0.8 }} />
    <motion.line x1="30" y1="80" x2="110" y2="80" initial={animate ? { opacity: 0 } : { opacity: 1 }} animate={animate ? { opacity: 1 } : { opacity: 1 }} transition={{ duration: 0.3, delay: 0.85 }} />
    <motion.line x1="30" y1="100" x2="125" y2="100" initial={animate ? { opacity: 0 } : { opacity: 1 }} animate={animate ? { opacity: 1 } : { opacity: 1 }} transition={{ duration: 0.3, delay: 0.9 }} />
    <motion.line x1="30" y1="120" x2="95" y2="120" initial={animate ? { opacity: 0 } : { opacity: 1 }} animate={animate ? { opacity: 1 } : { opacity: 1 }} transition={{ duration: 0.3, delay: 0.95 }} />
    <motion.line x1="30" y1="140" x2="115" y2="140" initial={animate ? { opacity: 0 } : { opacity: 1 }} animate={animate ? { opacity: 1 } : { opacity: 1 }} transition={{ duration: 0.3, delay: 1.0 }} />
  </g>
);

const CodeContent = ({ animate }) => (
  <g stroke="#3A7A55" strokeWidth="1.5" fill="none" opacity="0.6" filter="url(#codeGlow)">
    <motion.path d="M180 70 L210 70 M195 60 L195 80" initial={animate ? { opacity: 0, scale: 0.5 } : { opacity: 1 }} animate={animate ? { opacity: 1, scale: 1 } : { opacity: 1 }} transition={{ duration: 0.4, delay: 0.85 }} />
    <motion.path d="M230 65 L230 95 M230 95 Q245 95 245 80" initial={animate ? { opacity: 0, scale: 0.5 } : { opacity: 1 }} animate={animate ? { opacity: 1, scale: 1 } : { opacity: 1 }} transition={{ duration: 0.4, delay: 0.9 }} />
    <motion.path d="M180 110 L250 110 M180 130 L240 130 M180 150 L220 150" initial={animate ? { opacity: 0 } : { opacity: 1 }} animate={animate ? { opacity: 1 } : { opacity: 1 }} transition={{ duration: 0.3, delay: 0.95 }} />
  </g>
);

const FloatingSymbols = ({ animate }) => (
  <g className="floating-symbols" stroke="#3A7A55" strokeWidth="1.8" fill="none" opacity="0.35">
    <motion.g transform="translate(80, 180)">
      <motion.path d="M0 0 L15 0 M0 0 L0 20 M15 0 L15 20" initial={animate ? { opacity: 0, rotate: -30 } : { opacity: 1 }} animate={animate ? { opacity: 0.4, rotate: 0 } : { opacity: 0.4 }} transition={{ duration: 1.2, delay: 1, ease: [0.22, 1, 0.36, 1] }}>
        <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="20s" repeatCount="indefinite" />
      </motion.path>
    </motion.g>
    <motion.g transform="translate(420, 160)">
      <motion.path d="M0 10 Q-5 10 -5 5 L-5 -5 Q-5 -10 0 -10 M0 10 Q5 10 5 5 L5 -5 Q5 -10 0 -10" initial={animate ? { opacity: 0, rotate: 45 } : { opacity: 1 }} animate={animate ? { opacity: 0.35, rotate: 0 } : { opacity: 0.35 }} transition={{ duration: 1.2, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}>
        <animateTransform attributeName="transform" type="rotate" from="0" to="-360" dur="25s" repeatCount="indefinite" />
      </motion.path>
    </motion.g>
    <motion.g transform="translate(60, 380)">
      <motion.path d="M0 0 L25 0 M0 5 L15 5 M0 10 L20 10" stroke="#C1734A" strokeWidth="1.5" initial={animate ? { opacity: 0, x: -10 } : { opacity: 1 }} animate={animate ? { opacity: 0.4, x: 0 } : { opacity: 0.4 }} transition={{ duration: 1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}>
        <animateTransform attributeName="transform" type="translate" values="0,0; 5,0; 0,0; -5,0; 0,0" dur="6s" repeatCount="indefinite" />
      </motion.path>
    </motion.g>
    <motion.g transform="translate(440, 380)">
      <motion.path d="M0 0 L0 30 M0 15 L-12 5 M0 15 L12 5" stroke="#4ADE80" strokeWidth="1.5" initial={animate ? { opacity: 0, y: 10 } : { opacity: 1 }} animate={animate ? { opacity: 0.35, y: 0 } : { opacity: 0.35 }} transition={{ duration: 1, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}>
        <animateTransform attributeName="transform" type="translate" values="0,0; 0,-8; 0,0; 0,8; 0,0" dur="8s" repeatCount="indefinite" />
      </motion.path>
    </motion.g>
    <motion.g transform="translate(100, 460)">
      <motion.path d="M0 15 L25 15 M15 0 L25 15 L15 30" stroke="#2D5A3D" strokeWidth="2" initial={animate ? { opacity: 0, scale: 0.8 } : { opacity: 1 }} animate={animate ? { opacity: 0.4, scale: 1 } : { opacity: 0.4 }} transition={{ duration: 1, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}>
        <animateTransform attributeName="transform" type="scale" values="1; 1.1; 1" dur="4s" repeatCount="indefinite" />
      </motion.path>
    </motion.g>
    <motion.g transform="translate(360, 460)">
      <motion.text x="0" y="0" fontFamily="monospace" fontSize="14" fill="#3A7A55" opacity="0.3" initial={animate ? { opacity: 0 } : { opacity: 1 }} animate={animate ? { opacity: 0.3 } : { opacity: 0.3 }} transition={{ duration: 0.5, delay: 1.4 }}>
        const skill = grow;
      </motion.text>
    </motion.g>
  </g>
);

const ProgressIndicators = ({ animate }) => (
  <g className="progress-indicators">
    <motion.circle cx="180" cy="420" r="4" fill="#4ADE80" opacity="0.8" initial={animate ? { scale: 0 } : { scale: 1 }} animate={animate ? { scale: [1, 1.5, 1] } : { scale: 1 }} transition={{ duration: 2, delay: 1.5, repeat: Infinity, ease: "easeInOut" }} />
    <motion.circle cx="240" cy="320" r="4" fill="#4ADE80" opacity="0.8" initial={animate ? { scale: 0 } : { scale: 1 }} animate={animate ? { scale: [1, 1.5, 1] } : { scale: 1 }} transition={{ duration: 2, delay: 1.7, repeat: Infinity, ease: "easeInOut" }} />
    <motion.circle cx="360" cy="360" r="4" fill="#C1734A" opacity="0.8" initial={animate ? { scale: 0 } : { scale: 1 }} animate={animate ? { scale: [1, 1.5, 1] } : { scale: 1 }} transition={{ duration: 2, delay: 1.9, repeat: Infinity, ease: "easeInOut" }} />
    <motion.circle cx="340" cy="470" r="4" fill="#C1734A" opacity="0.8" initial={animate ? { scale: 0 } : { scale: 1 }} animate={animate ? { scale: [1, 1.5, 1] } : { scale: 1 }} transition={{ duration: 2, delay: 2.1, repeat: Infinity, ease: "easeInOut" }} />
  </g>
);

const ConnectorLines = () => (
  <g stroke="#2D5A3D" strokeWidth="1" opacity="0.15" fill="none" strokeDasharray="4 4">
    <line x1="240" y1="320" x2="260" y2="250" />
    <line x1="360" y1="360" x2="280" y2="260" />
  </g>
);

export default HeroLearningIllustration;