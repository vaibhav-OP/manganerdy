import { useState } from "react"

export default function() {
    const [id, setId] = useState("");
    const [url, setUrl] = useState("");
    const [name, setName] = useState("");

    async function handleSubmit(e) {
        e.preventDefault()

        const response = await fetch(NEXT_PUBLIC_serverURL + "/admin/add-comic", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify({
                id: id,
                chapter_name: name,
                chapter_url: url
            })
        })
        .then(res => res.json())

        console.log(response)
    }
    return (
        <>
            <h1 className="text-2xl">Add Chapter</h1>
            <form onSubmit={handleSubmit}
                className="flex flex-col gap-2 mt-5">
                <input
                    type="text"
                    name="id"
                    placeholder="comic id"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className="bg-slate-200 shadow-2xl py-2 px-3 border-none outline-none"/>
                <input
                    type="text"
                    name="name"
                    placeholder="chapter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-slate-200 shadow-2xl py-2 px-3 border-none outline-none"/>
                <input
                    type="text"
                    name="url"
                    placeholder="chapter url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="bg-slate-200 shadow-2xl py-2 px-3 border-none outline-none"/>
                <input
                    type="submit"
                    className="bg-themeColor py-2 px-3 text-white mt-6"/>
            </form>
        </>
    )
}