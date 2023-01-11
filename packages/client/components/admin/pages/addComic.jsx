"use client"
import { useRef, useState } from "react";
import { useRouter } from 'next/navigation';

import GenreField from "./formFlields/genre";

export default function AddComic() {
    const router = useRouter();

    const formRef = useRef(null)

    const [ title, setTitle ] = useState("");
    const [ genre, setGenre ] = useState([]);
    const [ autherName, setAutherName ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ coverPageURL, setCoverPageURL ] = useState("");
    const [ isDisabled, setDisabled] = useState(false);

    function handleClick(e) {
        if(title == "" || autherName == "" || description == "" || coverPageURL == "") return;
        if (isDisabled) {
            return;
        }

        formRef.current.requestSubmit();
        setDisabled(true)
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await fetch(process.env.NEXT_PUBLIC_serverURL + "/admin/comic", {
            method: "POST",
            body: JSON.stringify({
                title,
                autherName,
                description,
                coverPageURL,
                genre
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
        .catch((error) => {
            console.log(error)
        });

        if(response.status === "ok") {
            router.push(`/comic/${response.data}`)
        } else {
            console.log("Error")
            console.log(response.error);
        }
    }

    return (
        <>
            <h1 className="text-2xl">Add Comic</h1>
            <form onSubmit={handleSubmit}
                className="flex flex-col gap-2 mt-5"
                ref={formRef}>
                <input
                    type="text"
                    name="title"
                    placeholder="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value.trim())}
                    className="bg-slate-200 shadow-2xl py-2 px-3 border-none outline-none"
                    required/>
                <textarea
                    name="description"
                    placeholder="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value.trim())}
                    className="bg-slate-200 shadow-2xl py-2 px-3 h-28 border-none outline-none"
                    required/>
                <input
                    type="text"
                    name="cover_image"
                    placeholder="cover image url"
                    value={coverPageURL}
                    onChange={(e) => setCoverPageURL(e.target.value.trim())}
                    className="bg-slate-200 shadow-2xl py-2 px-3 border-none outline-none"
                    required/>
                <input
                    type="text"
                    name="author_name"
                    placeholder="author name"
                    value={autherName}
                    onChange={(e) => setAutherName(e.target.value.trim())}
                    className="bg-slate-200 shadow-2xl py-2 px-3 border-none outline-none"
                    required/>
                <div className="flex flex-col w-full">
                    <h6 className="text-xl">Genre</h6>
                    <GenreField setGenre={setGenre} genre={genre}/>
                </div>
                <input
                    type="submit"
                    onClick={handleClick}
                    className="bg-themeColor py-2 px-3 text-white mt-6 disabled:bg-slate-700 hover:disabled:cursor-not-allowed"
                    value={isDisabled ? 'Sending...' : 'Send'}
                    disabled={isDisabled}/>
            </form>
        </>
    )
}
