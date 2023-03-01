"use client"
import { useEffect, useState } from "react";

export default function ThemeToggleBtn() {
	const [nextTheme, setNextTheme] = useState("Dark Mode")

	function toggleTheme() {
		const bodyEl = document.body
		if(bodyEl.classList.contains("dark")) {
        	bodyEl.classList.remove("dark");
			setNextTheme("Dark Mode")
			window.localStorage.setItem("theme", "light");
		} else {
        	bodyEl.classList.add("dark");
			setNextTheme("Light Mode")
			window.localStorage.setItem("theme", "dark");
		}
	}

	useEffect(() => {
		const theme = window.localStorage.getItem("theme")

		if(theme === "dark") {
			setNextTheme("Light Mode")
		} else {
			setNextTheme("Dark Mode")
		}
	}, [])
	return <div className="flex items-center gap-1 cursor-pointer" onClick={toggleTheme}>
		<div
			className="h-6 w-6 my-auto rounded-full bg-cover"
			id="themeToggleBtn"/>
		<span>{nextTheme}</span>
	</div>
}