import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  AtSign,
  BadgeCheck,
  BookOpen,
  Briefcase,
  Code2,
  Pencil,
  Settings,
} from "lucide-react";

import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";

const socials = [
  { field: "github", label: "GitHub", icon: Code2, prefix: "https://github.com/" },
  { field: "linkedin", label: "LinkedIn", icon: Briefcase, prefix: "https://linkedin.com/in/" },
  { field: "twitter", label: "Twitter", icon: AtSign, prefix: "https://twitter.com/" },
];

const profileFromUser = (user) => ({
  bio: user?.bio || "",
  github: user?.github || "",
  linkedin: user?.linkedin || "",
  twitter: user?.twitter || "",
});

const socialHref = (value, prefix) =>
  value.startsWith("http") ? value : `${prefix}${value.replace(/^@/, "")}`;

export const ProfileOverview = ({ user }) => {
  const profile = profileFromUser(user);
  const achievements = user?.achievements || [];
  const socialLinks = socials.filter((social) => profile[social.field]);
  const memberSince = user?.createdAt
    ? new Intl.DateTimeFormat(undefined, {
        month: "long",
        year: "numeric",
      }).format(new Date(user.createdAt))
    : null;

  return (
    <div>
      <PageHeader
        eyebrow="Account"
        title="Profile"
        description="How you appear across communities, events and course discussions."
        action={
          <div className="flex flex-wrap gap-2">
            <Button as={Link} to="/profile/edit" size="sm" iconLeft={Pencil}>
              Edit profile
            </Button>
            <Button
              as={Link}
              to="/profile/settings"
              variant="secondary"
              size="sm"
              iconLeft={Settings}
            >
              Settings
            </Button>
          </div>
        }
      />

      <div className="editorial-split mt-7">
        <div className="min-w-0 space-y-5">
          <section className="rounded-[24px] border border-line bg-white px-6 py-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <Avatar
                src={user?.avatar}
                name={user?.fullname}
                email={user?.email}
                size="xl"
                className="h-[72px] w-[72px] text-[22px]"
              />

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h2 className="truncate text-[20px] font-semibold tracking-[-0.02em] text-text-primary">
                    {user?.fullname || "Unnamed member"}
                  </h2>

                  {user?.isEmailVerified ? (
                    <Badge variant="success" size="sm" icon={BadgeCheck}>
                      Verified
                    </Badge>
                  ) : (
                    <Badge variant="warning" size="sm">
                      Email unverified
                    </Badge>
                  )}
                </div>

                <p className="mt-1 truncate text-[13px] text-text-muted">
                  {user?.email}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-text-secondary">
                  <span className="inline-flex items-center gap-1.5">
                    <BookOpen size={12} strokeWidth={1.9} aria-hidden="true" />
                    Learner
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    {user?.points ?? 0} points
                  </span>
                  <span>{achievements.length} achievements</span>
                  {memberSince && <span>Joined {memberSince}</span>}
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[16px] border border-line bg-white px-6 py-5">
            <h2 className="section-label">About</h2>

            {profile.bio ? (
              <p className="mt-3 whitespace-pre-wrap text-[14px] leading-[1.55] text-text-secondary">
                {profile.bio}
              </p>
            ) : (
              <p className="mt-3 text-[14px] leading-[1.55] text-text-muted">
                No bio yet. A short description helps people recognise you in
                community discussions.
              </p>
            )}

            {socialLinks.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2 border-t border-line pt-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.field}
                      href={socialHref(profile[social.field], social.prefix)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-[12px] font-medium text-text-secondary transition-colors hover:border-primary/35 hover:bg-sage hover:text-primary"
                    >
                      <Icon size={13} strokeWidth={1.9} aria-hidden="true" />
                      <span className="sr-only">{social.label}</span>
                      <span className="max-w-[160px] truncate">
                        {profile[social.field]}
                      </span>
                      <ArrowUpRight
                        size={11}
                        className="text-text-muted transition-transform group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  );
                })}
              </div>
            ) : (
              <Link
                to="/profile/edit"
                className="mt-3 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-primary hover:underline"
              >
                Add links to your work
                <ArrowUpRight size={12} aria-hidden="true" />
              </Link>
            )}
          </section>

          {achievements.length > 0 && (
            <section className="rounded-[16px] border border-line bg-white px-6 py-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="section-label">Achievements</h2>
                <span className="text-[11.5px] text-text-muted">
                  {achievements.length} earned
                </span>
              </div>

              <ul className="mt-3 divide-y divide-line">
                {achievements.slice(0, 8).map((achievement, index) => (
                  <li
                    key={achievement._id || index}
                    className="flex items-center gap-3 py-2.5"
                  >
                    <span aria-hidden="true">{achievement.icon || "🏆"}</span>
                    <span className="text-[13px] text-text-primary">
                      {achievement.name || "Achievement"}
                    </span>
                  </li>
                ))}
              </ul>

              {achievements.length > 8 && (
                <p className="mt-2 text-[11.5px] text-text-muted">
                  +{achievements.length - 8} more
                </p>
              )}
            </section>
          )}
        </div>

        <aside className="space-y-5">
          <section className="rounded-[16px] border border-line bg-white px-5 py-5">
            <h2 className="section-label">Account</h2>

            <dl className="mt-4 space-y-3">
              {[
                { label: "Points", value: user?.points ?? 0 },
                { label: "Achievements", value: achievements.length },
                { label: "Role", value: user?.role || "user" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-baseline justify-between gap-3 border-b border-line pb-2.5 last:border-0 last:pb-0"
                >
                  <dt className="text-[12.5px] capitalize text-text-secondary">
                    {stat.label}
                  </dt>
                  <dd className="text-[14px] font-semibold capitalize tabular-nums text-text-primary">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="rounded-[16px] bg-sage px-5 py-5">
            <h2 className="section-label">Your learning</h2>
            <p className="mt-2 text-[13px] leading-[1.55] text-text-secondary">
              Pick up where you left off and keep your progress moving.
            </p>
            <Button
              as={Link}
              to="/learning"
              variant="secondary"
              size="sm"
              className="mt-4"
              iconRight={ArrowUpRight}
            >
              My learning
            </Button>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default ProfileOverview;
