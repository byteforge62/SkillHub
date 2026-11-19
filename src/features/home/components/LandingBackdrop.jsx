import backdropImage from "@/assets/landing-atmosphere.jpg";

/**
 * Landing atmosphere.
 *
 * One editorial image stays pinned behind the whole landing page, so the page
 * reads as a single continuous surface instead of stacked colour bands. The
 * scrim keeps body copy at comfortable contrast while the botanical texture
 * shows through the gaps between cards.
 */
export const LandingBackdrop = () => (
  <div
    className="pointer-events-none fixed inset-0 overflow-hidden bg-background"
    aria-hidden="true"
  >
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70"
      style={{ backgroundImage: `url("${backdropImage}")` }}
    />

    <div className="absolute inset-0 landing-scrim" />
  </div>
);

export default LandingBackdrop;
