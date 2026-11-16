import { motion } from "framer-motion";

const lessons = [
  {
    title: "Learn",
    detail: "React Fundamentals",
    progress: "72%",
  },
  {
    title: "Practice",
    detail: "Knowledge Check",
    progress: "8 / 10",
  },
  {
    title: "Explore",
    detail: "Community Resources",
    progress: "12 saved",
  },
];

export const SkillHubLearningScene = () => {
  return (
    <div className="relative h-full min-h-[560px] w-full overflow-hidden">

      {/* =====================================================
          ATMOSPHERE
      ====================================================== */}

      <div className="absolute inset-0">

        <div
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage: `
              linear-gradient(
                to right,
                rgba(255,255,255,0.08) 1px,
                transparent 1px
              ),
              linear-gradient(
                to bottom,
                rgba(255,255,255,0.08) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "70px 70px",
          }}
        />

        <motion.div
          className="absolute left-1/2 top-1/2 h-[280px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.07] blur-[100px]"
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.25, 0.5, 0.25],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* =====================================================
          DESK
      ====================================================== */}

      <motion.div
        className="absolute bottom-[11%] left-1/2 w-[88%] -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className="relative h-5 rounded-sm border border-border bg-[#17181c]">
          <div className="absolute inset-x-0 bottom-0 h-px bg-primary/20" />
        </div>

        <div className="absolute left-[8%] top-4 h-20 w-2 bg-[#111216]" />
        <div className="absolute right-[8%] top-4 h-20 w-2 bg-[#111216]" />
      </motion.div>

      {/* =====================================================
          LEARNING DISPLAY
      ====================================================== */}

      <motion.div
        className="absolute left-1/2 top-[12%] w-[70%] -translate-x-1/2"
        initial={{
          opacity: 0,
          y: 30,
          scale: 0.96,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
      >

        {/* Screen frame */}
        <div className="relative aspect-[16/10] rounded-xl border border-[#303139] bg-[#0b0c0f] p-2 shadow-2xl">

          {/* Screen */}
          <div className="relative h-full overflow-hidden rounded-lg border border-border bg-[#090a0d]">

            {/* Browser header */}
            <div className="flex h-8 items-center gap-1.5 border-b border-border px-3">

              <span className="h-1.5 w-1.5 rounded-full bg-red-400/60" />
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-400/60" />
              <span className="h-1.5 w-1.5 rounded-full bg-green-400/60" />

              <div className="ml-4 flex h-4 flex-1 items-center border border-border px-2">
                <span className="font-mono text-[6px] text-text-muted">
                  skillhub / learning
                </span>
              </div>
            </div>

            {/* Course interface */}
            <div className="p-5">

              <motion.p
                className="font-mono text-[7px] uppercase tracking-[0.16em] text-primary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Current lesson
              </motion.p>

              <motion.h3
                className="mt-2 text-lg font-semibold tracking-[-0.03em] text-text-primary sm:text-xl"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.15 }}
              >
                React Fundamentals
              </motion.h3>

              <motion.p
                className="mt-2 max-w-[330px] text-[9px] leading-4 text-text-muted sm:text-[10px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.35 }}
              >
                Understand components, props, state, and the ideas
                that make modern interfaces work.
              </motion.p>

              {/* Progress */}
              <div className="mt-6">

                <div className="flex items-center justify-between">
                  <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-text-muted">
                    Progress
                  </span>

                  <span className="font-mono text-[8px] text-primary">
                    72%
                  </span>
                </div>

                <div className="mt-2 h-1 bg-border">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: "72%" }}
                    transition={{
                      delay: 1.5,
                      duration: 1.2,
                      ease: "easeOut",
                    }}
                  />
                </div>
              </div>

              {/* Lesson cards */}
              <div className="mt-6 grid grid-cols-3 gap-2">

                {["Components", "Props", "State"].map(
                  (item, index) => (
                    <motion.div
                      key={item}
                      className="border border-border bg-background/70 p-2"
                      initial={{
                        opacity: 0,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: 1.7 + index * 0.15,
                      }}
                    >
                      <span className="font-mono text-[6px] text-text-muted">
                        0{index + 1}
                      </span>

                      <p className="mt-2 text-[8px] font-medium text-text-primary">
                        {item}
                      </p>

                      <div className="mt-2 flex items-center gap-1">
                        <span className="flex h-3 w-3 items-center justify-center rounded-full bg-success text-[6px] text-background">
                          ✓
                        </span>

                        <span className="font-mono text-[6px] text-text-muted">
                          Complete
                        </span>
                      </div>
                    </motion.div>
                  )
                )}

              </div>
            </div>

            {/* Screen activity */}
            <motion.div
              className="absolute bottom-3 right-4 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-success" />

              <span className="font-mono text-[7px] uppercase tracking-[0.12em] text-text-muted">
                Learning active
              </span>
            </motion.div>
          </div>
        </div>

        {/* Display stand */}
        <div className="mx-auto h-8 w-14 border-x border-border bg-[#15161a]" />

        <div className="mx-auto h-2 w-24 rounded-full bg-[#111216]" />
      </motion.div>

      {/* =====================================================
          OPEN BOOK
      ====================================================== */}

      <motion.div
        className="absolute bottom-[15%] left-[11%] w-[180px]"
        initial={{
          opacity: 0,
          y: 25,
          rotate: -4,
        }}
        animate={{
          opacity: 1,
          y: 0,
          rotate: -4,
        }}
        transition={{
          delay: 0.8,
          duration: 0.8,
        }}
      >

        <div className="relative h-[105px]">

          {/* left page */}
          <div className="absolute left-0 top-0 h-[95px] w-1/2 origin-right -skew-y-3 border border-border bg-[#15161a] p-4">
            <div className="space-y-2">
              <div className="h-1 w-[70%] bg-text-muted/30" />
              <div className="h-1 w-[85%] bg-text-muted/20" />
              <div className="h-1 w-[55%] bg-text-muted/20" />
              <div className="mt-4 h-1 w-[75%] bg-primary/30" />
            </div>
          </div>

          {/* right page */}
          <div className="absolute right-0 top-0 h-[95px] w-1/2 origin-left skew-y-3 border border-border bg-[#191a1e] p-4">
            <div className="space-y-2">
              <div className="h-1 w-[65%] bg-text-muted/30" />
              <div className="h-1 w-[80%] bg-text-muted/20" />
              <div className="h-1 w-[50%] bg-text-muted/20" />

              <div className="mt-4 h-7 border border-primary/20 bg-primary/[0.05]" />
            </div>
          </div>

          {/* spine */}
          <div className="absolute left-1/2 top-1 h-[90px] w-px -translate-x-1/2 bg-border" />
        </div>

        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[7px] uppercase tracking-[0.14em] text-text-muted">
          Learning material
        </span>
      </motion.div>

      {/* =====================================================
          QUIZ CARD
      ====================================================== */}

      <motion.div
        className="absolute bottom-[18%] right-[8%] w-[165px]"
        initial={{
          opacity: 0,
          x: 25,
          rotate: 4,
        }}
        animate={{
          opacity: 1,
          x: 0,
          rotate: 4,
        }}
        transition={{
          delay: 1.2,
          duration: 0.8,
        }}
      >

        <div className="border border-border bg-[#111216] p-4 shadow-xl">

          <div className="flex items-center justify-between">
            <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-primary">
              Quick check
            </span>

            <span className="font-mono text-[7px] text-text-muted">
              08 / 10
            </span>
          </div>

          <p className="mt-4 text-[10px] font-medium leading-4 text-text-primary">
            Which concept controls component data?
          </p>

          <div className="mt-3 space-y-1.5">

            {["Props", "State", "Routes"].map(
              (answer, index) => (
                <motion.div
                  key={answer}
                  className={[
                    "flex items-center gap-2 border px-2 py-1.5",
                    answer === "State"
                      ? "border-primary/50 bg-primary/[0.08]"
                      : "border-border",
                  ].join(" ")}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: 2 + index * 0.12,
                  }}
                >
                  <span
                    className={[
                      "h-2 w-2 rounded-full border",
                      answer === "State"
                        ? "border-primary bg-primary"
                        : "border-border",
                    ].join(" ")}
                  />

                  <span className="font-mono text-[7px] text-text-muted">
                    {answer}
                  </span>
                </motion.div>
              )
            )}
          </div>

          <motion.div
            className="mt-3 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
          >
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-success text-[7px] font-bold text-background">
              ✓
            </span>

            <span className="font-mono text-[7px] text-success">
              Correct
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* =====================================================
          FLOATING KNOWLEDGE NOTES
      ====================================================== */}

      {lessons.map((lesson, index) => (
        <motion.div
          key={lesson.title}
          className="absolute"
          style={{
            left:
              index === 0
                ? "7%"
                : index === 1
                  ? "68%"
                  : "42%",
            top:
              index === 0
                ? "22%"
                : index === 1
                  ? "42%"
                  : "72%",
          }}
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -5, 0],
          }}
          transition={{
            opacity: {
              delay: 2.8 + index * 0.25,
              duration: 0.5,
            },
            scale: {
              delay: 2.8 + index * 0.25,
              duration: 0.5,
            },
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.5,
            },
          }}
        >
          <div className="border border-border bg-background/80 px-3 py-2 backdrop-blur-sm">

            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-primary" />

              <span className="font-mono text-[7px] uppercase tracking-[0.13em] text-text-muted">
                {lesson.title}
              </span>
            </div>

            <p className="mt-1 text-[8px] text-text-primary">
              {lesson.detail}
            </p>

            <span className="font-mono text-[7px] text-primary">
              {lesson.progress}
            </span>
          </div>
        </motion.div>
      ))}

      {/* =====================================================
          SMALL AMBIENT PARTICLES
      ====================================================== */}

      {[0, 1, 2, 3, 4, 5].map((particle) => (
        <motion.span
          key={particle}
          className="absolute h-1 w-1 rounded-full bg-primary/40"
          style={{
            left: `${20 + particle * 12}%`,
            top: `${30 + (particle % 3) * 18}%`,
          }}
          animate={{
            y: [-4, -20, -4],
            opacity: [0.15, 0.6, 0.15],
          }}
          transition={{
            duration: 3 + particle * 0.3,
            repeat: Infinity,
            delay: particle * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* =====================================================
          SCENE LABEL
      ====================================================== */}

      <motion.div
        className="absolute right-5 top-5 flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2 }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-success" />

        <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-text-muted">
          Learning in progress
        </span>
      </motion.div>
    </div>
  );
};