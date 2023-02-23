import { TbMoodCry } from "react-icons/tb";
import { notFound } from 'next/navigation';
import ComicContainer from "../../components/libs/comicContainer";

/*
    have work on the design of NOT_RESULT_FOUND !important
*/
export default async function({ searchParams }) {
    const comics = await getSearchResults(searchParams.title)

    if(!comics) {
        notFound()
    }

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

async function getSearchResults(title) {
    const response = await fetch(process.env.NEXT_PUBLIC_serverURL + `/comics/search?title=${title}`, { cache: 'no-store' })
        .then(res => res.json())
        .catch((error) => {});

    if(!response) return undefined;
    if(response.data.length === 0) return undefined;

    return response.data
}
