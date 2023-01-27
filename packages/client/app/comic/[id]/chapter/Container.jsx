"use client"
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useSearchParams, usePathname } from 'next/navigation';

export default function ChapterContainer({ children, data, currentChapter, currentChapterIndex }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const NextBtn = () => {
        if (currentChapterIndex < data.chapters.length-1) {
            return <Link href={`${pathname}?name=${data.chapters[currentChapterIndex+1]?.name}&id=${searchParams.get("id")}`}
                className="w-32 sm:w-48 h-fit flex justify-center items-center rounded-md bg-gray-300 min-h-[30px] disabled:cursor-not-allowed cursor-pointer"><FaArrowRight /></Link>
        } else {
            return <div className="w-32 sm:w-48 h-fit flex justify-center items-center rounded-md bg-gray-300 min-h-[30px] cursor-not-allowed opacity-60">
                <FaArrowRight />
            </div>
        }
    }

    const PreviousBtn = () => {
        if (currentChapterIndex > 0) {
            return  <Link href={`${pathname}?name=${data.chapters[currentChapterIndex-1]?.name}&id=${searchParams.get("id")}`}
                className="w-32 sm:w-48 h-fit flex justify-center items-center rounded-md bg-gray-300 min-h-[30px] disabled:cursor-not-allowed cursor-pointer"><FaArrowLeft /></Link>
        } else {
            return <div className="w-32 sm:w-48 h-fit flex justify-center items-center rounded-md bg-gray-300 min-h-[30px] cursor-not-allowed opacity-60">
                <FaArrowLeft />
            </div>
        }
    }

    return <div className="flex flex-col gap-5">
        <div className="flex w-full gap-5 justify-center px-5 sm:px-0 ">
            <PreviousBtn />
            <div className="w-32 sm:w-48 h-fit flex justify-center items-center rounded-md bg-gray-300 min-h-[30px] font-bold">{currentChapter.name}</div>
            <NextBtn />
        </div>
        {children}
        <div className="flex w-full gap-5 justify-center px-5 sm:px-0 ">
            <PreviousBtn />
            <div className="w-32 sm:w-48 h-fit flex justify-center items-center rounded-md bg-gray-300 min-h-[30px] font-bold">{currentChapter.name}</div>
            <NextBtn />
        </div>
    </div>
}