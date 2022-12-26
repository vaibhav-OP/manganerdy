"use client"

import { useState } from "react"

export default function SignUp() {
    const [user_name, setUser_name] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function signUp(e) {
        e.preventDefault()
        try {
            const response = await fetch("http://localhost:3001/auth/sign-up", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    user_name,
                    email,
                    password,
                })
            })
            .then(res => res.json())
            if(response.status === "ok") {
                router.push("/")
                notify("success", "Successfully logged in.")
            } else {
                alert(response.error)
            }
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <div>
            <form onSubmit={signUp}>
                <input type="text" placeholder="user name" name="user_name" value={user_name} onChange={(e) => setUser_name(e.target.value)}/><br />
                <input type="email" placeholder="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/><br />
                <input type="password" placeholder="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/><br />
                <input type="submit" value="submit"/>
            </form>
        </div>
    )
}