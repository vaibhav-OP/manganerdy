"use client"
import { useRouter } from 'next/navigation';
import { useState, useCallback } from "react";

import toast from "../../../components/Toast";

export default function SignIn() {
    const router = useRouter();

    const notify = useCallback((type, message) => {
        toast({ type, message });
      }, []);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function signIn(e) {
        e.preventDefault()
        try {
            const response = await fetch("http://localhost:3001/auth/sign-in", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    email,
                    password,
                })
            })
            .then(res => res.json())

            if(response.status === "ok") {
                router.push("/")
                notify("success", "Successfully Logged In.")
            } else {
                notify("error", response.error)
            }
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <div className=''>
            <div className='flex justify-center items-center'>
                <div className='flex gap-7 flex-col shadow-2xl px-8 py-14 outline outline-1 outline-black/20 rounded-lg'>
                    <h1 className='font-bold text-3xl'>SignIn Here</h1>
                    <form onSubmit={signIn} className="gap-3 flex flex-col">
                        <input
                            type="email"
                            placeholder="Email Address"
                            name="email" value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow-lg outline outline-1 outline-black/20 rounded-sm px-2 py-3"/>
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow-lg outline outline-1 outline-black/20 rounded-sm px-2 py-3"/>
                        <input
                            type="submit"
                            value="submit"
                            className='bg-themeColor shadow-lg text-white px-1 py-2'/>
                    </form>
                </div>
            </div>
        </div>
    )
}