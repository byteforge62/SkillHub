import { NavLink } from "react-router-dom";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const profileFields = ["fullname", "bio", "github", "linkedin", "twitter"];

const profileFromUser = (user) =>
  Object.fromEntries(profileFields.map((field) => [field, user?.[field] || ""]));

export const ProfileOverview = ({ user, onEditClick }) => {
  const profileValues = profileFromUser(user);

  const initials = (user.fullname || user.email || "U")
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          Your account
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Profile</h1>
        <p className="mt-3 text-sm leading-6 text-text-muted">
          Keep your learning profile and contact links up to date.
        </p>
      </header>

      <Card className="mb-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex flex-col items-center sm:items-start gap-3">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={`${user.fullname || "Your"} avatar`}
                className="h-20 w-20 rounded-full border border-border object-cover"
              />
            ) : (
              <div
                className="flex h-20 w-20 items-center justify-center rounded-full border border-border bg-surface-embedded text-2xl font-semibold text-text-secondary"
              >
                {initials}
              </div>
            )}

            <div className="text-center sm:text-left">
              <h2 className="text-xl font-semibold text-text-primary">
                {user.fullname || "Unnamed User"}
              </h2>
              <p className="mt-1 text-sm text-text-muted">{user.email}</p>
              {user.isEmailVerified ? (
                <span className="inline-flex items-center gap-1 mt-1 rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
                  Verified
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 mt-1 rounded-full bg-warning/10 px-2 py-0.5 text-xs font-medium text-warning">
                  Email not verified
                </span>
              )}
            </div>
          </div>

          <div className="flex-1" />

          <Button variant="secondary" onClick={onEditClick}>
            Edit Profile
          </Button>
          <NavLink
            to="/profile/settings"
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </NavLink>
        </div>
      </Card>

      <Card className="mb-6">
        <h2 className="text-lg font-semibold mb-4">About</h2>

        {profileValues.bio ? (
          <p className="text-text-secondary leading-6 whitespace-pre-wrap">{profileValues.bio}</p>
        ) : (
          <p className="text-text-muted">No bio added yet.</p>
        )}

        <div className="mt-4 flex flex-wrap gap-3">
          {(() => {
            const links = [];
            if (profileValues.github) {
              let href = profileValues.github;
              if (!href.startsWith("http")) href = `https://github.com/${href}`;
              links.push(
                <a
                  key="github"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                  <span>{profileValues.github}</span>
                </a>
              );
            }
            if (profileValues.linkedin) {
              let href = profileValues.linkedin;
              if (!href.startsWith("http")) href = `https://linkedin.com/in/${href}`;
              links.push(
                <a
                  key="linkedin"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 24 22.222 24h.003z"/></svg>
                  <span>{profileValues.linkedin}</span>
                </a>
              );
            }
            if (profileValues.twitter) {
              let href = profileValues.twitter;
              if (!href.startsWith("http")) href = `https://twitter.com/${href}`;
              links.push(
                <a
                  key="twitter"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10.001 10.001 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                  <span>{profileValues.twitter}</span>
                </a>
              );
            }
            return links;
          })()}
        </div>
      </Card>

      {user.points !== undefined && user.points !== null && (
        <Card className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-text-primary">Points</p>
              <p className="mt-1 text-3xl font-bold text-primary">{user.points}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {(user.achievements || []).length > 0 ? (
                <>
                  <p className="text-sm font-semibold text-text-primary self-center">Achievements</p>
                  <div className="flex flex-wrap gap-2">
                    {(user.achievements || []).slice(0, 5).map((achievement, index) => (
                      <span
                        key={achievement._id || index}
                        className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                        title={achievement.name}
                      >
                        {achievement.icon || "🏆"}
                      </span>
                    ))}
                    {(user.achievements || []).length > 5 && (
                      <span className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-text-secondary">
                        +{(user.achievements || []).length - 5}
                      </span>
                    )}
                  </div>
                </>
              ) : (
                <p className="text-sm text-text-muted self-center">No achievements yet</p>
              )}
            </div>
          </div>
        </Card>
      )}

      <div className="text-center text-sm text-text-muted">
        <NavLink
          to="/learning"
          className="text-primary hover:underline"
        >
          View enrolled courses &rarr;
        </NavLink>
      </div>
    </div>
  );
};