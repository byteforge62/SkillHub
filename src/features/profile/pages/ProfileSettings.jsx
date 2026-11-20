import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BellRing,
  Check,
  EyeOff,
  LayoutGrid,
  MonitorSmartphone,
  Palette,
  RefreshCw,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  GraduationCap,
} from "lucide-react";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import Skeleton from "@/components/ui/Skeleton";
import useCurrentUser from "@/features/auth/hooks/useCurrentUser";
import { cn } from "@/lib/cn";

import { useProfileSettings } from "../hooks/useProfileSettings";

const TABS = [
  { value: "appearance", label: "Appearance", icon: Palette },
  { value: "learning", label: "Learning", icon: GraduationCap },
  { value: "notifications", label: "Notifications", icon: BellRing },
  { value: "privacy", label: "Privacy", icon: ShieldCheck },
  { value: "account", label: "Account", icon: MonitorSmartphone },
];

const selectClass =
  "h-10 rounded-[12px] border border-line bg-white px-3 text-[13px] font-medium text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15";

const SettingRow = ({ title, description, control }) => (
  <div className="flex flex-col gap-3 border-b border-border-subtle py-5 first:pt-0 last:border-b-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
    <div className="max-w-lg">
      <p className="text-[14.5px] font-semibold tracking-[-0.01em] text-text-primary">
        {title}
      </p>
      <p className="mt-1 text-[13px] leading-6 text-text-secondary">{description}</p>
    </div>

    <div className="shrink-0">{control}</div>
  </div>
);

const Toggle = ({ checked, onChange, label, disabled }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    disabled={disabled}
    onClick={() => onChange(!checked)}
    className={cn(
      "relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2",
      checked ? "bg-primary" : "bg-sage-soft",
      disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
    )}
  >
    <span
      className={cn(
        "ml-1 inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200",
        checked ? "translate-x-5" : "translate-x-0",
      )}
      aria-hidden="true"
    />
  </button>
);

const Segmented = ({ options, value, onChange, label, disabled }) => (
  <div
    className="inline-flex flex-wrap rounded-full border border-[color:var(--color-line)] bg-background p-1"
    role="group"
    aria-label={label}
  >
    {options.map((option) => {
      const active = value === option.value;

      return (
        <button
          key={option.value}
          type="button"
          aria-pressed={active}
          disabled={disabled}
          onClick={() => onChange(option.value)}
          className={cn(
            "h-8 rounded-full px-3.5 text-[12.5px] font-medium transition-colors",
            active ? "bg-primary text-white" : "text-text-secondary hover:text-primary",
            disabled && "cursor-not-allowed opacity-60",
          )}
        >
          {option.label}
        </button>
      );
    })}
  </div>
);

const GroupHeading = ({ icon: Icon, title, description }) => (
  <div className="flex items-start gap-2.5">
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-sage text-primary">
      <Icon size={17} strokeWidth={1.9} aria-hidden="true" />
    </span>
    <div>
      <h2 className="text-[16px] font-semibold tracking-[-0.02em]">{title}</h2>
      {description && (
        <p className="mt-0.5 text-[12px] leading-5 text-text-muted">{description}</p>
      )}
    </div>
  </div>
);

