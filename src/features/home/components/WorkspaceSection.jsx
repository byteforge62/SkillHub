import { motion } from "framer-motion";

const modules = [
  {
    title: "Practice",
    description:
      "Test what you've learned with quizzes that help you check your understanding and identify what needs more work.",
  },
  {
    title: "Community",
    description:
      "Learn from other people through discussions, shared knowledge, questions, and experiences around the technologies you're exploring.",
  },
  {
    title: "Events",
    description:
      "Take part in technical sessions, workshops, and community activities that give you opportunities to learn beyond a course.",
  },
  {
    title: "Tools",
    description:
      "Use practical utilities for the small tasks that come up while learning, experimenting, and working with code.",
  },
];

export const WorkspaceSection = () => {
  return (
    <section id="workspace" className="relative">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-28 sm:px-8 lg:px-12 lg:py-32 xl:px-16">

        {/* Introduction */}

        <motion.div
          className="max-w-[700px]"
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
            Learning doesn't stop at the lesson.
          </h2>

          <p className="mt-4 max-w-[620px] text-base leading-7 text-text-secondary sm:text-[17px]">
            Courses give you a direction, but learning also happens when you
            practise what you know, ask questions, learn from other people,
            attend something useful, or reach for a tool that helps you solve
            a problem.
          </p>
        </motion.div>

        {/* Supporting features */}

        <div className="mt-16 border-t border-border">
          {modules.map((module, index) => (
            <motion.article
              key={module.title}
              className="grid gap-5 border-b border-border py-8 sm:grid-cols-[0.7fr_1.3fr] sm:items-start sm:py-9 lg:grid-cols-[0.55fr_1.45fr] lg:py-10"
              initial={{
                opacity: 0,
                y: 10,
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
                duration: 0.45,
                delay: index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <h3 className="text-xl font-semibold tracking-[-0.03em] text-text-primary sm:text-2xl">
                {module.title}
              </h3>

              <p className="max-w-[620px] text-sm leading-7 text-text-secondary sm:text-[15px]">
                {module.description}
              </p>
            </motion.article>
          ))}
        </div>

        {/* Small closing note */}

        <p className="mt-7 text-sm text-text-muted">
          Everything around learning, without taking you away from it.
        </p>
      </div>
    </section>
  );
};