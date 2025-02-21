"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoMenuSharp } from "react-icons/io5";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Home", Path: "/" },
    { name: "Login", Path: "/sign-in" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const mobileMenu = document.getElementById("mobile-menu-2");
      const menuButton = document.querySelector('[aria-controls="mobile-menu-2"]');

      if (mobileMenu && !mobileMenu.contains(event.target) && !menuButton.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="bg-white  py-2.5 border-b border-gray-color relative">
        <div className="flex items-center justify-between main-container ">
          <Link href="/" className="flex items-center ">
            <Image
              height={32}
              width={32}
              src="/img/logo.png"
              className="h-8 w-8   mr-3 sm:h-9"
              alt="Learning Portal Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap">
              Learning Portal
            </span>
          </Link>

          <div className={`items-center justify-between   lg:w-auto lg:order-1 hidden lg:flex `}>
            <ul className="flex items-center mt-4 font-medium lg:space-x-8 lg:mt-0">
              {menuItems?.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.Path}
                    className={`block py-2 pl-3 pr-4 rounded lg:p-0 ${
                      pathname === item.Path
                        ? "text-primary bg-transparent"
                        : "text-gray-700 hover:text-primary"
                    }`}
                    aria-current={pathname === item.Path ? "page" : undefined}
                    onClick={closeMenu}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}

              <Link
                className="bg-primary hover:bg-primary-hover text-white font-semibold px-4 rounded-md py-1"
                href="/sign-up"
              >
                Sign UP
              </Link>
            </ul>
          </div>

          <div className="text-end lg:order-2 lg:hidden ">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center p-1 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <IoMenuSharp className="size-6" />
            </button>
          </div>
        </div>
        <div className="lg:hidden">
          <div
            className={`items-center justify-between w-full  lg:w-auto lg:order-1 top-[43px]  absolute drop-shadow-xl bg-white   transition delay-300 duration-300 ease-in-out  ${
              isMenuOpen ? "left-0" : "left-[-100%]"
            }`}
          >
            <ul className="block  mt-4 font-medium lg:space-x-8 lg:mt-0">
              {menuItems?.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.Path}
                    className={`block py-2 pl-3 pr-4 rounded lg:p-0 ${
                      pathname === item.Path
                        ? "text-primary bg-transparent"
                        : "text-gray-700 hover:text-primary"
                    }`}
                    aria-current={pathname === item.Path ? "page" : undefined}
                    onClick={closeMenu}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
