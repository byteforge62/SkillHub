export const getSafeExternalUrl = (value) => {
  if (typeof value !== "string") return null;

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:"
      ? value
      : null;
  } catch {
    return null;
  }
};
