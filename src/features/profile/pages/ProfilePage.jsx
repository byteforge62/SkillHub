import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import useCurrentUser from "@/features/auth/hooks/useCurrentUser";
import {
  getProfileSettings,
  updateProfile,
  updateProfileSettings,
  uploadProfileAvatar,
} from "../api/profileApi";

const profileFields = ["fullname", "bio", "github", "linkedin", "twitter"];

const profileFromUser = (user) =>
  Object.fromEntries(profileFields.map((field) => [field, user?.[field] || ""]));

export const ProfilePage = () => {
  const { data: user, isLoading, isError, refetch } = useCurrentUser();
  const [profile, setProfile] = useState(null);
  const [avatarError, setAvatarError] = useState("");
  const fileInputRef = useRef(null);
  const queryClient = useQueryClient();
  const settingsQuery = useQuery({
    queryKey: ["user-settings", user?._id],
    queryFn: () => getProfileSettings(user._id),
    enabled: Boolean(user?._id),
  });

  const updateMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["current-user"], updatedUser);
      setProfile(null);
    },
  });
  const avatarMutation = useMutation({
    mutationFn: uploadProfileAvatar,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["current-user"], updatedUser);
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
  });
  const settingsMutation = useMutation({
    mutationFn: updateProfileSettings,
    onSuccess: (response) => {
      queryClient.setQueryData(["user-settings", user._id], response);
    },
  });

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl" role="status">
        <div className="h-64 animate-pulse rounded-2xl bg-surface-hover" />
        <span className="sr-only">Loading profile...</span>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <Card className="mx-auto max-w-3xl">
        <p className="text-sm text-error" role="alert">
          Your profile could not be loaded.
        </p>
        <Button
          className="mt-4"
          variant="secondary"
          size="sm"
          onClick={() => refetch()}
        >
          Retry
        </Button>
      </Card>
    );
  }

  const initials = (user.fullname || user.email || "U")
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const profileValues = profile ?? profileFromUser(user);

  return (
    <div className="mx-auto max-w-3xl">
      <header>
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          Your account
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Profile</h1>
        <p className="mt-3 text-sm leading-6 text-text-muted">
          Keep your learning profile and contact links up to date.
        </p>
      </header>

      <Card className="mt-7">
        <div className="flex flex-col gap-5 border-b border-border pb-6 sm:flex-row sm:items-center">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={`${user.fullname || "Your"} avatar`}
              className="h-20 w-20 rounded-full border border-border object-cover"
            />
          ) : (
            <div
              aria-hidden="true"
              className="flex h-20 w-20 items-center justify-center rounded-full bg-surface-hover text-xl font-semibold text-text-secondary"
            >
              {initials}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-semibold">Profile photo</h2>
            <p className="mt-1 text-sm text-text-muted">
              JPEG, PNG, or WebP; maximum file size 5 MB.
            </p>
          </div>
          <div>
            <label className="sr-only" htmlFor="profile-avatar">
              Choose profile photo
            </label>
            <input
              ref={fileInputRef}
              id="profile-avatar"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              disabled={avatarMutation.isPending}
              className="block max-w-full text-sm text-text-muted file:mr-3 file:rounded-lg file:border-0 file:bg-surface-hover file:px-3 file:py-2 file:text-sm file:font-medium file:text-text-primary"
              onChange={(event) => {
                const file = event.target.files?.[0];
                setAvatarError("");
                if (!file) return;
                if (file.size > 5 * 1024 * 1024) {
                  setAvatarError("Choose an image that is 5 MB or smaller.");
                  event.target.value = "";
                  return;
                }
                avatarMutation.mutate(file);
              }}
            />
          </div>
        </div>

        {(avatarError || avatarMutation.isError) && (
          <p className="mt-4 text-sm text-error" role="alert">
            {avatarError ||
              avatarMutation.error?.response?.data?.message ||
              "Your profile photo could not be uploaded."}
          </p>
        )}
        {avatarMutation.isSuccess && (
          <p className="mt-4 text-sm text-success" role="status">
            Profile photo updated.
          </p>
        )}

        <form
          className="mt-6 space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            updateMutation.mutate({ userId: user._id, profile: profileValues });
          }}
        >
          <label className="block text-sm font-medium">
            Full name
            <input
              className="mt-1 block w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              value={profileValues.fullname}
              onChange={(event) =>
                setProfile((current) => ({
                  ...(current ?? profileFromUser(user)),
                  fullname: event.target.value,
                }))
              }
              minLength={2}
              maxLength={100}
              required
            />
          </label>

          <label className="block text-sm font-medium">
            Email
            <input
              className="mt-1 block w-full rounded-lg border border-border bg-surface-hover px-3 py-2.5 text-sm text-text-muted"
              type="email"
              value={user.email}
              readOnly
              aria-describedby="profile-email-note"
            />
            <span id="profile-email-note" className="mt-1 block text-xs text-text-muted">
              Email changes are managed through account support.
            </span>
          </label>

          <label className="block text-sm font-medium">
            About you
            <textarea
              className="mt-1 block min-h-28 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              value={profileValues.bio}
              onChange={(event) =>
                setProfile((current) => ({
                  ...(current ?? profileFromUser(user)),
                  bio: event.target.value,
                }))
              }
              maxLength={2000}
            />
          </label>

          {["github", "linkedin", "twitter"].map((field) => (
            <label key={field} className="block text-sm font-medium">
              {field[0].toUpperCase() + field.slice(1)}
              <input
                className="mt-1 block w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={profileValues[field]}
                onChange={(event) =>
                  setProfile((current) => ({
                    ...(current ?? profileFromUser(user)),
                    [field]: event.target.value,
                  }))
                }
                maxLength={500}
              />
            </label>
          ))}

          {updateMutation.isError && (
            <p className="text-sm text-error" role="alert">
              {updateMutation.error?.response?.data?.message ||
                "Your profile could not be saved."}
            </p>
          )}
          {updateMutation.isSuccess && (
            <p className="text-sm text-success" role="status">
              Profile changes saved.
            </p>
          )}
          <Button type="submit" loading={updateMutation.isPending}>
            Save profile
          </Button>
        </form>

        <section className="mt-8 border-t border-border pt-6">
          <h2 className="text-lg font-semibold">Profile visibility</h2>
          <p className="mt-1 text-sm text-text-muted">
            Choose whether other signed-in members can view your public profile.
          </p>
          {settingsQuery.isError ? (
            <div className="mt-3">
              <p className="text-sm text-error" role="alert">
                Profile visibility could not be loaded.
              </p>
              <Button
                className="mt-3"
                variant="secondary"
                size="sm"
                onClick={() => settingsQuery.refetch()}
              >
                Retry
              </Button>
            </div>
          ) : (
            <label className="mt-4 flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 accent-primary"
                checked={Boolean(settingsQuery.data?.data?.profilePublic)}
                disabled={settingsQuery.isLoading || settingsMutation.isPending}
                onChange={(event) =>
                  settingsMutation.mutate({
                    userId: user._id,
                    settings: { profilePublic: event.target.checked },
                  })
                }
              />
              <span>Make my profile visible to other members</span>
            </label>
          )}
          {settingsMutation.isError && (
            <p className="mt-3 text-sm text-error" role="alert">
              {settingsMutation.error?.response?.data?.message ||
                "Profile visibility could not be updated."}
            </p>
          )}
          {settingsMutation.isSuccess && (
            <p className="mt-3 text-sm text-success" role="status">
              Profile visibility updated.
            </p>
          )}
        </section>
      </Card>
    </div>
  );
};
