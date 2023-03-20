import ProjectCard from "@/components/Home/ProjectCard";
import StartCard from "@/components/Home/StartCard";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await fetch("/api/getInstances");
      const data = await res.json();
      setData(data);
      setLoading(false);
    }

    fetchData();
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Head>
        <title>DokHero</title>
        <meta
          name="description"
          content="Revolutionize your software documentation"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid grid-cols-2 w-[90vw] p-10">
        <StartCard />
      </div>
      {data.length !== 0 && (
        <div className="w-[90%] p-10">
          <p className="text-4xl font-bold mb-5">Your Projects</p>
          {loading && (
            <svg
              class="animate-spin h-5 w-5 mr-3 bg-purple-800"
              viewBox="0 0 24 24"
            ></svg>
          )}
          {data.map((project, index) => (
            <ProjectCard
              key={index}
              name={project?.name}
              namespace={project?.namespace}
              id={project?.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired();
