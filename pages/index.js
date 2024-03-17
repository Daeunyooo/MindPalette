import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Home() {
  const [newsData, setNewsData] = useState([]);
  const [textData, setTextData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSpinning, setIsSpinning] = useState(true);
  const router = useRouter();

  useEffect(() => {
    router.push('/screen');
    const fetchData = async () => {
      try {
        const supabase_response = await fetch("/api/supabase", {method:'GET'});
        if (supabase_response.ok) {
          const supabaseJsonData = await supabase_response.json();
          setTextData(supabaseJsonData);
        } else {
          // Handle the error here
          console.error("Error fetching Supabase data:", supabase_response.status);
        }
      } catch (error) {
        // Handle any other errors that may occur
        console.error("Error:", error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }
  return <>
    <h1
      className={`${
        isSpinning ? "animate-spinY" : ""
      } text-center p-10 pb-5 text-4xl font-bold`}
      onClick={() => setIsSpinning(!isSpinning)}
    >
      project anywhere
    </h1>
    <h2 className="text-2xl text-center font-bold">
      {new Date()
        .toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })
        .toLowerCase()}
    </h2>
    <Link href="/screen">
      <h1 className = "text-center text-blue-800">screen</h1>
    </Link>

    <div className="flex justify-between">
      <div className="pl-10">
        <h3 className="text-xl font-bold">Notes to self</h3>
        <ul className="list-disc list-inside">
          {textData.map((item, index) => (
            <li key={index}>{item.content}</li>
          ))}
        </ul>
      </div>
      <div className="pr-10">
        <h3 className="text-xl font-bold">Todo</h3>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      {newsData.map((feed, index) => (
        <div key={index} className="pt-10 pl-10">
          <h4 className="text-lg font-bold">{feed.name}</h4>
          {feed.titles.map((title, titleIndex) => (
            <ul className="list-disc list-inside" key={titleIndex}>
              <li>
                <a
                  href={title.link}
                  className="text-black hover:text-blue-500 no-underline"
                >
                  {title.title}
                </a>
              </li>
            </ul>
          ))}
        </div>
      ))}
    </div>

  </>;
}
