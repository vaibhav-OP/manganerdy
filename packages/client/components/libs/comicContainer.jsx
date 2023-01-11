"use client"
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { FiUsers } from "react-icons/fi";
import ImageSkeleton from "./imageSkeleton";
import { IoMdPricetag } from "react-icons/io";

export default function ComicContainer({ comic }) {
    const [isLoaded, setIsLoaded] = useState(false);

    if(!comic) return;
    return (
        <div className="flex flex-row sm:w-[350px] w-full gap-2 p-3">
            <div className="relative w-[120px] h-[167px] shadow-2xl hover:cursor-pointer rounded-lg overflow-hidden">
                <Link href={`/comic/${comic._id}`}>
                    {!isLoaded &&<ImageSkeleton />}
                    <Image
                        src={comic.profilePhotoLocation}
                        alt={comic.title}
                        fill
                        onLoad={() => setIsLoaded(true)}
                    />
                </Link>
            </div>
            <div className="sm:w-2/4 w-[calc(100%-120px)] font-poppin text-[#242424] dark:text-white/80 flex flex-col justify-between">
                <Link href={`/comic/${comic._id}`}>
                    <h6 className="font-bold text-base w-full overflow-hidden whitespace-nowrap text-ellipsis hover:cursor-pointer">{comic.title}</h6>
                </Link>
                <div className="text-sm flex gap-1 flex-col">
                    <div className="flex items-center gap-1">
                        <IoMdPricetag />
                        {
                        comic.genre?.map((tag, index) => {
                            return <Link className="overflow-hidden whitespace-nowrap text-ellipsis" key={index} href={"/search?genre="+tag}>{tag}</Link>
                        })
                        }
                    </div>
                    <div className="flex items-center gap-1 font-bold">
                        <FiUsers />
                        <div className="overflow-hidden whitespace-nowrap text-ellipsis"><span>{comic.authorName}</span></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
