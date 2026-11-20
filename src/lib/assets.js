import ENV from "@/app/config/env";

const API_ORIGIN = String(ENV.API_URL || "").replace(/\/+$/, "");

/**
 * The API can return absolute URLs (S3) or server-relative ones (local
 * /uploads). Both need to resolve against the API host, never the SPA host.
 */
export const resolveAssetUrl = (url) => {
  if (!url) return null;

  const value = String(url).trim();
  if (!value) return null;

  if (/^(https?:)?\/\//i.test(value) || value.startsWith("data:") || value.startsWith("blob:")) {
    return value;
  }

  const path = value.startsWith("/") ? value : `/${value}`;
  return API_ORIGIN ? `${API_ORIGIN}${path}` : path;
};

export default resolveAssetUrl;
