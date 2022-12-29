"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useCallback } from "react";

import toast from "../../components/Toast";

export default function SignIn() {
    const [form, changeForm] = useState(0);

    const notify = useCallback((type, message) => {
        toast({ type, message });
    }, []);

    const handleChangeForm = () => {
        if(form === 0 ){
            changeForm(1)
        } else {
            changeForm(0)
        }
    }

    return (
        <div className='flex justify-center items-center min-h-[calc(100vh-240px)] md:flex-row flex-col-reverse md:px-0 px-5 transition-all'>
            { form === 0 ?
                <SignInForm notify={notify} handleChangeForm={handleChangeForm}/>
                :
                <SignUpForm notify={notify} handleChangeForm={handleChangeForm}/>
            }
        </div>
    )
}

function SignUpForm({ notify, handleChangeForm }) {
    const router = useRouter();
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
        <>
        <div className='md:w-1/4 w-full bg-themeColor px-8 py-14 shadow-2xl text-white items-center flex gap-10 flex-col self-stretch rounded-tl-lg rounded-bl-lg'>
            <h1 className='font-bold text-3xl text-center'>Hello, there</h1>
            <div>
                <p>Enter your details and start reading mangas with us.</p>
            </div>
            <div className='font-bold'>
                <button
                    className='uppercase border-white border py-1 px-4 rounded-lg hover:bg-white hover:text-theme transition-all'
                    onClick={handleChangeForm}>Sign In</button>
            </div>
        </div>
        <div className='flex gap-7 flex-col shadow-2xl px-8 rounded-tr-lg rounded-br-lg justify-center self-stretch dark:bg-[#15202B]'>
            <h1 className='font-bold text-3xl text-center'>Sign up</h1>
            <form onSubmit={signUp} className="gap-3 flex flex-col">
                <input
                    type="text"
                    placeholder="user name"
                    name="user_name" value={user_name}
                    onChange={(e) => setUser_name(e.target.value)}
                    className="shadow-lg outline outline-1 outline-black/20 rounded-sm px-2 py-3"/>
                <input
                    type="email"
                    placeholder="email"
                    name="email" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="shadow-lg outline outline-1 outline-black/20 rounded-sm px-2 py-3"/>
                <input
                    type="password"
                    placeholder="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="shadow-lg outline outline-1 outline-black/20 rounded-sm px-2 py-3"/>
                <input
                    type="submit"
                    value="sign up"
                    className='bg-themeColor shadow-lg text-white px-1 py-2 uppercase font-bold'/>
            </form>
        </div>
        </>
    )
}

function SignInForm({ notify, handleChangeForm }) {
    const router = useRouter();
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
        <>
        <div className='md:w-1/4 w-full bg-themeColor px-8 py-14 shadow-2xl text-white items-center flex gap-10 flex-col self-stretch rounded-tl-lg rounded-bl-lg'>
            <h1 className='font-bold text-3xl text-center'>Welcome again!</h1>
            <div>
                <p>Too keep reading your favture mangas, enter your details.</p>
            </div>
            <div className='font-bold'>
                <button
                    className='uppercase border-white border py-1 px-4 rounded-lg hover:bg-white hover:text-theme transition-all'
                    onClick={handleChangeForm}>Sign Up</button>
            </div>
        </div>
        <div className='flex gap-7 flex-col shadow-2xl px-8 rounded-tr-lg rounded-br-lg justify-center self-stretch dark:bg-[#15202B]'>
            <h1 className='font-bold text-3xl text-center'>Sign in</h1>
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
                    value="Sign in"
                    className='bg-themeColor shadow-lg text-white px-1 py-2 uppercase font-bold'/>
            </form>
        </div>
        </>
    )
}