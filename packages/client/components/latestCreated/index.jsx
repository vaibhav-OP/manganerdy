"use client"
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import SlideChangerButtons from "./slideChangerButtons";

export default function LatestCreated({ latestComics }) {
    const wrapper = useRef();
    const ulElement = useRef();
    const [currentSlide, setcurrentSlide] = useState(0);

    useEffect(() => {
        const width = wrapper.current.clientWidth;
        ulElement.current.style.transform = `translateX(${-currentSlide * width}px)`;
    }, [currentSlide])

    return (
        <div className="my-0 mx-auto w-full lg:w-11/12 sm:h-[600px] h-[290px] relative select-none lg:px-0 px-2 overflow-hidden" ref={wrapper}>
            <div className="relative m-0 p-0 h-full list-none z-0 transition-all duration-300 grid grid-flow-col auto-cols-full" ref={ulElement}>
            {(latestComics.length !== 0) ? (
                latestComics?.map((comic, index) => {
                    return <ComicSlide comicData={comic} key={index}/>
                })
            ) : (
                <div className="flex justify-center items-center flex-col">
                    <h1 className="font-bold text-2xl">oops!! No Comic Found</h1>
                    <span>Please try reloading the web.</span>
                </div>
            )
            }
            </div>
            {(latestComics.length !== 0) && <SlideChangerButtons currentSlide={currentSlide} setcurrentSlide={setcurrentSlide} ulElement={ulElement}/>}
        </div>
    )
}

function ComicSlide({ comicData }) {
    return (
        <div key={comicData._id}
            className="w-full h-full bg-cover bg-no-repeat bg-center"
            style={{ backgroundImage: `url("${comicData.profilePhotoLocation}")`}}>
                <div className="relative float-left m-0 w-full h-full text-center bg-cover bg-no-repeat grid grid-cols-custom0 grid-rows-[395px] bg-black/75 backdrop-blur-md content-center">
                    <div className="w-auto h-full float-left flex">
                        <div className="w-full h-44 sm:h-full float-right relative m-auto">
                            <Link href={`/comic/${comicData._id}`}>
                                <Image
                                    fill
                                    alt={comicData.title}
                                    className="object-contain"
                                    src={comicData.profilePhotoLocation}/>
                            </Link>
                        </div>
                    </div>
                    <div className="text-white/80 flex-col justify-center row-start-1 max-w-lg m-auto text-start">
                        <Link href={`/comic/${comicData._id}`}>
                            <h1 className="font-bold sm:text-4xl text-2xl text-white mb-2">{comicData.title}</h1>
                        </Link>
                        <div className="line-clamp-5 overflow-auto"><span dangerouslySetInnerHTML={{__html: comicData.description}}/></div>
                    </div>
                </div>
        </div>
    )
}