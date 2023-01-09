"use client"
import { useState } from "react";

export default function AdminLogin({ setAdmin, notify }) {
    const [user_name, setUser_name] = useState("");
    const [user_passwd, setUser_passwd] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:3001/admin/verify?user_name=${user_name}&user_passwd=${user_passwd}`, {
            method: "GET"
        })

        if(response.status == 200) {
            notify("success", "Successfully logged in.")
            setAdmin(true)
        } else {
            notify("error", "Credentials are wrong.")
        };

    }

    return (
        <div className="flex gap-7 flex-col px-8 rounded-tr-lg rounded-br-lg justify-center dark:bg-[#15202B] min-h-[calc(100vh-240px)]">
            <form onSubmit={handleSubmit} className="gap-3 flex flex-col max-w-xl self-center">
                <input
                    type="text"
                    placeholder="user name"
                    name="user_name" value={user_name}
                    onChange={(e) => setUser_name(e.target.value)}
                    className="shadow-lg outline outline-1 outline-black/20 rounded-sm px-2 py-3"/>
                <input
                    type="password"
                    placeholder="password"
                    name="password"
                    value={user_passwd}
                    onChange={(e) => setUser_passwd(e.target.value)}
                    className="shadow-lg outline outline-1 outline-black/20 rounded-sm px-2 py-3"/>
                <input
                    type="submit"
                    value="log in"
                    className='bg-themeColor shadow-lg text-white px-1 py-2 uppercase font-bold'/>
            </form>
        </div>
    )
}