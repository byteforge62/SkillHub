import { motion } from "framer-motion";

const events = [
  {
    time: "18:30",
    duration: "60 min",
    title: "Building with Next.js",
    type: "Live Workshop",
    speaker: "Frontend Community",
    status: "live",
  },
  {
    time: "20:00",
    duration: "45 min",
    title: "React Performance Clinic",
    type: "Technical Session",
    speaker: "React Community",
    status: "upcoming",
  },
  {
    time: "21:15",
    duration: "60 min",
    title: "From API to Production",
    type: "Community Talk",
    speaker: "Backend Builders",
    status: "upcoming",
  },
];

export const EventsSection = () => {
  return (
    <section id="events" className="relative overflow-hidden">
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
          <div className="flex items-center justify-start gap-3 lg:justify-end">
            <span className="relative flex h-2 w-2">
              <motion.span
                className="absolute inset-0 rounded-full bg-success"
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.7, 0, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />

              <span className="relative h-2 w-2 rounded-full bg-success" />
            </span>

            <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-text-muted">
              Live community activity
            </span>
          </div>

          <h2 className="mt-5 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
            Learn with other people.
          </h2>

          <p className="ml-auto mt-4 max-w-[600px] text-base leading-7 text-text-secondary sm:text-[17px]">
            Workshops, technical sessions, and community discussions
            happening around the technologies you're learning.
          </p>
        </motion.div>

        {/* =====================================================
            EVENT SCHEDULE
        ====================================================== */}

        <div className="mt-20 lg:mt-24">

          {/* Time scale */}

          <div className="grid grid-cols-5 font-mono text-[9px] uppercase tracking-[0.14em] text-text-muted">
            <span>18:00</span>

            <span className="text-center">
              19:00
            </span>

            <span className="text-center">
              20:00
            </span>

            <span className="text-center">
              21:00
            </span>

            <span className="text-right">
              22:00
            </span>
          </div>

          {/* Timeline */}

          <div className="relative mt-5 h-px bg-border">

            {/* Current portion */}

            <motion.div
              className="absolute left-0 top-0 h-px bg-primary"
              initial={{
                width: "0%",
              }}
              whileInView={{
                width: "38%",
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.3,
                duration: 1.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            />

            {/* Time markers */}

            {[0, 25, 50, 75, 100].map((position) => (
              <span
                key={position}
                className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border bg-background"
                style={{
                  left: `${position}%`,
                }}
              />
            ))}

            {/* Current position */}

            <motion.div
              className="absolute top-1/2 z-10 -translate-y-1/2"
              initial={{
                left: "0%",
              }}
              whileInView={{
                left: "38%",
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.3,
                duration: 1.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.span
                className="absolute -inset-2 rounded-full bg-success/20"
                animate={{
                  scale: [1, 1.7, 1],
                  opacity: [0.8, 0, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />

              <span className="relative block h-3 w-3 rounded-full border-2 border-background bg-success" />
            </motion.div>
          </div>

          {/* =================================================
              EVENTS
          ================================================== */}

          <div className="mt-16 grid gap-14 md:grid-cols-3 md:gap-8">
            {events.map((event, index) => (
              <motion.article
                key={event.title}
                className="group relative"
                initial={{
                  opacity: 0,
                  y: 18,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.25,
                }}
                transition={{
                  delay: 0.45 + index * 0.1,
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Event connector */}

                <div className="mb-6 flex items-center gap-3">
                  <motion.span
                    className={[
                      "h-2.5 w-2.5 shrink-0 rounded-full border",
                      event.status === "live"
                        ? "border-success bg-success"
                        : "border-border bg-background",
                    ].join(" ")}
                    animate={
                      event.status === "live"
                        ? {
                            scale: [1, 1.3, 1],
                          }
                        : undefined
                    }
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />

                  <span className="h-px flex-1 bg-border transition-colors duration-300 group-hover:bg-primary" />
                </div>

                {/* Metadata */}

                <div className="flex items-center justify-between gap-4">
                  <span
                    className={[
                      "font-mono text-[9px] uppercase tracking-[0.14em]",
                      event.status === "live"
                        ? "text-success"
                        : "text-text-muted",
                    ].join(" ")}
                  >
                    {event.status === "live"
                      ? "● Live now"
                      : event.type}
                  </span>

                  <span className="font-mono text-[9px] text-text-muted">
                    {event.duration}
                  </span>
                </div>

                {/* Title */}

                <h3 className="mt-5 max-w-[360px] text-2xl font-semibold leading-tight tracking-[-0.035em] transition-transform duration-300 group-hover:translate-x-1">
                  {event.title}
                </h3>

                {/* Speaker */}

                <p className="mt-3 text-sm text-text-secondary">
                  {event.speaker}
                </p>

                {/* Time */}

                <div className="mt-6 flex items-center gap-4">
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-text-muted">
                    {event.time}
                  </span>

                  <span className="h-px w-6 bg-border" />

                  <span
                    className={[
                      "font-mono text-[9px] uppercase tracking-[0.12em]",
                      event.status === "live"
                        ? "text-success"
                        : "text-text-muted",
                    ].join(" ")}
                  >
                    {event.status === "live"
                      ? "Join now"
                      : "Upcoming"}
                  </span>
                </div>

                {/* Hover rule */}

                <motion.div
                  className="mt-7 h-px origin-left bg-primary"
                  initial={{
                    scaleX: 0,
                  }}
                  whileHover={{
                    scaleX: 1,
                  }}
                  transition={{
                    duration: 0.4,
                  }}
                />
              </motion.article>
            ))}
          </div>
        </div>

        {/* =====================================================
            BOTTOM
        ====================================================== */}

        <motion.div
          className="mt-20 flex flex-col gap-5 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between"
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
            delay: 0.8,
            duration: 0.5,
          }}
        >
          <span className="text-sm text-text-muted">
            More events coming soon.
          </span>

          <a
            href="#"
            className="group inline-flex items-center gap-2 text-sm font-medium text-text-primary"
          >
            View all events

            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};