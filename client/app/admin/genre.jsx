import { useRef, useState } from "react";
import { RiCloseCircleFill } from "react-icons/ri"

export default function({ genre, setGenre }) {
    const [newValue, setNewValue] = useState("");

    function handleKeyDown(e) {
        if(e.key !== "Enter" || newValue === "") return;
        let newTag = newValue.trim().charAt(0).toUpperCase() + newValue.trim().slice(1)

        if(genre.includes(newTag)) return;

        setGenre(old => [...old, newTag]);
        setNewValue("");
    }

    function handleRemove(e, parentRef){
        e.preventDefault()
        const tag = parentRef.current.getAttribute("id")

        const newGenre = genre.filter((genre) => genre !== tag);
        setGenre(newGenre);
    }

    return (
        <div className="inline-flex flex-col gap-2 bg-slate-200 shadow-2xl py-2 px-3">
            <div className="gap-1 flex flex-row flex-wrap">
                { genre?.map((tag, index) => (
                    <GenreSpan tag={tag} handleRemove={handleRemove} key={index}/>
                ))}
            </div>
            <input
                type="text"
                name="genre"
                placeholder="enter the genre"
                className="w-full bg-transparent border-none outline-none"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                onKeyDown={handleKeyDown}/>
        </div>
    )
}

function GenreSpan({tag, handleRemove}) {
    const parentRef = useRef(null)

    return (
        <span className="bg-white rounded-lg w-fit px-2 flex dark:text-black" ref={parentRef} id={tag}>
            <button type="button" onClick={(e) => handleRemove(e, parentRef)} className="mr-1"><RiCloseCircleFill /></button>{tag}
        </span>
    )
}
