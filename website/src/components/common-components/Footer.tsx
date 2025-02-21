import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { TbWorld } from "react-icons/tb";

const Footer = () => {
  const menuItems = [
    { name: "Home", Path: "/" },
    { name: "Login", Path: "/sign-in" },
    { name: "Register", Path: "/sign-up" },
    { name: "Admin Login", Path: "/sign-up" },
  ];

  return (
    <div className="bg-[#031924]">
      <div className=" pt-16 main-container">
        <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <Link
              href="/"
              aria-label="Go home"
              title="Company"
              className="inline-flex items-center"
            >
              <Image width={100} height={100} src="/img/footer_logo.png" alt="Learning Portal" />
              <span className="ml-2 text-xl font-bold tracking-wide text-gray-200 uppercase">
                Company
              </span>
            </Link>
            <div className="mt-6 lg:max-w-sm">
              <p className="text-sm text-gray-200">
                Learning Portal is an online education platform where admins can create and manage
                courses and classes, while users can enroll and engage in learning. It offers a
                seamless experience for course management, user enrollment, and interactive
                learning.
              </p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-base font-bold tracking-wide text-white">Quick Links</p>

            <ul className="ps-2 space-y-2">
              {menuItems?.map((item, index) => (
                <li key={index}>
                  <Link className="text-gray-200 hover:text-white" href={item?.Path}>
                    {item?.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="text-base font-bold tracking-wide text-white mb-2">Contact</span>
            <div className="flex items-center mt-1 space-x-3">
              <a
                target="_blank"
                href="https://github.com/SihabMolla11"
                className="text-gray-200 transition-colors duration-300 hover:text-deep-purple-accent-400"
              >
                <FaGithub className="size-7" />
              </a>

              <a
                target="_blank"
                href="http://s-coder-beta.vercel.app"
                className="text-gray-200 transition-colors duration-300 hover:text-deep-purple-accent-400"
              >
                <TbWorld className="size-7" />
              </a>

              <a
                target="_blank"
                href="https://www.facebook.com/sihab.molla.98"
                className="text-gray-200 transition-colors duration-300 hover:text-deep-purple-accent-400"
              >
                <FaFacebook className="size-7" />
              </a>

              <a
                target="_blank"
                href="https://www.linkedin.com/in/sihab-uddin-molla-0a1b81337"
                className="text-gray-200 transition-colors duration-300 hover:text-deep-purple-accent-400"
              >
                <FaLinkedin className="size-7" />
              </a>
            </div>
            <div className="mt-4 text-sm text-gray-200 space-y-3">
              <a
                href="mailto:sihabmolla10@gmail.com"
                className="text-gray-200 transition-colors duration-300 hover:text-deep-purple-accent-400 flex items-center gap-1"
              >
                <MdEmail className="size-7" />
                <span className="text-lg">sihabmolla10@gmail.com</span>
              </a>
              <a
                href="tel:+8801608168147"
                className="text-gray-200 transition-colors duration-300 hover:text-deep-purple-accent-400 flex items-center gap-1"
              >
                <IoIosCall className="size-7" />
                <span className="text-lg">+8801608168147</span>
              </a>
              <a
                href="#"
                className="text-gray-200 transition-colors duration-300 hover:text-deep-purple-accent-400 flex items-center gap-1"
              >
                <FaLocationDot className="size-7" />
                <span className="text-lg">Mirpur, Dhaka, Bangladesh</span>
              </a>
            </div>
          </div>
        </div>
        <div className=" pt-5 pb-5 border-t">
          <p className="text-sm text-center text-white">
            © 2025 - Sihab Uddin Molla. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
