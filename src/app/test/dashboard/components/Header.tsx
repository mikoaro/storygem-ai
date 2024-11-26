"use client";

import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
// import logo from "@/assets/images/logo.png";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useUserDetail } from "@/app/context/UserDetailContext";
import { usePathname } from "next/navigation";
import { CircleUser, FileVideo, PanelsTopLeft, ShieldPlus } from "lucide-react";

const MenuOption = [
  {
    id: 1,
    name: "Story Studio",
    path: "/test/dashboard",
    icon: PanelsTopLeft,
  },
  {
    id: 2,
    name: "Image Studio",
    path: "/test/dashboard/image",
    icon: FileVideo,
  },
  {
    id: 3,
    name: "Video Studio",
    path: "/test/dashboard",
    icon: ShieldPlus,
  },
  {
    id: 4,
    name: "Avatar Studio",
    path: "/test/dashboard",
    icon: CircleUser,
  },
];

const Header = () => {
  const { userDetail, setUserDetail } = useUserDetail();

  const pathname = usePathname();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Logo"
                width={100}
                height={100}
                className="h-12 w-12"
              />
              <span className="ml-2 text-xl font-bold text-gray-800">
                StoryGem Studio
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <nav className="flex space-x-4">
              {MenuOption.map((item, index) => (
                <Link
                  href={item.path}
                  key={index}
                  className={`text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-xl font-bold`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex gap-2 items-center">
              <Image
                src={"/coin.png"}
                alt={"Credits"}
                width={20}
                height={20}
              ></Image>
              <h2>{userDetail?.credits}</h2>
            </div>
            {/* <Button className="">Studio</Button>
            <h1>Connect Wallet</h1> */}
          </div>

          {/* Sign Up Button
          <div className="hidden md:block">
          <h2>{userDetail?.credits}</h2>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Sign Up
            </button>
          </div> */}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
          >
            About
          </Link>
          <Link
            href="/services"
            className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
          >
            Services
          </Link>
          <Link
            href="/contact"
            className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
          >
            Contact
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-5">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </header>
  );

  // return (
  //   <div className="p-3 px-5 flex items-center justify-between shadow-md">
  //     <div className="flex gap-3 items-center">
  //       <Link href="/" className="flex items-center gap-4 text-2xl">
  //         {/* <Image src={logo} width={200} height={200} alt="Volby" /> */}
  //         <h2 className="font-bold text-xl">StoryGem Studio</h2>
  //       </Link>
  //     </div>
  //     <div className="flex gap-2 items-center">
  //       <div className="flex gap-2 items-center">
  //         <Image
  //           src={"/coin.png"}
  //           alt={"Credits"}
  //           width={20}
  //           height={20}
  //         ></Image>
  //         <h2>{userDetail?.credits}</h2>
  //       </div>
  //       <Button className="">Studio</Button>
  //       <h1>Connect Wallet</h1>
  //     </div>
  //   </div>
  // );
};

export default Header;
