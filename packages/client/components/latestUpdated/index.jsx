"use client"
import { useState } from "react";

import LoadMore from "./LoadMore";
import ComicContainer from "../libs/comicContainer";

export default function LatestUpdated({ preRenderedData }) {
    const [comicArray, setComicArray] = useState(preRenderedData);

    return (
        <div className="my-0 w-full lg:w-11/12 py-7 select-none mx-auto lg:px-0 px-2">
            <h1 className="font-bold text-xl mb-3 w-full">Latest Updated</h1>
            <div className=" flex flex-wrap dark:bg-[#15202B] bg-[#f0f1f2]">
                {
                    comicArray?.map((data, index) => {
                        return <ComicContainer comic={data} key={index}/>
                    })
                }
                {(preRenderedData.length > 24) &&
                    <LoadMore setComicArray={setComicArray}/>
                }
            </div>
        </div>
    )
}