export const ProfileSettings = () => {
  const { data: user, isLoading: userLoading } = useCurrentUser();
  const {
    settings,
    isLoading,
    isError,
    refetch,
    updateSetting,
    updateTheme,
    resetSettings,
    isUpdating,
    updateError,
    savedAt,
  } = useProfileSettings();

  const [tab, setTab] = useState("appearance");
  const [confirmReset, setConfirmReset] = useState(false);

  if (userLoading || isLoading) {
    return (
      <div className="space-y-6" role="status">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-3 w-96" />
        <Skeleton className="h-12 w-full rounded-full" />
        <Skeleton className="h-72 w-full rounded-3xl" />
        <span className="sr-only">Loading settings...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <EmptyState
        tone="error"
        icon={RefreshCw}
        title="Settings couldn't be loaded"
        description="We could not reach your preferences. This is usually temporary."
        action={
          <Button variant="secondary" onClick={() => refetch()}>
            Try again
          </Button>
        }
      />
    );
  }

  const bump = (key) => (value) => updateSetting(key, value);
  const weekGoalHours = Math.round(((settings.weeklyGoalMinutes || 0) / 60) * 10) / 10;

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="Settings"
        description="These preferences belong to your account and apply everywhere you sign in — appearance, learning defaults, notifications and privacy."
        action={
          <span
            className={cn(
              "inline-flex items-center gap-1.5 text-[11.5px]",
              isUpdating ? "text-text-muted" : "text-success",
            )}
            role="status"
          >
            <Check size={12} aria-hidden="true" />
            {isUpdating ? "Saving…" : savedAt ? "Saved to your account" : "Saves automatically"}
          </span>
        }
      />

      <div className="mt-6 flex flex-wrap gap-1 rounded-full border border-line bg-white p-1">
        {TABS.map((item) => {
          const Icon = item.icon;
          const active = tab === item.value;

          return (
            <button
              key={item.value}
              type="button"
              aria-pressed={active}
              onClick={() => setTab(item.value)}
              className={cn(
                "inline-flex h-9 items-center gap-1.5 rounded-full px-3.5 text-[12.5px] font-medium transition-colors",
                active
                  ? "bg-primary text-white"
                  : "text-text-secondary hover:bg-sage hover:text-primary",
              )}
            >
              <Icon size={13} strokeWidth={1.9} aria-hidden="true" />
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="mt-5 space-y-5">
        {tab === "appearance" && (
          <Card>
            <GroupHeading
              icon={Palette}
              title="Appearance"
              description="How much of the interface you want to see, and how it moves."
            />

            <div className="mt-4">
              <SettingRow
                title="Theme"
                description="Light matches the paper canvas. Dark suits long reading sessions."
                control={
                  <Segmented
                    label="Theme"
                    value={settings.theme || "light"}
                    disabled={isUpdating}
                    onChange={updateTheme}
                    options={[
                      { value: "light", label: "Light" },
                      { value: "dark", label: "Dark" },
                      { value: "system", label: "System" },
                    ]}
                  />
                }
              />

              <SettingRow
                title="Type scale"
                description="Base reading size across headings, body copy and controls."
                control={
                  <Segmented
                    label="Type scale"
                    value={settings.fontScale || "md"}
                    disabled={isUpdating}
                    onChange={bump("fontScale")}
                    options={[
                      { value: "sm", label: "Small" },
                      { value: "md", label: "Default" },
                      { value: "lg", label: "Large" },
                    ]}
                  />
                }
              />

              <SettingRow
                title="Compact layout"
                description="Tighter vertical rhythm in lists and page headers so more fits on screen."
                control={
                  <Toggle
                    label="Compact layout"
                    checked={Boolean(settings.compactMode)}
                    disabled={isUpdating}
                    onChange={bump("compactMode")}
                  />
                }
              />

              <SettingRow
                title="Icon-only sidebar"
                description="Collapse the navigation to icons on desktop. The active item is still highlighted."
                control={
                  <Toggle
                    label="Icon-only sidebar"
                    checked={Boolean(settings.sidebarCompact)}
                    disabled={isUpdating}
                    onChange={bump("sidebarCompact")}
                  />
                }
              />

              <SettingRow
                title="Interface animations"
                description="Entrance and hover motion across the app. Turning this off keeps every page still."
                control={
                  <Toggle
                    label="Interface animations"
                    checked={settings.animationsEnabled !== false}
                    disabled={isUpdating}
                    onChange={bump("animationsEnabled")}
                  />
                }
              />
            </div>
          </Card>
        )}

        {tab === "learning" && (
          <Card>
            <GroupHeading
              icon={GraduationCap}
              title="Learning defaults"
              description="Where you land after signing in and how your week is measured."
            />

            <div className="mt-4">
              <SettingRow
                title="Landing page"
                description="The first screen you see after signing in."
                control={
                  <select
                    className={selectClass}
                    value={settings.defaultHome || "dashboard"}
                    disabled={isUpdating}
                    aria-label="Landing page"
                    onChange={(event) => updateSetting("defaultHome", event.target.value)}
                  >
                    <option value="dashboard">Dashboard</option>
                    <option value="learning">My learning</option>
                    <option value="courses">Course catalog</option>
                    <option value="studio">Creator studio</option>
                  </select>
                }
              />

              <SettingRow
                title="Weekly study goal"
                description={`Currently ${weekGoalHours} hours per week. Shown in your workspace.`}
                control={
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={30}
                      max={2400}
                      step={30}
                      value={settings.weeklyGoalMinutes ?? 180}
                      disabled={isUpdating}
                      aria-label="Weekly goal in minutes"
                      onChange={(event) =>
                        updateSetting("weeklyGoalMinutes", Number(event.target.value))
                      }
                      className={cn(selectClass, "w-24 tabular-nums")}
                    />
                    <span className="text-[12px] text-text-muted">min</span>
                  </div>
                }
              />

              <SettingRow
                title="Continue to the next lesson"
                description="Show the next lesson as soon as you mark the current one complete."
                control={
                  <Toggle
                    label="Continue to the next lesson"
                    checked={settings.autoplayNextLesson !== false}
                    disabled={isUpdating}
                    onChange={bump("autoplayNextLesson")}
                  />
                }
              />

              <SettingRow
                title="Autosave lesson notes"
                description="Save notes while you type instead of pressing save. Manual saving always works."
                control={
                  <Toggle
                    label="Autosave lesson notes"
                    checked={settings.notesAutosave !== false}
                    disabled={isUpdating}
                    onChange={bump("notesAutosave")}
                  />
                }
              />

              <SettingRow
                title="Show notes actions"
                description="Keep the Notes entry point visible on lesson and course cards."
                control={
                  <Toggle
                    label="Show notes actions"
                    checked={settings.showLessonNotes !== false}
                    disabled={isUpdating}
                    onChange={bump("showLessonNotes")}
                  />
                }
              />

              <SettingRow
                title="Preferred language"
                description="Used for catalog and interface language hints."
                control={
                  <select
                    className={selectClass}
                    value={settings.language || "English"}
                    disabled={isUpdating}
                    aria-label="Preferred language"
                    onChange={(event) => updateSetting("language", event.target.value)}
                  >
                    {["English", "Hindi", "Spanish", "French", "German", "Portuguese", "Japanese"].map(
                      (language) => (
                        <option key={language} value={language}>
                          {language}
                        </option>
                      ),
                    )}
                  </select>
                }
              />

              <SettingRow
                title="Time zone"
                description="Used for event schedules and reminder times."
                control={
                  <input
                    className={cn(selectClass, "w-32")}
                    value={settings.timezone || "GMT"}
                    disabled={isUpdating}
                    aria-label="Time zone"
                    maxLength={60}
                    onChange={(event) => updateSetting("timezone", event.target.value)}
                  />
                }
              />

              <SettingRow
                title="Week starts on Monday"
                description="Affects weekly progress grouping and calendar weeks."
                control={
                  <Toggle
                    label="Week starts on Monday"
                    checked={settings.startWeekOnMonday !== false}
                    disabled={isUpdating}
                    onChange={bump("startWeekOnMonday")}
                  />
                }
              />
            </div>
          </Card>
        )}

        {tab === "notifications" && (
          <Card>
            <GroupHeading
              icon={BellRing}
              title="Notifications"
              description="Choose what reaches you outside the workspace."
            />

            <div className="mt-4">
              <SettingRow
                title="Email notifications"
                description="Account and learning updates sent to your email address."
                control={
                  <Toggle
                    label="Email notifications"
                    checked={settings.emailNotifications !== false}
                    disabled={isUpdating}
                    onChange={bump("emailNotifications")}
                  />
                }
              />

              <SettingRow
                title="Push notifications"
                description="Browser alerts for live sessions and replies."
                control={
                  <Toggle
                    label="Push notifications"
                    checked={settings.pushNotifications !== false}
                    disabled={isUpdating}
                    onChange={bump("pushNotifications")}
                  />
                }
              />

              <SettingRow
                title="Course updates"
                description="New lessons and material changes in tracks you joined."
                control={
                  <Toggle
                    label="Course updates"
                    checked={settings.courseUpdates !== false}
                    disabled={isUpdating}
                    onChange={bump("courseUpdates")}
                  />
                }
              />

              <SettingRow
                title="Achievements"
                description="Certificates, streaks and milestones."
                control={
                  <Toggle
                    label="Achievement alerts"
                    checked={settings.achievementAlerts !== false}
                    disabled={isUpdating}
                    onChange={bump("achievementAlerts")}
                  />
                }
              />

              <SettingRow
                title="Community replies"
                description="When someone answers your post or mentions you."
                control={
                  <Toggle
                    label="Community replies"
                    checked={settings.communityReplies !== false}
                    disabled={isUpdating}
                    onChange={bump("communityReplies")}
                  />
                }
              />

              <SettingRow
                title="Weekly digest"
                description="One summary of your progress and what is coming up."
                control={
                  <Toggle
                    label="Weekly digest"
                    checked={settings.weeklyDigest !== false}
                    disabled={isUpdating}
                    onChange={bump("weeklyDigest")}
                  />
                }
              />

              <SettingRow
                title="Daily study reminder"
                description="A nudge at the time you choose, only on days you have not studied."
                control={
                  <div className="flex items-center gap-2">
                    <input
                      type="time"
                      className={selectClass}
                      value={settings.reminderTime || "18:00"}
                      disabled={isUpdating || !settings.dailyReminder}
                      aria-label="Reminder time"
                      onChange={(event) => updateSetting("reminderTime", event.target.value)}
                    />
                    <Toggle
                      label="Daily study reminder"
                      checked={Boolean(settings.dailyReminder)}
                      disabled={isUpdating}
                      onChange={bump("dailyReminder")}
                    />
                  </div>
                }
              />

              <SettingRow
                title="Product emails"
                description="Occasional notes about new tracks and tools."
                control={
                  <Toggle
                    label="Product emails"
                    checked={Boolean(settings.marketingEmails)}
                    disabled={isUpdating}
                    onChange={bump("marketingEmails")}
                  />
                }
              />
            </div>
          </Card>
        )}

        {tab === "privacy" && (
          <Card>
            <GroupHeading
              icon={EyeOff}
              title="Privacy"
              description="Who can see your profile and what it shows."
            />

            <div className="mt-4">
              <SettingRow
                title="Public profile"
                description="Let people who are not signed in view your profile page."
                control={
                  <Toggle
                    label="Public profile"
                    checked={Boolean(settings.profilePublic)}
                    disabled={isUpdating}
                    onChange={bump("profilePublic")}
                  />
                }
              />

              <SettingRow
                title="Show activity"
                description="Recent lessons, posts and events on your profile."
                control={
                  <Toggle
                    label="Show activity"
                    checked={settings.showActivity !== false}
                    disabled={isUpdating}
                    onChange={bump("showActivity")}
                  />
                }
              />

              <SettingRow
                title="Show progress"
                description="Completed lessons and course progress on your profile."
                control={
                  <Toggle
                    label="Show progress"
                    checked={settings.showProgress !== false}
                    disabled={isUpdating}
                    onChange={bump("showProgress")}
                  />
                }
              />

              <SettingRow
                title="Appear on the leaderboard"
                description="Include your points in community rankings."
                control={
                  <Toggle
                    label="Appear on the leaderboard"
                    checked={settings.showInLeaderboard !== false}
                    disabled={isUpdating}
                    onChange={bump("showInLeaderboard")}
                  />
                }
              />

              <SettingRow
                title="Allow community messages"
                description="Let other learners start a direct message with you."
                control={
                  <Toggle
                    label="Allow community messages"
                    checked={settings.allowCommunityMessages !== false}
                    disabled={isUpdating}
                    onChange={bump("allowCommunityMessages")}
                  />
                }
              />
            </div>
          </Card>
        )}

        {tab === "account" && (
          <>
            <Card>
              <GroupHeading
                icon={MonitorSmartphone}
                title="Account"
                description="Identity details tied to this SkillHub account."
              />

              <dl className="mt-4 space-y-3 text-[13.5px]">
                <div className="flex items-center justify-between gap-4 border-b border-border-subtle pb-3">
                  <dt className="text-text-secondary">Email</dt>
                  <dd className="truncate font-medium text-text-primary">{user?.email}</dd>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-border-subtle pb-3">
                  <dt className="text-text-secondary">Display name</dt>
                  <dd className="truncate font-medium text-text-primary">
                    {user?.fullname || "Not set"}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-text-secondary">Email status</dt>
                  <dd className="font-medium text-text-primary">
                    {user?.isEmailVerified ? "Verified" : "Not verified"}
                  </dd>
                </div>
              </dl>

              <div className="mt-5 flex flex-wrap gap-2.5">
                <Button
                  as={Link}
                  to="/profile/edit"
                  variant="secondary"
                  size="sm"
                  iconLeft={LayoutGrid}
                >
                  Edit profile
                </Button>
                <Button as={Link} to="/studio" variant="ghost" size="sm">
                  Open creator studio
                </Button>
              </div>
            </Card>

            <Card variant="sage">
              <div className="flex items-start gap-3">
                <Sparkles
                  size={18}
                  className="mt-0.5 shrink-0 text-primary"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <h2 className="text-[15px] font-semibold tracking-[-0.02em] text-primary">
                    Reset preferences
                  </h2>
                  <p className="mt-1.5 text-[13.5px] leading-6 text-text-secondary">
                    Restores every appearance, learning, notification and privacy default. Your
                    courses, notes and progress are untouched.
                  </p>

                  {confirmReset ? (
                    <div className="mt-4 flex items-center gap-2">
                      <Button
                        size="sm"
                        loading={isUpdating}
                        onClick={() => {
                          resetSettings();
                          setConfirmReset(false);
                        }}
                      >
                        Reset everything
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setConfirmReset(false)}
                      >
                        Keep my settings
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-4"
                      iconLeft={RotateCcw}
                      onClick={() => setConfirmReset(true)}
                    >
                      Reset to defaults
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </>
        )}

        {updateError && (
          <p className="text-[12.5px] text-error" role="alert">
            Some preferences could not be saved. Please try again.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfileSettings;
