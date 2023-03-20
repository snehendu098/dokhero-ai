import FolderDragnDrop from "@/components/Project/FolderDragnDrop";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function Project() {
  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  async function onDrop(acceptedFiles) {
    let docs = [];
    setLoading(true);
    await acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const binaryStr = reader.result;
        docs.push({ docs: binaryStr, metadata: file?.path });
      };
      reader.readAsBinaryString(file);
    });
    setLoading(false);
    return setData(docs);
  }

  async function ingestData() {
    if (data.length === 0 && !loading) return toast.error("Select folder");
    else if (data.length !== 0 && loading) return toast.error("Loading...");

    setLoading(true);
    const res = await fetch("/api/ingest", {
      method: "POST",
      body: JSON.stringify({
        data: data,
        namespace: `${name
          ?.replace(" ", "")
          ?.trim()
          ?.toLowerCase()
          ?.toString()}|${Date.now()}`,
        name,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await res.json();
    setLoading(false);
    console.log("data", response);
  }

  return (
    <div className="w-full h-full grid grid-cols-4  p-10 ">
      <div className="col-span-3 px-10">
        <FolderDragnDrop onDrop={onDrop} />
      </div>
      <div className="col-span-1 px-10">
        <input
          type="text"
          className="bg-white p-3 text-md text-blue-gray-800 w-full mb-2  rounded-md focus:outline-none"
          placeholder="Name your project"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div
          onClick={ingestData}
          className="bg-gradient-to-r from-pink-700 to bg-purple-800 text-center cursor-pointer p-3 rounded-md capitalize font-bold"
        >
          Train
        </div>
        {loading && <p>Loading</p>}
      </div>
    </div>
  );
}
export const getServerSideProps = withPageAuthRequired();
