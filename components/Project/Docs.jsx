import ReactMarkdown from "react-markdown";
import { useState, useEffect } from "react";

export default function Readme() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/uploads/instructions.md");
      const data = await res.text();
      setData(data);
    }
    fetchData();
  }, []);
  return (
    <div className="w-full">
      <p className="font-bold text-black text-xl">Short Instructions for API</p>
      <div className="w-full text-black prose">
        <ReactMarkdown>{data}</ReactMarkdown>
      </div>
    </div>
  );
}
