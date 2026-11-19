import { Outlet } from "react-router-dom";

import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

export const PublicLayout = () => (
  <div className="flex min-h-screen flex-col bg-background">
    <SiteHeader />

    <main className="flex-1">
      <Outlet />
    </main>

    <SiteFooter />
  </div>
);

export default PublicLayout;
