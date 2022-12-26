import ComicContainer from "../../components/libs/comicContainer";

async function getSearchResults(query) {
    if(!query || query === " ") return [];
    const response = await fetch("http://localhost:3001/comics/search?title=" + query, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    })
    .then(res => res.json())
    .catch((error) => {
      console.log(error)
    });

    return response.data
}

export default async function({ searchParams }) {
    const comics = await getSearchResults(searchParams.title)
    
    if(comics.length === 0 || !searchParams.title) return (
        <div className="my-0 w-full lg:w-11/12 py-7 select-none mx-auto lg:px-0 px-2">
            <h1 className="font-bold text-xl mb-3 w-full">No Search Result Found</h1>
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

