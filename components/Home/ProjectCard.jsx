import Link from "next/link";
import React from "react";
import { BiCopy } from "react-icons/bi";
import { toast } from "react-toastify";

const ProjectCard = ({ name, namespace, id }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(namespace);
      return toast.success("Copied to clipboard");
    } catch (err) {
      return toast.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="relative group mb-5">
      <div className="absolute inset-0 group-hover:opacity-100 opacity-80 duration-200 bg-gradient-to-r from-gray-600 to-gray-700 rounded-md blur-lg"></div>
      <div className="relative bg-white text-black rounded-md flex">
        <div className="w-full flex items-center justify-between p-5">
          <Link href={`/projects/${id}`}>
            <p className="text-2xl hover:text-blue-500 cursor-pointer duration-200">
              {name}
            </p>
          </Link>
          <div className="flex items-center justify-center">
            <p>{namespace[0] + namespace[1] + "*".repeat(5)}</p>
            <p
              onClick={handleCopy}
              className="text-lg ml-3 hover:text-blue-500 duration-200"
            >
              <BiCopy />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
