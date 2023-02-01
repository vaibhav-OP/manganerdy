"use client"

import Link from "next/link";
import { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const ChaptersDropDown = ({ name, chapters, comicId, chapterId, top=true }) => {
    const [isOpen, setIsOpen] = useState(false);

    function handleDrop(e) {
        e.preventDefault();

        setIsOpen(bool => !bool)
    }

    const li = chapters.map((chapter, index) => {
        return <li key={index}
            className="py-2 px-3 hover:bg-[#e6e6e6] w-full">
                <Link href={`/comic/${comicId}/chapter/${chapterId}/${chapter.name}`}>{chapter.name}</Link>
            </li>
    });

    const DropDownBtns = () => {
        if(top) return <>{isOpen ? <span><FaArrowUp /></span>:<span><FaArrowDown /></span>}</>;
        return <>{isOpen ? <span><FaArrowDown /></span>:<span><FaArrowUp /></span>}</>
    }

    return <div className="relative w-32 sm:w-48 gap-1 flex flex-col">
        <button className="h-fit min-h-[30px] px-3 flex justify-between items-center rounded-md bg-[#f0f1f2] font-bold cursor-pointer" onClick={handleDrop}>
            {name}
            <DropDownBtns />
        </button>
        {isOpen && <ul className={"bg-[#f0f1f2] flex rounded-md flex-col overflow-hidden w-full absolute "+ (top?"top-8":"bottom-8")}>{li}</ul>}
    </div>
}

export default ChaptersDropDown;