import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiPython,
  SiNextdotjs,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiThreedotjs,
  SiTailwindcss,
  SiGit,
  SiCss,
} from "react-icons/si";

import { FaAws } from "react-icons/fa";

const topics = [
  {
    name: "React",
    Icon: SiReact,
    color: "#61DAFB",
    size: "large",
    x: "10%",
    y: "18%",
    duration: 18,
    delay: 0,
  },
  {
    name: "TypeScript",
    Icon: SiTypescript,
    color: "#3178C6",
    size: "medium",
    x: "30%",
    y: "8%",
    duration: 22,
    delay: 1,
  },
  {
    name: "JavaScript",
    Icon: SiJavascript,
    color: "#F7DF1E",
    size: "small",
    x: "51%",
    y: "18%",
    duration: 20,
    delay: 2,
  },
  {
    name: "Python",
    Icon: SiPython,
    color: "#3776AB",
    size: "medium",
    x: "76%",
    y: "13%",
    duration: 24,
    delay: 0.5,
  },
  {
    name: "Node.js",
    Icon: SiNodedotjs,
    color: "#5FA04E",
    size: "medium",
    x: "18%",
    y: "55%",
    duration: 21,
    delay: 1.5,
  },
  {
    name: "Next.js",
    Icon: SiNextdotjs,
    color: "#FFFFFF",
    size: "small",
    x: "38%",
    y: "47%",
    duration: 19,
    delay: 3,
  },
  {
    name: "MongoDB",
    Icon: SiMongodb,
    color: "#47A248",
    size: "medium",
    x: "70%",
    y: "48%",
    duration: 23,
    delay: 2,
  },
  {
    name: "Docker",
    Icon: SiDocker,
    color: "#2496ED",
    size: "small",
    x: "87%",
    y: "58%",
    duration: 20,
    delay: 1,
  },
  {
    name: "PostgreSQL",
    Icon: SiPostgresql,
    color: "#4169E1",
    size: "small",
    x: "8%",
    y: "78%",
    duration: 25,
    delay: 2.5,
  },
  {
    name: "AWS",
    Icon: FaAws,
    color: "#FF9900",
    size: "medium",
    x: "31%",
    y: "80%",
    duration: 22,
    delay: 1,
  },
  {
    name: "Three.js",
    Icon: SiThreedotjs,
    color: "#FFFFFF",
    size: "small",
    x: "55%",
    y: "78%",
    duration: 21,
    delay: 3,
  },
  {
    name: "Tailwind",
    Icon: SiTailwindcss,
    color: "#06B6D4",
    size: "small",
    x: "78%",
    y: "82%",
    duration: 24,
    delay: 1.5,
  },
  {
    name: "Git",
    Icon: SiGit,
    color: "#F05032",
    size: "small",
    x: "93%",
    y: "34%",
    duration: 19,
    delay: 2,
  },
  {
    name: "CSS",
    Icon: SiCss,
    color: "#1572B6",
    size: "small",
    x: "5%",
    y: "40%",
    duration: 23,
    delay: 0,
  },
];

const bubbleSizes = {
  large: "h-24 w-24 sm:h-28 sm:w-28",
  medium: "h-20 w-20 sm:h-24 sm:w-24",
  small: "h-16 w-16 sm:h-20 sm:w-20",
};

import { motion } from "framer-motion";

