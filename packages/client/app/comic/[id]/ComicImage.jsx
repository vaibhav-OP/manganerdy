"use client"

import Image from "next/image";
import { useState } from "react";

import NotFoundImage from "../../../public/not-found.png";
import ImageSkeleton from "../../../components/libs/imageSkeleton";

export default function ComicImage({src, alt}) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isFailed, setIsFailed] = useState(false);

    return <>
            {!isLoaded && <ImageSkeleton />}
            <Image
                alt={alt}
                fill
                src={isFailed ? NotFoundImage : src}
                className="object-cover"

                onLoad={() => setIsLoaded(true)}
                onError={() => {setIsLoaded(false); setIsFailed(true)}}
            />
        </>
}