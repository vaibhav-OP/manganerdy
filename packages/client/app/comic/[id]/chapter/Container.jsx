"use client"

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function ChapterContainer({ children, data, currentChapter, currentChapterIndex }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    function handlePreviousBtn(e) {
        const previousChapterName = data.chapters[currentChapterIndex-1]?.name;
        if(previousChapterName) router.push(`${pathname}?name=${previousChapterName}&id=${searchParams.get("id")}`)
    }

    function handleNextBtn(e) {
        const previousChapterName = data.chapters[currentChapterIndex+1]?.name;
        if(previousChapterName) router.push(`${pathname}?name=${previousChapterName}&id=${searchParams.get("id")}`)
    }

    return <div className="flex flex-col gap-5">
        <div className="flex w-full gap-5 justify-center px-5 sm:px-0 ">
            <button className="w-32 sm:w-48 h-fit flex justify-center items-center rounded-md bg-gray-300 min-h-[30px] disabled:cursor-not-allowed cursor-pointer" onClick={handlePreviousBtn} {...(currentChapterIndex===0 && { disabled: true })}><FaArrowLeft /></button>
            <div className="w-32 sm:w-48 h-fit flex justify-center items-center rounded-md bg-gray-300 min-h-[30px] font-bold">{currentChapter.name}</div>
            <button className="w-32 sm:w-48 h-fit flex justify-center items-center rounded-md bg-gray-300 min-h-[30px] disabled:cursor-not-allowed cursor-pointer" onClick={handleNextBtn} {...(currentChapterIndex===(data.chapters.length-1) && { disabled: true })}><FaArrowRight /></button>
        </div>
        {children}
        <div className="flex w-full gap-5 justify-center px-5 sm:px-0 ">
            <button className="w-32 sm:w-48 h-fit flex justify-center items-center rounded-md bg-gray-300 min-h-[30px] disabled:cursor-not-allowed cursor-pointer" onClick={handlePreviousBtn} {...(currentChapterIndex===0 && { disabled: true })}><FaArrowLeft /></button>
            <div className="w-32 sm:w-48 h-fit flex justify-center items-center rounded-md bg-gray-300 min-h-[30px] font-bold">{currentChapter.name}</div>
            <button className="w-32 sm:w-48 h-fit flex justify-center items-center rounded-md bg-gray-300 min-h-[30px] disabled:cursor-not-allowed cursor-pointer" onClick={handleNextBtn} {...(currentChapterIndex===(data.chapters.length-1) && { disabled: true })}><FaArrowRight /></button>
        </div>
    </div>
}