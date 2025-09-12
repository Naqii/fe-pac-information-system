import { CiUser, CiViewList } from "react-icons/ci";
import { BsPeople, BsJournalBookmark } from "react-icons/bs";
import { PiChalkboardTeacherLight } from "react-icons/pi";

const SIDEBAR_ADMIN = [
  {
    key: "student",
    label: "Student",
    href: "/admin/student",
    icon: <BsPeople />,
  },
  {
    key: "teacher",
    label: "Teacher",
    href: "/admin/teacher",
    icon: <PiChalkboardTeacherLight />,
  },
  {
    key: "attendance",
    label: "Attendance",
    href: "/admin/attendance",
    icon: <CiViewList />,
  },
  {
    key: "learning",
    label: "Learning",
    href: "/admin/learning",
    icon: <BsJournalBookmark />,
  },
  {
    key: "parent",
    label: "Parent",
    href: "/admin/parent",
    icon: <BsPeople />,
  },
];

const SIDEBAR_PARENT = [
  {
    key: "student",
    label: "Student",
    href: "/parent/student",
    icon: <BsPeople />,
  },
  {
    key: "profile",
    label: "Profile",
    href: "/parent/profile",
    icon: <CiUser />,
  },
];

export { SIDEBAR_ADMIN, SIDEBAR_PARENT };
