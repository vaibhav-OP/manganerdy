"use client"

import Image from "next/image";
import { useState } from "react";

import ImageSkeleton from "../../../components/libs/imageSkeleton";

export default function ComicImage({src, alt}) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isFailed, setIsFailed] = useState(false);

    return <>
            {!isLoaded && <ImageSkeleton />}
            <Image
                alt={alt}
                fill
                src={isFailed ? "/not-found.png" : src}
                className="object-cover"

                onLoad={() => setIsLoaded(true)}
                onError={() => {setIsLoaded(false); setIsFailed(true)}}
            />
        </>
}