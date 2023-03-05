import { useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";

export default function LoadMore({ setComicArray }) {
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    async function getComicData(pageNum) {
        const response = await fetch(process.env.NEXT_PUBLIC_serverURL + `/comics/latest_updated?limit=15&page=${page}`, { cache: 'no-store' })
        .then(res => res.json())
        if(!response.data) return setHasFinished(true);
        if(response.data.length < 15) setHasFinished(true);
        setIsLoading(false)
        setComicArray(oldEle => [...oldEle, ...response.data])
    }

    const handleClick = () => {
        setIsLoading(true)
        setTimeout(() => {
            getComicData(page);
            setPage(lastNum => lastNum + 1);
        }, 1000)
    }

    if(hasFinished) return;
    return (
        <div className="px-4 w-full mt-4 shadow-xl">
            <button className="disable transition-all h-8 rounded-md mb-5 mt-2 mx-auto flex text-sm w-fit px-5 justify-center dark:bg-[#213243] dark:text-slate-200 text-white bg-themeColor items-center" onClick={handleClick} disabled={isLoading}>
                { isLoading && <span className="w-fit h-fit animate-spin mr-2 text-2xl"><CgSpinnerTwo /></span> }
                <span>Load More</span>
            </button>
        </div>
    )
}