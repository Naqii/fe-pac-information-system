import PageHead from "@/components/commons/PageHead";
import { ReactNode, useState } from "react";
import { SIDEBAR_ADMIN, SIDEBAR_PARENT } from "./DashboardLayout.constant";
import { Navbar, NavbarMenuToggle } from "@heroui/react";
import DashboardLayoutSidebar from "./DashboardLayoutSidebar";

interface PropTypes {
  children: ReactNode;
  description?: string;
  title?: string;
  type?: string;
}

const DashboardLayout = (props: PropTypes) => {
  const { children, description, title, type = "admin" } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <PageHead title={title} />
      <div className="flex min-h-screen bg-gray-50 text-gray-800">
        {/* Sidebar */}
        <DashboardLayoutSidebar
          sidebarItems={type === "admin" ? SIDEBAR_ADMIN : SIDEBAR_PARENT}
          isOpen={open}
        />

        {/* Main Content */}
        <div className="flex flex-1 flex-col">
          {/* Top Navbar */}
          <Navbar
            className="flex items-center justify-between border-b bg-white px-4 py-3 shadow-sm"
            isBlurred={false}
            classNames={{ wrapper: "px-0" }}
            position="static"
          >
            {/* Title & Menu Toggle */}
            <div className="flex items-center gap-3">
              <NavbarMenuToggle
                aria-label={open ? "Close menu" : "Open menu"}
                onPress={() => setOpen(!open)}
                className="block lg:hidden"
              />
              <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            </div>
          </Navbar>

          {/* Page Description */}
          {description && (
            <p className="mt-3 px-6 text-sm text-gray-500">{description}</p>
          )}

          {/* Page Content */}
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
