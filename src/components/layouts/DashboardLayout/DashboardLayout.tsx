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
      <div className="max-w-screen-3xl flex flex-col lg:flex-row">
        {/* Sidebar */}
        <DashboardLayoutSidebar
          sidebarItems={type === "admin" ? SIDEBAR_ADMIN : SIDEBAR_PARENT}
          isOpen={open}
        />

        {/* Main Content */}
        <div className="flex flex-1 flex-col">
          {/* Top Navbar */}
          <Navbar
            isMenuOpen={open}
            onMenuOpenChange={setOpen}
            className="flex justify-between bg-transparent px-6"
            isBlurred={false}
            classNames={{ wrapper: "px-0" }}
            position="static"
          >
            <h1 className="mt-3 text-3xl font-bold">{title}</h1>
            {/* Title & Menu Toggle */}
            <NavbarMenuToggle
              aria-label={open ? "Close menu" : "Open menu"}
              className="block lg:hidden"
            />
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
