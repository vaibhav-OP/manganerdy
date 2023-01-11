"use client"

import AddComic from "./pages/addComic";
import AddChapter from "./pages/addChapter";

export default function MainScreen({ page }) {
    return (
        <div className="w-full max-w-2xl">
            {page === "addPage" ?  <AddComic/> : <AddChapter/>}
        </div>
    )
}
