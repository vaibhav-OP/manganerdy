"use client"

import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

import ThemeToggleBtn from "./themeToggleBtn";
import UserProfile from "./userProfile";

export default function Navbar() {
    const [searchValue, setSearchValue] = useState("");
    const router = useRouter();

    const checkLastTheme = () => {
        const theme = window.localStorage.getItem("theme");

        if(theme == "dark") return document.body.classList.add("dark");
    };

    useEffect(() => {
        checkLastTheme()
    }, []);

    function handleChange(e) {
        setSearchValue(e.target.value);
    }

    function handleSubmit(e) {
        if(e.key !== "Enter") return;
        let value = searchValue.trim();

        if(value === "") return router.push("/");
        router.push("/search?title=" + value);
    }
    return (
        <div>
            <div className="w-full h-20 dark:bg-darkthemeLinearGradient bg-themeLinearGradient text-white grid grid-cols-[auto,auto,1fr,auto] items-center fixed z-10">
                <Link href="/" className="cursor-pointer flex">
                    <Image
                        width={120}
                        height={72}
                        src="/logo.png"
                        alt="Apex Manga - Logo"/>
                </Link>
                <ThemeToggleBtn />
                <div className="flex text-white px-3 h-[40px]">
                    <input
                        className="px-3 outline-none bg-[#3c3d4f] rounded-md w-full placeholder:text-slate-400"
                        type="text"
                        value={searchValue}
                        onChange={handleChange}
                        placeholder="Search Comic"
                        onKeyDown={handleSubmit}/>
                </div>
                <UserProfile />
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"/>
        </div>
    )
}
