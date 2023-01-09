"use client"
import { useState } from "react";
import { useRouter } from 'next/navigation';

import GenreField from "./formFlields/genre";

export default function() {
    const router = useRouter()

    const [ title, setTitle ] = useState("");
    const [ autherName, setAutherName ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ coverPageURL, setCoverPageURL ] = useState("");

    const [ genre, setGenre ] = useState([]);

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await fetch("http://localhost:3001/admin/comic", {
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
                className="flex flex-col gap-2 mt-5">
                <input
                    type="text"
                    name="title"
                    placeholder="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-slate-200 shadow-2xl py-2 px-3 border-none outline-none"/>
                <textarea
                    name="description"
                    placeholder="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="bg-slate-200 shadow-2xl py-2 px-3 h-28 border-none outline-none"/>
                <input
                    type="text"
                    name="cover_image"
                    placeholder="cover image url"
                    value={coverPageURL}
                    onChange={(e) => setCoverPageURL(e.target.value)}
                    className="bg-slate-200 shadow-2xl py-2 px-3 border-none outline-none"/>
                <input
                    type="text"
                    name="author_name"
                    placeholder="author name"
                    value={autherName}
                    onChange={(e) => setAutherName(e.target.value)}
                    className="bg-slate-200 shadow-2xl py-2 px-3 border-none outline-none"/>
                <div className="flex flex-col w-full">
                    <h6 className="text-xl">Genre</h6>
                    <GenreField setGenre={setGenre} genre={genre}/>
                </div>
                <input
                    type="submit"
                    className="bg-themeColor py-2 px-3 text-white mt-6"/>
            </form>
        </>
    )
}
