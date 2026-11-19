import { Link } from "react-router-dom";
import { MonitorSmartphone, Palette, RefreshCw, Sparkles, LayoutGrid } from "lucide-react";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import Skeleton from "@/components/ui/Skeleton";
import useCurrentUser from "@/features/auth/hooks/useCurrentUser";

import { useProfileSettings } from "../hooks/useProfileSettings";

const THEMES = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

const SettingRow = ({ title, description, control }) => (
  <div className="flex flex-col gap-3 border-b border-border-subtle py-5 last:border-b-0 last:pb-0 first:pt-0 sm:flex-row sm:items-center sm:justify-between">
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
    className={[
      "relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2",
      checked ? "bg-primary" : "bg-sage-soft",
      disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
    ].join(" ")}
  >
    <span
      className={[
        "ml-1 inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200",
        checked ? "translate-x-5" : "translate-x-0",
      ].join(" ")}
      aria-hidden="true"
    />
  </button>
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
    isUpdating,
    updateError,
  } = useProfileSettings(user?._id);

  if (userLoading || isLoading) {
    return (
      <div className="space-y-6" role="status">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-3 w-96" />
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

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="Settings"
        description="Choose how SkillHub looks and moves for you. Changes are saved to your account as you make them."
      />

      <div className="mt-8 space-y-5">
        <Card>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-sage text-primary">
              <Palette size={17} strokeWidth={1.9} aria-hidden="true" />
            </span>
            <h2 className="text-[16px] font-semibold tracking-[-0.02em]">Appearance</h2>
          </div>

          <div className="mt-4">
            <SettingRow
              title="Theme"
              description="Light matches the paper canvas. Dark suits long reading sessions."
              control={
                <div
                  className="inline-flex rounded-full border border-[color:var(--color-line)] bg-background p-1"
                  role="group"
                  aria-label="Theme"
                >
                  {THEMES.map((option) => {
                    const active = (settings.theme || "light") === option.value;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        aria-pressed={active}
                        disabled={isUpdating}
                        onClick={() => updateTheme(option.value)}
                        className={[
                          "h-8 rounded-full px-3.5 text-[12.5px] font-medium transition-colors",
                          active
                            ? "bg-primary text-white"
                            : "text-text-secondary hover:text-primary",
                        ].join(" ")}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
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
                  onChange={(value) => updateSetting("animationsEnabled", value)}
                />
              }
            />

            <SettingRow
              title="Compact layout"
              description="Tighter spacing in lists and cards so more fits on screen."
              control={
                <Toggle
                  label="Compact layout"
                  checked={Boolean(settings.compactMode)}
                  disabled={isUpdating}
                  onChange={(value) => updateSetting("compactMode", value)}
                />
              }
            />
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
            <div>
              <h2 className="text-[15px] font-semibold tracking-[-0.02em] text-primary">
                A note on preferences
              </h2>
              <p className="mt-1.5 text-[13.5px] leading-6 text-text-secondary">
                Theme and layout are stored on your account and applied on every
                device you sign in from. Nothing here changes your courses or
                progress.
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-sage text-primary">
              <MonitorSmartphone size={17} strokeWidth={1.9} aria-hidden="true" />
            </span>
            <h2 className="text-[16px] font-semibold tracking-[-0.02em]">Account</h2>
          </div>

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
            <Button as={Link} to="/profile/edit" variant="secondary" size="sm" iconLeft={LayoutGrid}>
              Edit profile
            </Button>
          </div>

          {updateError && (
            <p className="mt-4 text-[12.5px] text-error" role="alert">
              Some preferences could not be saved. Please try again.
            </p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ProfileSettings;
