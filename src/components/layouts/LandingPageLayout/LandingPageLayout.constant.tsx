import { FaFacebookSquare, FaInstagram } from "react-icons/fa";

const NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
  },
  // {
  //   label: "Explore",
  //   href: "/event",
  // },
];

const BUTTON_ITEMS = [
  { label: "Login", href: "/auth/login", variant: "solid" },
];

const SOCIAL_ITEMS = [
  {
    label: "Facebook",
    href: "https://facebook.com/",
    icon: <FaFacebookSquare />,
  },
  { label: "Instagram", href: "https://instagram.com/", icon: <FaInstagram /> },
];

export { BUTTON_ITEMS, SOCIAL_ITEMS, NAV_ITEMS };
