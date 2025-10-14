import { Link } from "@heroui/react";
import Image from "next/image";
import { NAV_ITEMS, SOCIAL_ITEMS } from "../LandingPageLayout.constant";

const LandingPageLayoutFooter = () => {
  return (
    <div className="flex flex-col items-center justify-between bg-[#006d63] px-6 py-10 text-center lg:flex-row lg:text-left xl:p-20">
      <Image
        src={"/images/illustration/logo.webp"}
        alt="logo"
        width={200}
        height={100}
        className="p-4"
      />
      <div className="mb-4 flex flex-col gap-4 lg:mb-0">
        <div>
          <h4 className="text-xl text-white">Customer Services</h4>
          <p>
            <Link
              className="cursor-pointer text-white hover:text-white"
              href="mailto:alamatemail@contoh.com"
            >
              alamatemail@contoh.com
            </Link>{" "}
            | {""}
            <Link
              className="cursor-pointer text-white hover:text-white"
              href="tel:+62123456789"
            >
              +621 2345 6789 02
            </Link>{" "}
            {""}
          </p>
        </div>
        <div>
          <h4 className="text-xl text-white">Office</h4>
          <p className="text-white">Jl. Paping No.123, Semarang</p>
        </div>
      </div>
      <div className="mb-10 flex flex-col gap-2 lg:mb-0">
        <h2 className="text-xl text-white lg:mb-2">Menu</h2>
        {NAV_ITEMS.map((item) => (
          <Link
            key={`footer-nav${item.label}`}
            href={item.href}
            className="cursor-pointer text-white hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </div>
      <div className="flex flex-col items-center gap-8">
        <div className="flex items-center justify-between gap-8 text-white">
          {SOCIAL_ITEMS.map((item) => (
            <Link
              href={item.href}
              className="text-3xl hover:text-white"
              key={`footer-social-${item.label}`}
            >
              {item.icon}
            </Link>
          ))}
        </div>
        <p className="w-full text-center text-white">
          Copyright &copy; 2025 Acara. All rights reserved{" "}
        </p>
      </div>
    </div>
  );
};

export default LandingPageLayoutFooter;
