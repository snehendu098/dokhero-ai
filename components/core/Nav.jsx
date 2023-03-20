import { useState, useEffect } from "react";
import { MobileNav, IconButton } from "@material-tailwind/react";
import Link from "next/link";

export default function Nav() {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <div className="mx-auto w-full p-3 border-b border-b-blue-gray-900">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Link href="/">
          <p className="mr-4 cursor-pointer py-1.5 text-2xl text-white font-bold">
            Dok<span className="text-purple-800">Hero</span>
          </p>
        </Link>
        <div className="md:flex items-center justify-center text-white font-medium hidden ">
          <Link href={"/create"}>
            <p className="mr-3">Create</p>
          </Link>
          <a href="/api/auth/logout">
            <div className="px-5 p-1 border-red-500 cursor-pointer rounded-md text-red-500 flex border items-center justify-center">
              Log Out
            </div>
          </a>
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="white"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {/* {navList} */}
          <a href="/api/auth/logout">
            <div className="mb-2 border-red-600 border text-center text-red-600 rounded-md mt-5">
              <span>Log Out</span>
            </div>
          </a>
        </div>
      </MobileNav>
    </div>
  );
}
