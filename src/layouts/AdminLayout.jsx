import { NavLink, Outlet } from "react-router-dom";

export const AdminLayout = () => {
  return (
    <div className="mx-auto max-w-7xl px-6 py-6">
      <nav
        className="mb-7 flex flex-wrap gap-2 border-b border-border pb-4"
        aria-label="Admin navigation"
      >
        {[
          { label: "Overview", to: "/admin", end: true },
          { label: "Reports", to: "/admin/reports" },
        ].map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              [
                "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-white"
                  : "text-text-secondary hover:bg-surface-hover hover:text-text-primary",
              ].join(" ")
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <Outlet />
    </div>
  );
};
