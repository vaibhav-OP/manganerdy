"use client"
import { useState } from "react";
import { CgSearch } from "react-icons/cg";

export default function() {
    const [searchValue, setSearchValue] = useState("");

    function handleSearch(e) {
        e.preventDefault();
        const value = searchValue.trim()
        if(value.includes("chapter")) return location.href = `#${value}`;
        location.href = `#chapter%20${value}`;
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