export const LearningPathSection = () => {
  return (
    <section
      id="learning"
      className="relative overflow-hidden"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-28 sm:px-8 lg:px-12 lg:py-36 xl:px-16">

        {/* Intro */}

        <motion.div
          className="max-w-[680px]"
          initial={{
            opacity: 0,
            y: 14,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.35,
          }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <h2 className="text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
            Learning that follows your interests.
          </h2>

          <p className="mt-4 max-w-[600px] text-base leading-7 text-text-secondary sm:text-[17px]">
            Start with something you want to understand, then explore the
            technologies and skills that connect to it. SkillHub gives you
            room to learn at your own pace and change direction as you grow.
          </p>
        </motion.div>

        {/* Technology field */}

        <motion.div
          className="relative mt-14 h-[620px] overflow-hidden sm:h-[680px] lg:mt-20 lg:h-[740px]"
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.8,
            delay: 0.1,
          }}
        >

          {/* Technology count */}

          <div className="absolute left-0 top-0 z-30">
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-text-muted">
              {topics.length} technologies
            </span>
          </div>

          {/* Structural field */}

          <div className="pointer-events-none absolute inset-0">

            <div className="absolute left-0 right-0 top-1/2 h-px bg-border opacity-50" />

            <div className="absolute bottom-0 left-1/2 top-0 w-px bg-border opacity-30" />

            <motion.div
              className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border sm:h-[500px] sm:w-[500px]"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 80,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <div className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/60 sm:h-[330px] sm:w-[330px]" />

            <motion.div
              className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.05] blur-3xl"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Center */}

          <motion.div
            className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
            initial={{
              opacity: 0,
              scale: 0.5,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.5,
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.div
              className="relative flex h-32 w-32 items-center justify-center rounded-full border border-primary bg-surface shadow-[0_20px_60px_rgba(0,0,0,0.2)] sm:h-40 sm:w-40"
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="absolute inset-3 rounded-full border border-border" />

              <div className="absolute inset-6 rounded-full border border-primary/10" />

              <div className="relative text-center">
                <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-text-muted">
                  Learning
                </span>

                <p className="mt-1 text-lg font-semibold tracking-[-0.04em]">
                  SkillHub
                </p>

                <div className="mx-auto mt-3 h-1 w-1 rounded-full bg-primary" />
              </div>
            </motion.div>
          </motion.div>

          {/* Technology bubbles */}

          {topics.map((topic, index) => {
            const Icon = topic.Icon;

            return (
              <motion.div
                key={topic.name}
                className="absolute z-10"
                style={{
                  left: topic.x,
                  top: topic.y,
                }}
                initial={{
                  opacity: 0,
                  scale: 0,
                  x: "-50%",
                  y: "-50%",
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  x: "-50%",
                  y: "-50%",
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  delay: 0.7 + index * 0.07,
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <motion.div
                  animate={{
                    x: [0, 10, -8, 0],
                    y: [0, -8, 6, 0],
                  }}
                  transition={{
                    duration: topic.duration,
                    delay: topic.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div
                    className={[
                      bubbleSizes[topic.size],
                      "group flex flex-col items-center justify-center rounded-full",
                      "border border-border bg-background/95",
                      "shadow-[0_14px_35px_rgba(0,0,0,0.14)]",
                      "backdrop-blur-sm",
                      "transition-all duration-300",
                      "hover:-translate-y-1 hover:border-primary",
                      "hover:shadow-[0_18px_45px_rgba(0,0,0,0.2)]",
                    ].join(" ")}
                  >
                    <Icon
                      className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 sm:h-6 sm:w-6"
                      style={{
                        color: topic.color,
                      }}
                    />

                    <span className="mt-2 max-w-[70px] text-center text-[10px] font-medium text-text-secondary">
                      {topic.name}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}

          {/* Bottom note */}

          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between border-t border-border pt-5">
            <span className="text-xs text-text-secondary">
              Start anywhere and explore at your own pace.
            </span>

            <span className="hidden text-xs text-text-muted sm:block">
              More technologies can be added as you learn.
            </span>
          </div>

          {/* Small signals */}

          <motion.span
            className="absolute left-[21%] top-[34%] h-1.5 w-1.5 rounded-full bg-primary"
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.span
            className="absolute right-[22%] top-[38%] h-1.5 w-1.5 rounded-full bg-success"
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.8,
            }}
          />

          <motion.span
            className="absolute bottom-[25%] left-[50%] h-1 w-1 rounded-full bg-primary/60"
            animate={{
              y: [0, -10, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};