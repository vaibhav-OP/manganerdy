import Link from "next/link";

import ChaptersDropDown from "./ChaptersDropDown";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function ChapterContainer({ params, children, data, currentChapter, currentChapterIndex }) {

    const NextBtn = () => {
        if (currentChapterIndex < data.chapters.length-1) {
            return <Link href={`/comic/${params.id}/chapter/${params.chapterId}/${data.chapters[currentChapterIndex+1]?.name}`}
                className="w-32 sm:w-48 h-fit flex justify-center items-center rounded-md bg-[#f0f1f2] hover:bg-[#e6e6e6] min-h-[30px] disabled:cursor-not-allowed cursor-pointer"><FaArrowRight /></Link>
        } else {
            return <div className="w-32 sm:w-48 h-fit flex justify-center items-center rounded-md bg-gray-300 min-h-[30px] cursor-not-allowed opacity-60">
                <FaArrowRight />
            </div>
        }
    }

    const PreviousBtn = () => {
        if (currentChapterIndex > 0) {
            return  <Link href={`/comic/${params.id}/chapter/${params.chapterId}/${data.chapters[currentChapterIndex-1]?.name}`}
                className="w-32 sm:w-48 h-fit flex justify-center items-center rounded-md bg-[#f0f1f2] hover:bg-[#e6e6e6] min-h-[30px] disabled:cursor-not-allowed cursor-pointer"><FaArrowLeft /></Link>
        } else {
            return <div className="w-32 sm:w-48 h-fit flex justify-center items-center rounded-md bg-gray-300 min-h-[30px] cursor-not-allowed opacity-60">
                <FaArrowLeft />
            </div>
        }
    }

    return <div className="flex flex-col gap-5">
        <div className="flex w-full gap-5 justify-center px-5 sm:px-0 ">
            <PreviousBtn />
            <ChaptersDropDown name={currentChapter.name} chapters={data.chapters} comicId={params.id} chapterId={params.chapterId}/>
            <NextBtn />
        </div>
        {children}
        <div className="flex w-full gap-5 justify-center px-5 sm:px-0 ">
            <PreviousBtn />
            <ChaptersDropDown name={currentChapter.name} chapters={data.chapters} comicId={params.id} chapterId={params.chapterId}/>
            <NextBtn />
        </div>
    </div>
}