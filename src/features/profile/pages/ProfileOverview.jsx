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
import Card from "@/components/ui/Card";

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

  return (
    <div className="mx-auto max-w-3xl">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
            Your account
          </p>
          <h1 className="mt-3 text-[clamp(1.9rem,3.4vw,2.5rem)] font-bold leading-[1.05] tracking-[-0.04em]">
            Profile
          </h1>
          <p className="mt-3 max-w-xl text-[15px] leading-7 text-text-secondary">
            How you appear across communities, events and course discussions.
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2">
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
      </header>

      <Card className="mt-7">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <Avatar
            src={user?.avatar}
            name={user?.fullname}
            email={user?.email}
            size="xl"
            className="h-[76px] w-[76px] text-[22px]"
          />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="truncate text-[21px] font-bold tracking-[-0.03em] text-text-primary">
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

            <p className="mt-1 truncate text-[13.5px] text-text-muted">{user?.email}</p>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] text-text-secondary">
              <span className="inline-flex items-center gap-1.5">
                <BookOpen size={13} strokeWidth={1.9} aria-hidden="true" />
                Learner
              </span>

              {user?.points !== undefined && user?.points !== null && (
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                  {user.points} points
                </span>
              )}

              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary/40" aria-hidden="true" />
                {achievements.length} achievements
              </span>
            </div>
          </div>
        </div>
      </Card>

      <div className="mt-5 grid gap-5">
        <Card>
          <h2 className="text-[15px] font-semibold tracking-[-0.02em]">About</h2>

          {profile.bio ? (
            <p className="mt-3 whitespace-pre-wrap text-[14px] leading-7 text-text-secondary">
              {profile.bio}
            </p>
          ) : (
            <p className="mt-3 text-[14px] leading-7 text-text-muted">
              No bio yet. A short description helps people recognise you in
              community discussions.
            </p>
          )}

          {socialLinks.length > 0 ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.field}
                    href={socialHref(profile[social.field], social.prefix)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full border border-[color:var(--color-line)] bg-white px-3.5 py-2 text-[12.5px] font-medium text-text-secondary transition-colors hover:border-primary/35 hover:bg-sage/50 hover:text-primary"
                  >
                    <Icon size={14} strokeWidth={1.9} aria-hidden="true" />
                    <span className="sr-only">{social.label}</span>
                    <span className="max-w-[180px] truncate">{profile[social.field]}</span>
                    <ArrowUpRight
                      size={12}
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
              className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary hover:underline"
            >
              Add links to your work
              <ArrowUpRight size={13} aria-hidden="true" />
            </Link>
          )}
        </Card>

        {achievements.length > 0 && (
          <Card>
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-[15px] font-semibold tracking-[-0.02em]">Achievements</h2>
              <span className="text-[12px] text-text-muted">{achievements.length} earned</span>
            </div>

            <ul className="mt-4 flex flex-wrap gap-2">
              {achievements.slice(0, 8).map((achievement, index) => (
                <li key={achievement._id || index}>
                  <span
                    className="inline-flex items-center gap-2 rounded-full bg-sage px-3 py-1.5 text-[12.5px] font-medium text-primary"
                    title={achievement.name}
                  >
                    <span aria-hidden="true">{achievement.icon || "🏆"}</span>
                    {achievement.name || "Achievement"}
                  </span>
                </li>
              ))}

              {achievements.length > 8 && (
                <li className="inline-flex items-center rounded-full border border-[color:var(--color-line)] px-3 py-1.5 text-[12.5px] font-medium text-text-secondary">
                  +{achievements.length - 8} more
                </li>
              )}
            </ul>
          </Card>
        )}

        <Card
          variant="sage"
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h2 className="text-[15px] font-semibold tracking-[-0.02em] text-primary">
              Your enrolled courses
            </h2>
            <p className="mt-1 text-[13px] leading-6 text-text-secondary">
              Pick up where you left off and keep your progress moving.
            </p>
          </div>

          <Button as={Link} to="/learning" variant="secondary" size="sm" iconRight={ArrowUpRight}>
            My learning
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default ProfileOverview;
