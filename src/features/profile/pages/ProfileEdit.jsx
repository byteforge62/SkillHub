import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";

import { updateProfile, uploadProfileAvatar } from "../api/profileApi";

const profileFields = ["fullname", "bio", "github", "linkedin", "twitter"];

const profileFromUser = (user) =>
  Object.fromEntries(profileFields.map((field) => [field, user?.[field] || ""]));

export const ProfileEdit = ({ user }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [profile, setProfile] = useState("");
  const [avatarError, setAvatarError] = useState("");
  const initialProfile = user ? profileFromUser(user) : null;
  const fileInputRef = useRef(null);

  const profileValues = profile ?? profileFromUser(user);
  const hasUnsavedChanges = initialProfile
    ? JSON.stringify(profileValues) !== JSON.stringify(initialProfile)
    : false;

  const updateMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["current-user"], updatedUser);
      setProfile("");
      navigate("/profile");
    },
  });

  const avatarMutation = useMutation({
    mutationFn: uploadProfileAvatar,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["current-user"], updatedUser);
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
  });

  const isSubmitting = updateMutation.isPending || avatarMutation.isPending;

  const handleSubmit = (event) => {
    event.preventDefault();
    setAvatarError("");
    if (!user) return;

    const payload = { userId: user._id, profile: profileValues };
    updateMutation.mutate(payload);
  };

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      if (window.confirm("You have unsaved changes. Are you sure you want to cancel?")) {
        setProfile("");
        navigate("/profile");
      }
    } else {
      setProfile("");
      navigate("/profile");
    }
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    setAvatarError("");
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setAvatarError("Choose an image that is 5 MB or smaller.");
      event.target.value = "";
      return;
    }

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setAvatarError("Avatar must be a JPEG, PNG, or WebP image.");
      event.target.value = "";
      return;
    }

    avatarMutation.mutate(file);
  };

  const handleChange = (field, value) => {
    setProfile((current) => ({
      ...(current ?? profileFromUser(user)),
      [field]: value,
    }));
  };

  const initials = (user.fullname || user.email || "U")
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-6">
        <NavLink
          to="/profile"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary mb-4"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Profile
        </NavLink>

        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          Your account
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Edit Profile</h1>
        <p className="mt-3 text-sm leading-6 text-text-muted">
          Update your personal information and profile photo.
        </p>
      </header>

      <Card>
        <form onSubmit={handleSubmit}>
          <div className="mb-6 flex flex-col gap-5 sm:flex-row sm:items-center">
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

              <label className="cursor-pointer">
                <input
                  ref={fileInputRef}
                  id="profile-avatar"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  disabled={avatarMutation.isPending}
                  className="sr-only"
                  onChange={handleAvatarChange}
                />
                <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface-hover px-4 py-2 text-sm font-medium text-text-primary hover:bg-surface transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Change Photo
                </span>
              </label>
            </div>
          </div>

          {(avatarError || avatarMutation.isError) && (
            <p className="mt-4 text-sm text-error" role="alert">
              {avatarError || avatarMutation.error?.response?.data?.message || "Your profile photo could not be uploaded."}
            </p>
          )}
          {avatarMutation.isSuccess && (
            <p className="mt-4 text-sm text-success" role="status">
              Profile photo updated.
            </p>
          )}

          <div className="mt-6 space-y-5">
            <Input
              id="fullname"
              label="Full Name"
              type="text"
              value={profileValues.fullname}
              onChange={(event) => handleChange("fullname", event.target.value)}
              maxLength={100}
              placeholder="Your full name"
            />

            <label className="block">
              <span className="block text-sm font-medium text-text-primary mb-1">Bio</span>
              <textarea
                id="bio"
                value={profileValues.bio}
                onChange={(event) => handleChange("bio", event.target.value)}
                maxLength={2000}
                placeholder="Tell us about yourself..."
                className="mt-1 block min-h-28 w-full resize-y rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
                spellCheck={false}
              />
              <p className="mt-1 text-xs text-text-muted">
                {profileValues.bio.length}/2000 characters
              </p>
            </label>

            <Input
              id="github"
              label="GitHub"
              type="text"
              value={profileValues.github}
              onChange={(event) => handleChange("github", event.target.value)}
              maxLength={500}
              placeholder="github.com/username"
            />

            <Input
              id="linkedin"
              label="LinkedIn"
              type="text"
              value={profileValues.linkedin}
              onChange={(event) => handleChange("linkedin", event.target.value)}
              maxLength={500}
              placeholder="linkedin.com/in/username"
            />

            <Input
              id="twitter"
              label="Twitter / X"
              type="text"
              value={profileValues.twitter}
              onChange={(event) => handleChange("twitter", event.target.value)}
              maxLength={500}
              placeholder="twitter.com/username"
            />
          </div>

          {updateMutation.isError && (
            <p className="mt-4 text-sm text-error" role="alert">
              {updateMutation.error?.response?.data?.message || "Your profile could not be saved."}
            </p>
          )}
          {updateMutation.isSuccess && (
            <p className="mt-4 text-sm text-success" role="status">
              Profile changes saved.
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
              Save Changes
            </Button>
            <Button type="button" variant="secondary" onClick={handleCancel} disabled={isSubmitting}>
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

