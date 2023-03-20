import InfoCard from "@/components/Project/InfoCard";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Docs from "@/components/Project/Docs";
import Loading from "@/components/core/Loading";

const App = () => {
  const [data, setData] = useState(null);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");

  const router = useRouter();
  const { id } = router.query;

  const qahandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setAnswer("");
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          namespace: data?.namespace,
        },
        body: JSON.stringify({
          question,
        }),
      });
      const ans = await res.json();
      console.log(ans);
      setAnswer(ans?.data?.text);
      setLoading(false);
    } catch (error) {
      console.log(error);
      return toast.error("Failed to fetch data: ", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await fetch(`/api/getsingle?id=${id}`);
      const data = await res.json();
      setData(data);
      setLoading(false);
    }
    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <div className="w-full h-full flex flex-col items-center">
      {!data && loading && <Loading txt={"Loading your project"} />}
      {data && <InfoCard data={data} />}
      <div className="w-[90vw] flex relative">
        <div className="flex w-1/2 items-center top-0 left-3 absolute justify-center">
          <div className="w-[90%] flex flex-col mt-5">
            <p className="text-xl font-bold">See a demo</p>
            <p className="text-sm text-white/50">
              Ask question about the files you had provided and see if the ai
              can answer those
            </p>
            <form onSubmit={qahandler} className="flex w-full">
              <input
                placeholder="Ask Question"
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="p-2 text-black text-xl w-[80%] mr-2 rounded-md"
              />
              <button
                type="submit"
                className="p-2 text-xl bg-purple-800 rounded-md w-[20%]"
              >
                Submit
              </button>
            </form>

            {/* answer */}
            <div className="w-full bg-white mt-5 rounded-md">
              {loading && data && <Loading />}
              {answer && (
                <div className="prose p-3 text-black">
                  <ReactMarkdown className="text-black">{answer}</ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-1/2 p-2 bg-white mt-5 top-0 right-3 absolute">
          <Docs />
        </div>
      </div>
    </div>
  );
};

export default App;
