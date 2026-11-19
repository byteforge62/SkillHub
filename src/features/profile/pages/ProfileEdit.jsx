import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { Camera, RefreshCw } from "lucide-react";

import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import Skeleton from "@/components/ui/Skeleton";
import Input, { Textarea } from "@/components/ui/Input";
import useCurrentUser from "@/features/auth/hooks/useCurrentUser";

import { updateProfile, uploadProfileAvatar } from "../api/profileApi";

const profileFields = ["fullname", "bio", "github", "linkedin", "twitter"];

const profileFromUser = (user) =>
  Object.fromEntries(profileFields.map((field) => [field, user?.[field] || ""]));

export const ProfileEdit = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: user, isLoading } = useCurrentUser();

  const [profile, setProfile] = useState(null);
  const [avatarError, setAvatarError] = useState("");
  const fileInputRef = useRef(null);

  const initialProfile = user ? profileFromUser(user) : null;
  const profileValues = profile ?? profileFromUser(user);
  const hasUnsavedChanges = initialProfile
    ? JSON.stringify(profileValues) !== JSON.stringify(initialProfile)
    : false;

  const updateMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["current-user"], updatedUser);
      setProfile(null);
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

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl space-y-5" role="status">
        <Skeleton className="h-9 w-56" />
        <Skeleton className="h-96 w-full rounded-3xl" />
        <span className="sr-only">Loading your profile...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <EmptyState
        tone="error"
        icon={RefreshCw}
        title="We couldn't open your profile"
        description="Your account details are not available right now."
        action={
          <Button as={Link} to="/dashboard" variant="secondary">
            Back to dashboard
          </Button>
        }
      />
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setAvatarError("");
    updateMutation.mutate({ userId: user._id, profile: profileValues });
  };

  const handleCancel = () => {
    if (
      hasUnsavedChanges &&
      !window.confirm("You have unsaved changes. Leave without saving?")
    ) {
      return;
    }

    setProfile(null);
    navigate("/profile");
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

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        backTo="/profile"
        backLabel="Profile"
        title="Edit profile"
        description="These details are visible in communities and event discussions."
      />

      <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
        <Card>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <Avatar
              src={user.avatar}
              name={user.fullname}
              email={user.email}
              size="xl"
              className="h-[76px] w-[76px] text-[22px]"
            />

            <div className="flex-1">
              <p className="text-[14.5px] font-semibold tracking-[-0.01em] text-text-primary">
                Profile photo
              </p>
              <p className="mt-1 text-[13px] leading-6 text-text-muted">
                JPEG, PNG or WebP up to 5 MB. A square image works best.
              </p>

              <label className="mt-3 inline-flex cursor-pointer">
                <input
                  ref={fileInputRef}
                  id="profile-avatar"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  disabled={avatarMutation.isPending}
                  className="sr-only"
                  onChange={handleAvatarChange}
                />
                <span className="inline-flex h-9 items-center gap-2 rounded-full border border-[color:var(--color-line)] bg-white px-4 text-[13px] font-semibold text-text-primary transition-colors hover:border-primary/40 hover:bg-sage/50">
                  <Camera size={15} strokeWidth={1.9} aria-hidden="true" />
                  {avatarMutation.isPending ? "Uploading..." : "Change photo"}
                </span>
              </label>
            </div>
          </div>

          {(avatarError || avatarMutation.isError) && (
            <p className="mt-4 text-[12.5px] text-error" role="alert">
              {avatarError ||
                avatarMutation.error?.response?.data?.message ||
                "Your profile photo could not be uploaded."}
            </p>
          )}

          {avatarMutation.isSuccess && (
            <p className="mt-4 text-[12.5px] text-success" role="status">
              Profile photo updated.
            </p>
          )}
        </Card>

        <Card>
          <h2 className="text-[15px] font-semibold tracking-[-0.02em]">About you</h2>

          <div className="mt-5 space-y-5">
            <Input
              id="fullname"
              label="Full name"
              type="text"
              value={profileValues.fullname}
              onChange={(event) => handleChange("fullname", event.target.value)}
              maxLength={100}
              placeholder="Your full name"
            />

            <Textarea
              id="bio"
              label="Bio"
              value={profileValues.bio}
              onChange={(event) => handleChange("bio", event.target.value)}
              maxLength={2000}
              placeholder="What are you learning, and what are you building?"
              hint={`${profileValues.bio.length}/2000 characters`}
            />

            <div className="grid gap-5 sm:grid-cols-2">
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
            </div>

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
            <p className="mt-4 text-[12.5px] text-error" role="alert">
              {updateMutation.error?.response?.data?.message ||
                "Your profile could not be saved."}
            </p>
          )}
        </Card>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
            Save changes
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>

          {hasUnsavedChanges && (
            <span className="text-[12.5px] text-text-muted">Unsaved changes</span>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;
