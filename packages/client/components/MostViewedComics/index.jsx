"use client"
import Link from "next/link";
import Image from "next/image";
import { useRef, useState, use } from "react";

import ImageSkeleton from "../libs/imageSkeleton";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight  } from "react-icons/md";

function ComicContainer({ comic }) {
    const [isLoaded, setIsLoaded] = useState(false);
    return (
        <div className="w-[150px] snap-start">
            <div className="rounded-md shadow-xl overflow-hidden h-[197px] w-[150px] hover:cursor-pointer relative">
                <Link href={`/comic/${comic._id}`}>
                    {!isLoaded && <ImageSkeleton />}
                    <Image
                        src={comic.profilePhotoLocation}
                        fill
                        alt={comic.title}
                        onLoad={() => setIsLoaded(true)}
                    />
                </Link>
            </div>
            <Link href={`/comic/${comic._id}`}>
                <h6 className="font-medium text-gray-900 dark:text-white/80 mt-2 line-clamp-1 hover:cursor-pointer">{comic.title}</h6>
            </Link>
        </div>
    )
}

export default function({ mostViewedComics }) {
    const wrapperUl = useRef(0);

    function moveRight() {
        wrapperUl.current.scrollBy({
            left: 10,
            behavior: 'smooth'
        })
    }

    function moveLeft() {
        wrapperUl.current.scrollBy({
            left: -10,
            behavior: 'smooth'
        })
    }

    const comics = mostViewedComics?.map((data, index) => { return <ComicContainer comic={data} key={index}/> })

    return (
        <div className="my-0 mx-auto w-full lg:w-11/12 pt-7 select-none lg:px-0 px-2 relative">
            <div className="mb-3 flex">
                <h1 className="font-bold text-xl">Most Viewed this week</h1>
                <div className="flex text-xl">
                    <div className="w-10 h-8 flex justify-center items-center transition-all duration-300 text-gray-800 hover:text-black dark:text-slate-400 dark:hover:text-white hover:cursor-pointer hover:scale-150" onClick={moveLeft}><MdOutlineKeyboardArrowLeft /></div>
                    <div className="w-10 h-8 flex justify-center items-center transition-all duration-300 text-gray-800 hover:text-black dark:text-slate-400 dark:hover:text-white hover:cursor-pointer hover:scale-150" onClick={moveRight}><MdOutlineKeyboardArrowRight /></div>
                </div>
            </div>
            <div className="flex overflow-x-auto gap-5 noScrollBar overscroll-contain snap-x snap-mandatory" ref={wrapperUl}>{comics}</div>
        </div>
    )
}