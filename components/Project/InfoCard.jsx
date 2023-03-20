import React from "react";
import { BiCopy } from "react-icons/bi";
import { toast } from "react-toastify";

const InfoCard = ({ data }) => {
  const { name, namespace } = data;
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(namespace);
      return toast.success("Copied to clipboard");
    } catch (err) {
      return toast.error("Failed to copy text: ", err);
    }
  };
  return (
    <div className="w-[90vw] mt-10 bg-purple-800 flex items-center justify-between text-white p-5 rounded-md">
      <p className="font-bold text-xl">{name}</p>
      <div className="flex items-center justify-center">
        <p>{namespace && namespace[0] + namespace[1] + "*".repeat(5)}</p>
        <p
          onClick={handleCopy}
          className="text-lg ml-3 hover:text-blue-500 duration-200"
        >
          <BiCopy />
        </p>
      </div>
    </div>
  );
};

export default InfoCard;
