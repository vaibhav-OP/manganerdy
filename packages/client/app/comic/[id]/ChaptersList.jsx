"use client"

import { useRef } from "react";
import { CgSearch } from "react-icons/cg";


export default function ChaptersList({ chapters }) {
    const ChaptersUl = useRef(null);

    const handleSearch = (searchValue) => {
        const searchFieldValue = searchValue
                                    .trim() // removes any extra space in starting and end
                                    .replace(/[^a-zA-Z0-9]/g, " "); // removes any special characters from the string

        [...ChaptersUl.current.children].map(li => {
            let text = li.textContent
                            .trim() // removes any extra space in starting and end
                            .replace(/[^a-zA-Z0-9]/g, " "); // removes any special characters from the string

            if(text.toLowerCase().includes(searchFieldValue.toLowerCase())) {
                // important because the chapters needs to be visible again if they match.
                li.style.display = "block";
            } else {
                li.style.display = "none";
            }
        })
    }

    return  <>
        <div className='py-2 px-2 flex justify-end dark:bg-[#15202B] bg-[#f0f1f2] shadow-xl'>
            <div className='flex items-center gap-2 bg-white px-3 py-2 dark:bg-[#10171E]'>
                <div><CgSearch /></div>
                <input
                    type="text"
                    name="chapter_name"
                    id="chapter_name"
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="69"
                    className='focus-visible:outline-none dark:bg-[#10171E]'/>
            </div>
        </div>
        <ul className='mt-1 dark:bg-[#15202B] bg-[#f0f1f2] max-h-80 overflow-y-scroll scroll-smooth scrollbar-none gap-1' ref={ChaptersUl}>{chapters}</ul>
    </>
}
