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
      <div className="max-w-screen-3xl 3xl-contaner flex">
        {/* Sidebar */}
        <DashboardLayoutSidebar
          sidebarItems={type === "admin" ? SIDEBAR_ADMIN : SIDEBAR_PARENT}
          isOpen={open}
        />

        {/* Main Content */}
        <div className="h-screen w-full overflow-y-auto px-8">
          {/* Top Navbar */}
          <Navbar
            className="flex justify-between bg-transparent px-0"
            isBlurred={false}
            classNames={{ wrapper: "p-0" }}
            position="static"
          >
            <h1 className="text-3xl font-bold">{title}</h1>
            {/* Title & Menu Toggle */}
            <NavbarMenuToggle
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen(!open)}
              className="block lg:hidden"
            />
          </Navbar>
          {/* Page Description */}
          <p className="mt-3 mb-3 text-sm text-gray-500">{description}</p>

          {/* Page Content */}
          {children}
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
