import React from "react";

const Loading = ({ txt }) => {
  return (
    <div className="fixed z-50 bg-black/90 top-0 right-0 left-0 bottom-0 flex flex-col justify-center items-center h-screen w-screen">
      <svg
        className="animate-spin h-[10vrem] w-[10rem] mr-3 bg-purple-800 text-white"
        viewBox="0 0 24 24"
      ></svg>
      <p className="text-2xl text-white font-bold mt-10">
        {txt || "Loading..."}
      </p>
    </div>
  );
};

export default Loading;
