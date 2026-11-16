import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfileSettings, updateProfileSettings } from "../api/profileApi";
import { useTheme } from "@/app/providers/ThemeProvider";

const SETTINGS_QUERY_KEY = (userId) => ["user-settings", userId];

const LOCAL_STORAGE_KEYS = {
  animationsEnabled: "animationsEnabled",
  compactMode: "compactMode",
};

export const useProfileSettings = (userId) => {
  const { theme, setTheme } = useTheme();
  const queryClient = useQueryClient();

  const settingsQuery = useQuery({
    queryKey: SETTINGS_QUERY_KEY(userId),
    queryFn: () => getProfileSettings(userId),
    enabled: Boolean(userId),
    staleTime: 5 * 60 * 1000,
  });

  const settings = settingsQuery.data?.data || {};

  const updateMutation = useMutation({
    mutationFn: (newSettings) => updateProfileSettings({ userId, settings: newSettings }),
    onMutate: async (newSettings) => {
      await queryClient.cancelQueries({ queryKey: SETTINGS_QUERY_KEY(userId) });
      const previousSettings = queryClient.getQueryData(SETTINGS_QUERY_KEY(userId));
      queryClient.setQueryData(SETTINGS_QUERY_KEY(userId), (old) => ({
        ...old,
        data: { ...old?.data, ...newSettings },
      }));
      return { previousSettings };
    },
    onError: (_err, _newSettings, context) => {
      if (context?.previousSettings) {
        queryClient.setQueryData(SETTINGS_QUERY_KEY(userId), context.previousSettings);
      }
    },
    onSuccess: (response) => {
      queryClient.setQueryData(SETTINGS_QUERY_KEY(userId), response);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: SETTINGS_QUERY_KEY(userId) });
    },
  });

  const handleSettingChange = (key, value) => {
    if (typeof window !== "undefined") {
      if (key === LOCAL_STORAGE_KEYS.animationsEnabled) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.animationsEnabled, String(value));
        document.documentElement.setAttribute("data-animations", value ? "true" : "false");
      } else if (key === LOCAL_STORAGE_KEYS.compactMode) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.compactMode, String(value));
        document.documentElement.setAttribute("data-compact", value ? "true" : "false");
      }
    }
    updateMutation.mutate({ [key]: value });
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    handleSettingChange("theme", newTheme);
  };

  return {
    settings,
    isLoading: settingsQuery.isLoading,
    isError: settingsQuery.isError,
    error: settingsQuery.error,
    updateSetting: handleSettingChange,
    updateTheme: handleThemeChange,
    isUpdating: updateMutation.isPending,
    updateError: updateMutation.error,
    refetch: settingsQuery.refetch,
  };
};