"use client";

import { useEffect, useRef, useState } from "react";
import './Active.css'

export default function Images({ data }) {
    const BarsContainer = useRef(null);
    const ImageContainer = useRef(null);

    const [CurrentImageIndex, setCurrentImageIndex] = useState(0)
    // might be using the NEXT.JS image tag in future but for now i have to idea
    // how to make its height auto and width the size of container.
    const images = data?.url
                        .sort((a,b) => {return a.split("_")[0].split("/").pop()-b.split("_")[0].split("/").pop()})
                        .map((url, index) => <img src={process.env.NEXT_PUBLIC_serverURL + url} key={index} data-index-number={index} loading="lazy" className="min-h-screen"/>)

    const bars = data?.url.map((url, index) => <div className="border-r border-transparent bg-slate-600 items-stretch w-full transition-all duration-500 bars" key={index}></div>)

    // Interaction Observer
    function handleIntersection(entries) {
        entries.map((entry) => {
          if (entry.isIntersecting){
            setCurrentImageIndex(entry.target.dataset.indexNumber)
          }
        });
    }

    useEffect(() => {
        if(!BarsContainer.current.children) return;
        [...BarsContainer.current.children].forEach(child => child.classList.remove("active"))
        for(let i = 0; i <= CurrentImageIndex; i++) {
            BarsContainer.current.children[i].classList.add("active")
        }
    }, [CurrentImageIndex])

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersection);

        if(ImageContainer.current) {
            for (const child of ImageContainer.current.children) observer.observe(child);
        }

        return () => {
            if(ImageContainer.current) {
                for (const child of ImageContainer.current.children) observer.unobserve(child);
            }
        }

    }, [ImageContainer])

    return  <div className="flex">
                <div className="max-w-2xl mx-auto ImageContainer" ref={ImageContainer}>
                    {images}
                </div>
                <div className="bottom-0 w-full h-1 fixed flex gap-1" ref={BarsContainer}>
                    {bars}
                </div>
            </div>
}