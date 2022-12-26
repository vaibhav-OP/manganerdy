"use client"
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";

import toast from "../../Toast";

export default function() {
    const notify = useCallback((type, message) => {
        toast({ type, message });
      }, []);

    const [user, setUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    function handleToggle() {
        setIsOpen(isOpen => !isOpen)
    }

    async function fetchUserData() {
        const response = await fetch("http://localhost:3001/auth/verify", {
            method: "GET",
            credentials: "include"
        })
        .then(res => res.json())

        if(response.status == "ok") return response.data;
    }

    async function handleSignOut(e) {
        const response = await fetch("http://localhost:3001/auth/sign-out", {
            method: "GET",
            credentials: 'include'
        })
        .then(res => res.json())

        if(response.status === "ok") {
            setUser(null)
            setIsOpen(isOpen => !isOpen)
            notify("success", "Successfully Signed Out.")
        }
    }

    useEffect(() => {
        fetchUserData()
        .then(user => {
            setUser(user)
        })
        .catch(err => {
            console.error("User not found.")
        })
    }, [])

    return (
        <div className="inline">
            <a onClick={handleToggle}>
                <div className="flex h-11 w-11 rounded-full bg-slate-400 mr-9 ml-3 cursor-pointer relative overflow-hidden">
                    <Image
                        alt="user profile"
                        src="/default.jpg"
                        fill
                    />
                </div>
                </a>
            {isOpen && <UserContainer user={user} handleSignOut={handleSignOut} handleToggle={handleToggle}/>}
        </div>
    )
}

function UserContainer({ user, handleSignOut, handleToggle }) {
    function preventDefault(e) {
        e.preventDefault()
        handleToggle()
    }
    return (
        <div className="absolute h-auto w-40 bg-white z-50 top-[70px] shadow-2xl rounded-md text-black block right-8 p-3 select-none" onClick={preventDefault}>
            {
            user ?
                <ul>
                    <li><Link href="/dashboard"><span>Dashboard</span></Link></li>
                    <hr />
                    <li><button onClick={handleSignOut}>Sign Out</button></li>
                </ul>
                :
                <ul className="gap-2">

                    <li><Link href="/auth/sign-in"><span>Sign In</span></Link></li>
                    <hr />
                    <li><Link href="/auth/sign-up"><span>Sign Up</span></Link></li>
                </ul>
            }
        </div>
    )
}