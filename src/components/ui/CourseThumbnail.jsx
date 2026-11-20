import { useState } from "react";
import { BookOpen } from "lucide-react";

import { cn } from "@/lib/cn";
import { resolveAssetUrl } from "@/lib/assets";

const gradients = [
  "linear-gradient(135deg, #172c21 0%, #2f5a44 55%, #8fb49d 100%)",
  "linear-gradient(135deg, #1d2f35 0%, #375a55 55%, #a6c3b6 100%)",
  "linear-gradient(135deg, #2a3324 0%, #4c6242 55%, #c3d2b8 100%)",
  "linear-gradient(135deg, #202b2f 0%, #3d5850 55%, #9dbbb0 100%)",
  "linear-gradient(135deg, #26301f 0%, #47603c 55%, #b7caa9 100%)",
];

const hashOf = (value = "") =>
  [...String(value)].reduce((total, character) => (total * 31 + character.charCodeAt(0)) % 9973, 7);

const initialsOf = (value = "") =>
  String(value)
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase() || "SH";

/**
 * Course media: renders the real cover when one exists and falls back to a
 * deterministic botanical gradient with the course monogram otherwise, so the
 * catalogue never shows an empty grey box.
 */
export const CourseThumbnail = ({
  imageUrl,
  title = "",
  categoryName = "",
  className,
  rounded = "rounded-2xl",
  iconSize = 22,
  children,
}) => {
  const [failed, setFailed] = useState(false);
  const src = resolveAssetUrl(imageUrl);
  const showImage = Boolean(src) && !failed;
  const gradient = gradients[hashOf(title) % gradients.length];

  return (
    <div className={cn("relative isolate overflow-hidden bg-sage", rounded, className)}>
      {showImage ? (
        <img
          src={src}
          alt=""
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div
          className="flex h-full w-full flex-col justify-between p-3 text-white"
          style={{ backgroundImage: gradient }}
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
            <BookOpen size={Math.max(13, iconSize - 6)} strokeWidth={1.7} aria-hidden="true" />
          </span>

          <div className="min-w-0">
            <p className="truncate text-[9px] font-semibold uppercase tracking-[0.14em] text-white/65">
              {categoryName || "SkillHub"}
            </p>
            <p className="mt-0.5 font-display text-[15px] font-bold leading-tight tracking-[-0.02em]">
              {initialsOf(title)}
            </p>
          </div>
        </div>
      )}

      {children}
    </div>
  );
};

export default CourseThumbnail;
