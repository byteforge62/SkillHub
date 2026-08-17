import { motion } from "framer-motion";

const tools = [
  {
    number: "01",
    name: "JSON Formatter",
    description:
      "Clean, validate, and inspect structured data.",
    preview: (
      <div className="font-mono text-[11px] leading-6 text-text-secondary">
        <span className="text-primary">{"{"}</span>

        <br />

        <span className="pl-4">
          <span className="text-text-muted">"status"</span>
          <span className="text-text-muted">:</span>{" "}
          <span className="text-success">"active"</span>
        </span>

        <br />

        <span className="text-primary">{"}"}</span>
      </div>
    ),
  },

  {
    number: "02",
    name: "Regex Tester",
    description:
      "Experiment with patterns before putting them into code.",
    preview: (
      <div className="font-mono text-[11px]">
        <span className="text-primary">/</span>

        <span className="text-text-primary">
          react
        </span>

        <span className="text-primary">
          /gi
        </span>

        <div className="mt-3 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />

          <span className="text-text-muted">
            3 matches found
          </span>
        </div>
      </div>
    ),
  },

  {
    number: "03",
    name: "Timestamp Converter",
    description:
      "Move between Unix timestamps and readable dates.",
    preview: (
      <div className="font-mono">
        <p className="text-xl tracking-[-0.04em] text-text-primary">
          1723829200
        </p>

        <div className="mt-3 h-px w-16 bg-border" />

        <p className="mt-3 text-[10px] text-text-muted">
          16 AUG 2026 · 11:26
        </p>
      </div>
    ),
  },

  {
    number: "04",
    name: "Color Converter",
    description:
      "Convert between HEX, RGB, HSL, and other formats.",
    preview: (
      <div className="flex items-center gap-4">
        <span className="h-10 w-10 rounded-lg bg-primary" />

        <div className="font-mono text-[10px]">
          <p className="text-text-primary">
            #4F46E5
          </p>

          <p className="mt-1 text-text-muted">
            79 · 70 · 229
          </p>
        </div>
      </div>
    ),
  },
];

export const ToolsSection = () => {
  return (
    <section
      id="tools"
      className="relative overflow-hidden"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-28 sm:px-8 lg:px-12 lg:py-36 xl:px-16">

        {/* =====================================================
            INTRODUCTION
        ====================================================== */}

        <motion.div
          className="ml-auto max-w-[680px] text-left lg:text-right"
          initial={{
            opacity: 0,
            y: 12,
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
            Useful tools for the work around learning.
          </h2>

          <p className="ml-auto mt-4 max-w-[600px] text-base leading-7 text-text-secondary sm:text-[17px]">
            Sometimes you just need a quick way to check something,
            transform a value, or experiment with an idea. Keep those
            small utilities close while you learn and build.
          </p>
        </motion.div>

        {/* =====================================================
            TOOL GRID
        ====================================================== */}

        <div className="mt-16 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">

          {tools.map((tool, index) => (
            <motion.article
              key={tool.number}
              className="group relative min-h-[350px] bg-background p-6 transition-colors duration-300 hover:bg-surface sm:min-h-[370px] lg:min-h-[390px]"
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.55,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >

              {/* Tool number */}

              <span className="font-mono text-[9px] tracking-[0.16em] text-text-muted">
                {tool.number}
              </span>

              {/* Tool preview */}

              <motion.div
                className="mt-12 flex min-h-[125px] items-center border border-border bg-background px-5 transition-colors duration-300 group-hover:border-primary/40"
                whileHover={{
                  y: -3,
                }}
              >
                {tool.preview}
              </motion.div>

              {/* Information */}

              <div className="mt-8">
                <h3 className="text-xl font-semibold tracking-[-0.03em] text-text-primary">
                  {tool.name}
                </h3>

                <p className="mt-3 max-w-[260px] text-sm leading-6 text-text-secondary">
                  {tool.description}
                </p>
              </div>

              {/* Bottom action */}

              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">

                <span className="text-xs text-text-muted">
                  Available in SkillHub
                </span>

                <span className="flex h-7 w-7 items-center justify-center border border-border text-xs text-text-muted transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                  →
                </span>

              </div>

              {/* Hover indicator */}

              <motion.div
                className="absolute bottom-0 left-0 h-px bg-primary"
                initial={{
                  width: 0,
                }}
                whileHover={{
                  width: "100%",
                }}
                transition={{
                  duration: 0.4,
                }}
              />

            </motion.article>
          ))}

        </div>

        {/* =====================================================
            BOTTOM NOTE
        ====================================================== */}

        <motion.div
          className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 0.35,
            duration: 0.5,
          }}
        >
          <span className="text-sm text-text-muted">
            More utilities can be added as the platform grows.
          </span>

          <span className="text-sm text-text-secondary">
            Learn → experiment → keep going.
          </span>
        </motion.div>

      </div>
    </section>
  );
};