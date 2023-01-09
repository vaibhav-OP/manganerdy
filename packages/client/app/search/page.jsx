import { notFound } from 'next/navigation';

import { TbMoodCry } from "react-icons/tb";
import ComicContainer from "../../components/libs/comicContainer";

async function getSearchResults(title) {
    const response = await fetch("http://localhost:3001/comics/search?title="+title, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        next: { revalidate: 1 }
    })
    .then(res => res.json())
    .catch((error) => {
      console.log(error)
    });

    if(!response) return []
    return response.data
}

export default async function({ searchParams }) {
    if(!searchParams.title || searchParams.title == "") {
        notFound()
    };
    const comics = await getSearchResults(searchParams.title)

    if(comics.length === 0 || !searchParams.title) return (
        <div className="w-full select-none mx-auto flex flex-col justify-center items-center min-h-[calc(100vh-250px)] gap-2">
            <div className="text-9xl"><TbMoodCry /></div>
            <div className="text-center">
                <h1 className="font-bold text-xl w-full">sorry, we couldn't find any results</h1>
                <span>Try searching something else</span>
            </div>
        </div>
    )
    return (
        <div className="my-0 w-full lg:w-11/12 py-7 select-none mx-auto lg:px-0 px-2">
            <h1 className="font-bold text-xl mb-3 w-full">Search Result</h1>
            <div className=" flex flex-wrap dark:bg-[#15202B] bg-[#f0f1f2]">
                {comics?.map((comic, index) => {
                    return <ComicContainer comic={comic} key={index}/>
                })}
            </div>
        </div>
    )
}

