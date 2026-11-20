import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import useCurrentUser from "@/features/auth/hooks/useCurrentUser";
import {
  getProfileSettings,
  resetProfileSettings,
  updateProfileSettings,
} from "@/features/profile/api/profileApi";

import { useTheme } from "./ThemeProvider";

export const DEFAULT_SETTINGS = {
  profilePublic: false,
  showActivity: true,
  showProgress: true,
  showInLeaderboard: true,
  allowCommunityMessages: true,
  theme: "light",
  animationsEnabled: true,
  compactMode: false,
  fontScale: "md",
  sidebarCompact: false,
  defaultHome: "dashboard",
  weeklyGoalMinutes: 180,
  autoplayNextLesson: true,
  notesAutosave: true,
  showLessonNotes: true,
  language: "English",
  timezone: "GMT",
  startWeekOnMonday: true,
  emailNotifications: true,
  pushNotifications: true,
  courseUpdates: true,
  achievementAlerts: true,
  weeklyDigest: true,
  dailyReminder: false,
  reminderTime: "18:00",
  communityReplies: true,
  marketingEmails: false,
};

const PreferencesContext = createContext(null);

const applyDomPreferences = (settings) => {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  root.setAttribute("data-font", settings.fontScale || "md");
  root.setAttribute("data-compact", String(Boolean(settings.compactMode)));
  root.setAttribute("data-animations", String(settings.animationsEnabled !== false));
  root.setAttribute("data-sidebar", settings.sidebarCompact ? "compact" : "full");

  try {
    localStorage.setItem("compactMode", String(Boolean(settings.compactMode)));
    localStorage.setItem("animationsEnabled", String(settings.animationsEnabled !== false));
    localStorage.setItem("fontScale", settings.fontScale || "md");
    localStorage.setItem("sidebarCompact", String(Boolean(settings.sidebarCompact)));
  } catch {
    /* storage can be unavailable in private mode; preferences still apply */
  }
};

/**
 * Loads the account preferences once per session and applies the ones that
 * change the interface (theme, type scale, density, motion, sidebar) globally.
 * Every screen reads the same cached settings, so nothing drifts out of sync.
 */
export const PreferencesProvider = ({ children }) => {
  const { data: user } = useCurrentUser();
  const userId = user?._id;
  const { theme, setTheme } = useTheme();
  const queryClient = useQueryClient();
  const [savedAt, setSavedAt] = useState(null);

  const settingsQuery = useQuery({
    queryKey: ["user-settings", userId],
    queryFn: () => getProfileSettings(userId),
    enabled: Boolean(userId),
    staleTime: 5 * 60 * 1000,
  });

  const settings = useMemo(
    () => ({ ...DEFAULT_SETTINGS, ...(settingsQuery.data?.data || {}) }),
    [settingsQuery.data],
  );

  useEffect(() => {
    if (!userId) return;
    applyDomPreferences(settings);

    if (settings.theme && settings.theme !== theme) {
      setTheme(settings.theme);
    }
  }, [
    userId,
    settings.fontScale,
    settings.compactMode,
    settings.animationsEnabled,
    settings.sidebarCompact,
    settings.theme,
    theme,
    setTheme,
  ]);

  const updateMutation = useMutation({
    mutationFn: (patch) => updateProfileSettings({ userId, settings: patch }),
    onMutate: async (patch) => {
      await queryClient.cancelQueries({ queryKey: ["user-settings", userId] });
      const previous = queryClient.getQueryData(["user-settings", userId]);
      queryClient.setQueryData(["user-settings", userId], (old) => ({
        ...old,
        data: { ...old?.data, ...patch },
      }));
      return { previous };
    },
    onError: (_error, _patch, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["user-settings", userId], context.previous);
      }
    },
    onSuccess: (response) => {
      queryClient.setQueryData(["user-settings", userId], response);
      setSavedAt(Date.now());
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user-settings", userId] });
    },
  });

  const resetMutation = useMutation({
    mutationFn: () => resetProfileSettings(userId),
    onSuccess: (response) => {
      queryClient.setQueryData(["user-settings", userId], response);
      setSavedAt(Date.now());
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user-settings", userId] });
    },
  });

  const updateSetting = useCallback(
    (key, value) => updateMutation.mutate({ [key]: value }),
    [updateMutation],
  );

  const updateTheme = useCallback(
    (nextTheme) => {
      setTheme(nextTheme);
      updateMutation.mutate({ theme: nextTheme });
    },
    [setTheme, updateMutation],
  );

  const resetSettings = useCallback(() => resetMutation.mutate(), [resetMutation]);

  const value = useMemo(
    () => ({
      settings,
      isLoading: settingsQuery.isLoading,
      isError: settingsQuery.isError,
      error: settingsQuery.error,
      updateSetting,
      updateTheme,
      resetSettings,
      isSaving: updateMutation.isPending || resetMutation.isPending,
      saveError: updateMutation.error || resetMutation.error,
      savedAt,
      refetch: settingsQuery.refetch,
    }),
    [
      settings,
      settingsQuery.isLoading,
      settingsQuery.isError,
      settingsQuery.error,
      updateSetting,
      updateTheme,
      resetSettings,
      updateMutation.isPending,
      resetMutation.isPending,
      updateMutation.error,
      resetMutation.error,
      savedAt,
      settingsQuery.refetch,
    ],
  );

  return (
    <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>
  );
};

export const usePreferences = () => {
  const context = useContext(PreferencesContext);

  if (!context) {
    throw new Error("usePreferences must be used within a PreferencesProvider");
  }

  return context;
};

export default PreferencesProvider;
