import { usePreferences } from "@/app/providers/PreferencesProvider";

/**
 * Thin adapter over the global PreferencesProvider. The provider loads the
 * signed-in account settings once and applies them across the app, so every
 * screen that reads this hook stays in sync.
 */
export const useProfileSettings = () => {
  const {
    settings,
    isLoading,
    isError,
    error,
    updateSetting,
    updateTheme,
    resetSettings,
    isSaving,
    saveError,
    savedAt,
    refetch,
  } = usePreferences();

  return {
    settings,
    isLoading,
    isError,
    error,
    updateSetting,
    updateTheme,
    resetSettings,
    isUpdating: isSaving,
    updateError: saveError,
    savedAt,
    refetch,
  };
};

export default useProfileSettings;
