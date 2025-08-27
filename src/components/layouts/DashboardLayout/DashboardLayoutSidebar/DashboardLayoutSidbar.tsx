import { cn } from "@/utils/cn";
import { Button, Listbox, ListboxItem } from "@heroui/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { JSX } from "react";
import { CiLogout } from "react-icons/ci";

interface SidebarItem {
  key: string;
  label: string;
  href: string;
  icon: JSX.Element;
}

interface PropTypes {
  sidebarItems: SidebarItem[];
  isOpen: boolean;
}

const DashboardLayoutSidebar = (props: PropTypes) => {
  const { sidebarItems, isOpen } = props;
  const router = useRouter();
  return (
    <div
      className={cn(
        "px4 border-default-200 fixed z-50 flex h-screen w-full max-w-[300px] -translate-x-full flex-col justify-between border-r-1 bg-white py-6 transition-all lg:relative lg:translate-x-0",
        { "translate-x-0": isOpen },
      )}
    >
      <div>
        <div className="flex w-full justify-center">
          <Image
            src="/images/illustration/logo.webp"
            alt="logo"
            width={180}
            height={60}
            className="mb-6 w-32 cursor-pointer"
            onClick={() => router.push("/")}
          />
        </div>
        <Listbox
          items={sidebarItems}
          variant="solid"
          aria-label="Dashboard Menu"
        >
          {(item) => (
            <ListboxItem
              key={item.key}
              className={cn("my-1 h-12 text-2xl", {
                "bg-[#006d63] text-white": router.pathname.startsWith(
                  item.href,
                ),
              })}
              startContent={item.icon}
              aria-label={item.label}
              as={Link}
              href={item.href}
            >
              <p className="text-small">{item.label}</p>
            </ListboxItem>
          )}
        </Listbox>
      </div>
      <div className="flex items-center p-1"></div>
      <Button
        color="default"
        className={cn("my-1 flex h-12 items-center gap-2 text-2xl", {
          "bg-[#006d63] text-white": router.pathname === "/logout",
        })}
        size="lg"
        variant="light"
        fullWidth
        onPress={() => signOut()}
      >
        <CiLogout />
        <p className="text-small">Logout</p>
      </Button>
    </div>
  );
};

export default DashboardLayoutSidebar;
