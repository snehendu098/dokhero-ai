import ReactMarkdown from "react-markdown";
import { useState, useEffect } from "react";

export default function Readme() {
  return (
    <div className="w-full p-5 px-10">
      <p className="font-bold text-black text-2xl">
        Want the API for your docs?
      </p>
      <p className="text-md text-gray-700 mt-5">
        Now, you can use your own model trained on your data in your app.
        Customize it whichever way you want
      </p>
      <div className="bg-purple-700 cursor-pointer mt-5 inline-block px-5 p-2">
        Explore APIs
      </div>
    </div>
  );
}
