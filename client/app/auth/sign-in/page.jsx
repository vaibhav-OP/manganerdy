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
        <div>
            <form onSubmit={signIn}>
                <input type="email" placeholder="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/><br />
                <input type="password" placeholder="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/><br />
                <input type="submit" value="submit"/>
            </form>
        </div>
    )
}