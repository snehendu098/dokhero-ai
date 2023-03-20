import Link from "next/link";
import React from "react";
import { CgFolderAdd } from "react-icons/cg";

const StartCard = () => {
  return (
    <Link href={"/create"}>
      <div className="relative group cursor-pointer">
        <div className="absolute inset-0 group-hover:opacity-100 opacity-80 duration-200 bg-gradient-to-r from-pink-500 to-purple-800 rounded-md blur-lg"></div>
        <div className="relative bg-black rounded-md flex">
          <div className="w-full flex p-5">
            <div className="text-8xl text-purple-200/80 group-hover:text-purple-100 duration-200 w-1/3">
              <CgFolderAdd />
            </div>
            <div className="w-2/3 flex flex-col justify-center">
              <p className="text-xl duration-200 font-bold group-hover:text-white text-white/80">
                Start a New Project
              </p>
              <p className="text-sm duration-200 mt-5 pr-6 group-hover:text-white text-white/80">
                Create a fresh new project by grabbing your credentials
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StartCard;
