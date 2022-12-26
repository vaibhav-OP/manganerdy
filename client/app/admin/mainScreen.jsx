"use client"

import AddComic from "./addComic";
import AddChapter from "./addChapter";

export default function({ page }) {
    return (
        <div className="w-full max-w-2xl">
            {page === "addPage" ?  <AddComic/> : <AddChapter/>}
        </div>
    )
}
