"use client"
import { useState } from "react";
import { CgSearch } from "react-icons/cg";

export default function ChapterSearchForm() {
    const [searchValue, setSearchValue] = useState("");

    function handleSearch(e) {
        e.preventDefault();

        // removes any extra spaces at starting and ending.
        const value = searchValue.trim();

        // checks if searched chapter string has chapter word init.
        // if search string includes chapter word it searches the value as it is
        // or else it adds Chapter-{num} to the location href
        if(value.toLocaleLowerCase().includes("chapter")) return location.href = `#${value}`;
        location.href = `#Chapter-${value}`;
    }
    return (
        <form className='flex items-center gap-2 bg-white px-3 py-2 dark:bg-[#10171E]' onSubmit={handleSearch}>
            <div><CgSearch /></div>
            <input
                type="text"
                name="chapter_name"
                id="chapter_name"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="ex. chapter 69"
                className='focus-visible:outline-none dark:bg-[#10171E]'/>
        </form>
    )
}