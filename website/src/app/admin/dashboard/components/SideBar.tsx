import Link from "next/link";
import { BsCcSquare } from "react-icons/bs";
import { FiHome } from "react-icons/fi";
import { sidebarItems } from "./sidebarItems";

const SideBar = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {


  return (
    <>
      <div className="bg-gray-100">
        <div className=" flex overflow-hidden bg-gray-200 min-h-[calc(100vh-56px)] ">
          <div className="flex items-start w-full">
            <div
              className={` hidden lg:block bg-gray-800 text-white max-w-56 min-h-[calc(100vh-56px)]   overflow-y-auto transition-transform transform ease-in-out duration-300  translate-x-0 w-[20%]`}
            >
              <div className="p-4">
                <Link href="#" className="text-2xl font-semibold">
                  Learning Portal
                </Link>
                <ul className="mt-4">
                  {sidebarItems?.map((item) => (
                    <li key={item.key} className="mb-2">
                      <Link
                        href={item.key}
                        className=" hover:text-indigo-400 flex items-center gap-2"
                      >
                        {item.icon} {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {children}
          </div>
        </div>
        <div className="bg-primary py-4 text-gray-100 mt-auto">
          <p className="px-4 text-center sm:w-auto w-full">
            © 2025 - Sihab Uddin Molla. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default SideBar;
