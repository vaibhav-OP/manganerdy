"use client"

import AddComic from "./pages/addComic";
import AddChapter from "./pages/addChapter";

export default function MainScreen({ page, notify }) {
    return (
        <div className="w-full max-w-2xl">
            {page === "addPage" ?  <AddComic notify={notify}/> : <AddChapter notify={notify}/>}
        </div>
    )
}
