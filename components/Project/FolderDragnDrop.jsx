import React from "react";
import Dropzone from "react-dropzone";
import { BsFolderFill } from "react-icons/bs";

const FolderDragnDrop = ({ onDrop }) => {
  return (
    <Dropzone onDrop={onDrop}>
      {({ getRootProps, getInputProps }) => (
        <section className="relative cursor-pointer ">
          <div className="absolute inset-0 group-hover:opacity-100 opacity-80 duration-200 bg-gradient-to-r from-pink-500 to-purple-800 rounded-md blur-md"></div>

          <div
            className="relative p-3 px-10 bg-black min-h-[30vh] flex flex-col items-center justify-center rounded-md"
            {...getRootProps()}
          >
            <input
              {...getInputProps()}
              directory=""
              webkitdirectory=""
              type="file"
            />
            <p className="text-8xl text-white/80">
              <BsFolderFill />
            </p>
            <p className="mt-3">Add Folder</p>
          </div>
        </section>
      )}
    </Dropzone>
  );
};

export default FolderDragnDrop;
