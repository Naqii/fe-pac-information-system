import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useLandingPageLayoutNavbar from "./useLandingPageLayoutNavbar";
import {
  Avatar,
  Button,
  ButtonProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";
import Image from "next/image";
import { BUTTON_ITEMS, NAV_ITEMS } from "../LandingPageLayout.constant";
import { cn } from "@/utils/cn";
import { Fragment } from "react";

const LandingPageLayoutNavbar = () => {
  const router = useRouter();
  const session = useSession();
  const { dataProfile } = useLandingPageLayoutNavbar();

  return (
    <Navbar maxWidth="full" isBordered isBlurred={false} shouldHideOnScroll>
      <div className="flex items-center gap-8">
        <NavbarBrand as={Link} href="/">
          <Image
            src="/images/illustration/logo.webp"
            alt="logo"
            width={50}
            height={50}
            className="cursor-pointer"
          />
        </NavbarBrand>
        <NavbarContent className="hidden lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavbarItem
              key={`nav-${item.label}`}
              as={Link}
              href={item.href}
              className={cn("font-medium hover:text-[#006d63]", {
                "font-bold text-[#006d63]": router.pathname === item.href,
                "text-default-700": router.pathname !== item.href,
              })}
            >
              {item.label}
            </NavbarItem>
          ))}
        </NavbarContent>
      </div>
      <NavbarContent justify="end">
        <NavbarMenuToggle className="lg:hidden" />
        {session.status === "authenticated" ? (
          <NavbarItem className="hidden lg:block">
            <Dropdown>
              <DropdownTrigger>
                <Avatar
                  src={dataProfile?.profilePicture}
                  className="cursor-pointer"
                  showFallback
                  name={dataProfile?.fullName}
                ></Avatar>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key="admin"
                  href="/admin/student"
                  className={cn({ hidden: dataProfile?.role !== "admin" })}
                >
                  Admin
                </DropdownItem>
                <DropdownItem
                  key="profile"
                  href="/member/profile"
                  className={cn({ hidden: dataProfile?.role !== "member" })}
                >
                  Profile
                </DropdownItem>
                <DropdownItem key="signout" onPress={() => signOut()}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        ) : (
          <div className="hidden lg:flex lg:gap-4">
            {BUTTON_ITEMS.map((item) => (
              <NavbarItem key={`button-${item.label}`}>
                <Button
                  as={Link}
                  className="bg-[#006d63] text-white"
                  href={item.href}
                  variant={item.variant as ButtonProps["variant"]}
                >
                  {item.label}
                </Button>
              </NavbarItem>
            ))}
          </div>
        )}
        <NavbarMenu className="gap-4">
          {NAV_ITEMS.map((item) => (
            <NavbarMenuItem key={`nav-${item.label}`}>
              <Link
                href={item.href}
                className={cn("font-medium hover:text-[#006d63]", {
                  "font-bold text-[#006d63]": router.pathname === item.href,
                  "text-default-700": router.pathname !== item.href,
                })}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
          {session.status === "authenticated" ? (
            <Fragment>
              {dataProfile?.role === "admin" && (
                <NavbarMenuItem>
                  <Link
                    className="text-default-700 font-medium hover:text-[#006d63]"
                    href="/admin/event"
                  >
                    Admin
                  </Link>
                </NavbarMenuItem>
              )}
              {dataProfile?.role === "member" && (
                <NavbarMenuItem>
                  <Link
                    className="text-default-700 font-medium hover:text-[#006d63]"
                    href="/member/profile"
                  >
                    Profile
                  </Link>
                </NavbarMenuItem>
              )}

              <NavbarMenuItem>
                <Button
                  color="danger"
                  onPress={() => signOut()}
                  className="mt-2 w-full"
                  variant="bordered"
                  size="md"
                >
                  Log Out
                </Button>
              </NavbarMenuItem>
            </Fragment>
          ) : (
            <Fragment>
              {BUTTON_ITEMS.map((item) => (
                <NavbarMenuItem key={`button-${item.label}`}>
                  <Button
                    as={Link}
                    className="bg-[#006d63] text-white"
                    href={item.href}
                    fullWidth
                    variant={item.variant as ButtonProps["variant"]}
                    size="md"
                  >
                    {item.label}
                  </Button>
                </NavbarMenuItem>
              ))}
            </Fragment>
          )}
        </NavbarMenu>
      </NavbarContent>
    </Navbar>
  );
};

export default LandingPageLayoutNavbar;
