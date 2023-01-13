import { useState } from "react";

export default function AddChapter({ notify }) {
    const [id, setId] = useState("");
    const [url, setUrl] = useState("");
    const [name, setName] = useState("");
    const [ isDisabled, setDisabled] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault()
        setDisabled(state => !state);
        const response = await fetch(process.env.NEXT_PUBLIC_serverURL + "/comics/chapter", {
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
        .then(res => {
            setDisabled(state => !state)
            setUrl("")
            setName("")
            notify("success", "chapter added successfully.")
        })
        .catch(error => {
            console.log(error)
            setDisabled(state => !state)
            notify("error", "something went wrong.")
        })
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
                    className="bg-slate-200 shadow-2xl py-2 px-3 border-none outline-none dark:bg-[#15202B]"
                    required/>
                <input
                    type="text"
                    name="name"
                    placeholder="chapter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-slate-200 shadow-2xl py-2 px-3 border-none outline-none dark:bg-[#15202B]"
                    required/>
                <input
                    type="text"
                    name="url"
                    placeholder="chapter url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="bg-slate-200 shadow-2xl py-2 px-3 border-none outline-none dark:bg-[#15202B]"
                    required/>
                <input
                    type="submit"
                    className="bg-themeColor py-2 px-3 text-white mt-6 disabled:bg-slate-700 hover:disabled:cursor-not-allowed"
                    value={isDisabled ? 'Sending...' : 'Send'}
                    disabled={isDisabled}/>
            </form>
        </>
    )
}