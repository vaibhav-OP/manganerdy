"use client"
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import ImageSkeleton from "../libs/imageSkeleton";
import NotFoundImage from "../../public/not-found.png";
import SlideChangerButtons from "./slideChangerButtons";

export default function LatestCreated({ latestComics }) {
    const wrapper = useRef();
    const ulElement = useRef();
    const [currentSlide, setcurrentSlide] = useState(0);
    const [touchPosition, setTouchPosition] = useState(null)

    const handleTouchStart = (e) => {
        const touchDown = e.touches[0].clientX
        setTouchPosition(touchDown)
    }

    const handleTouchMove = (e) => {
        const touchDown = touchPosition

        if(touchDown === null) {
            return
        }

        const currentTouch = e.touches[0].clientX
        const diff = touchDown - currentTouch

        // to move the slider to the left which is to the preveous slide
        if (diff < -5) {
            if(!ulElement.current) return;

            if(currentSlide == 0){
                setcurrentSlide(ulElement.current.childElementCount-1);
            } else {
                setcurrentSlide(currentSlide => currentSlide - 1);
            }
        }

        // to move the slider to the right which is to the next slide
        if (diff > 5) {
            if(!ulElement.current) return;

            if(ulElement.current.childElementCount-1 == currentSlide){
                setcurrentSlide(0);
            } else {
                setcurrentSlide(currentSlide => currentSlide + 1);
            }
        }

        setTouchPosition(null)
    }

    useEffect(() => {
        const width = wrapper.current.clientWidth;
        ulElement.current.style.transform = `translateX(${-currentSlide * width}px)`;
    }, [currentSlide])
    return (
        <div className="h-80 w-full lg:w-11/12 mx-auto lg:px-0 px-2 overflow-hidden relative select-none" ref={wrapper}>
            <div className="h-full flex relative transition-all duration-300"
                ref={ulElement}
                onTouchMove={handleTouchMove}
                onTouchStart={handleTouchStart}>
            {latestComics?.map((comic, index) => {
                return <Slide comic={comic} key={index}/>
            })}
            </div>
            {(latestComics.length !== 0) && <SlideChangerButtons currentSlide={currentSlide} setcurrentSlide={setcurrentSlide} ulElement={ulElement}/>}
        </div>
    )
}

function Slide({ comic }) {
    const [isFailed, setIsFailed] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    return <div className="bg-no-repeat bg-cover bg-center w-full h-full relative shrink-0 text-white sm:mr-0 mr-4"
                style={{ backgroundImage: `url("${process.env.NEXT_PUBLIC_serverURL + comic.profilePhotoLocation}")`}}>
                    <div className="h-full backdrop-blur-sm px-5 py-6 flex gap-4 items-center bg-gradient-to-tr from-black to-black/40">
                        <div className="h-56 min-w-[176px] relative rounded-md overflow-hidden">
                            <Link href={`/comic/${comic._id}`}>
                                {!isLoaded && <ImageSkeleton />}
                                <Image
                                    alt={comic.title}
                                    height="224"
                                    width="176"
                                    className="rounded-md object-cover h-56"
                                    src={isFailed ? NotFoundImage : process.env.NEXT_PUBLIC_serverURL + comic.profilePhotoLocation}
                                    onLoad={() => setIsLoaded(true)}
                                    onError={() => {setIsLoaded(false); setIsFailed(true)}}
                                />
                            </Link>
                        </div>
                        <div className="h-full flex flex-col justify-between py-5">
                            <div className="flex flex-col gap-2">
                                <Link href={`/comic/${comic._id}`}>
                                    <h2 className="text-xl line-clamp-6 lg:text-3xl lg:line-clamp-3 font-bold">{comic.title}</h2>
                                </Link>
                                <div className="line-clamp-5">
                                    <span className="hidden md:block font-normal text-base text-white/90" dangerouslySetInnerHTML={{__html: comic.description}}/>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg italic">{comic.authorName}</h3>
                            </div>
                        </div>
                    </div>
            </div>
}
