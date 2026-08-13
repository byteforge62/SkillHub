import React from 'react'

export const WorkspaceSection = () => {
  return (
    <section
      id="workspace"
      className="border-b border-border"
    >
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-16 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
            03 / Workspace
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            More than a course catalogue.
          </h2>

          <p className="mt-5 leading-7 text-text-secondary">
            SkillHub brings the tools around learning into the same
            environment — resources, quizzes, events, and technical
            utilities.
          </p>
        </div>

        <div className="grid border-y border-border md:grid-cols-4">
          <div className="border-b border-border p-6 md:border-b-0 md:border-r">
            <span className="font-mono text-xs text-primary">01</span>

            <h3 className="mt-12 text-lg font-semibold">
              Resources
            </h3>

            <p className="mt-3 text-sm leading-6 text-text-secondary">
              Discover documentation, articles, repositories, and
              community-shared knowledge.
            </p>
          </div>

          <div className="border-b border-border p-6 md:border-b-0 md:border-r">
            <span className="font-mono text-xs text-primary">02</span>

            <h3 className="mt-12 text-lg font-semibold">
              Quizzes
            </h3>

            <p className="mt-3 text-sm leading-6 text-text-secondary">
              Test your understanding through interactive technical
              challenges.
            </p>
          </div>

          <div className="border-b border-border p-6 md:border-b-0 md:border-r">
            <span className="font-mono text-xs text-primary">03</span>

            <h3 className="mt-12 text-lg font-semibold">
              Events
            </h3>

            <p className="mt-3 text-sm leading-6 text-text-secondary">
              Keep track of live technical sessions, workshops, and
              community events.
            </p>
          </div>

          <div className="p-6">
            <span className="font-mono text-xs text-primary">04</span>

            <h3 className="mt-12 text-lg font-semibold">
              Tools
            </h3>

            <p className="mt-3 text-sm leading-6 text-text-secondary">
              Keep useful developer utilities close while you learn
              and build.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
