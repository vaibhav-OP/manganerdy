"use client"
import Image from "next/image";
import { useEffect, useState } from "react";

import sunSrc from "../../../public/sun.png";
import moonSrc from "../../../public/moon.png";

export default function ThemeToggleBtn() {
	const [nextTheme, setNextTheme] = useState("Dark Mode");
	const [currentImg, setCurrectImg] = useState(sunSrc);

	function toggleTheme() {
		const bodyEl = document.body
		if(bodyEl.classList.contains("dark")) {
        	bodyEl.classList.remove("dark");

			setNextTheme("Dark Mode");
			setCurrectImg(moonSrc)

			window.localStorage.setItem("theme", "light");
		} else {
        	bodyEl.classList.add("dark");

			setNextTheme("Light Mode");
			setCurrectImg(sunSrc)

			window.localStorage.setItem("theme", "dark");
		}
	}

	useEffect(() => {
		const theme = window.localStorage.getItem("theme")

		if(theme === "dark") {
			setNextTheme("Light Mode")
			setCurrectImg(moonSrc)
		} else {
			setNextTheme("Dark Mode")
			setCurrectImg(sunSrc)
		}
	}, [])
	return <div className="flex items-center gap-1 cursor-pointer select-none" onClick={toggleTheme}>
		<Image
			src={currentImg}
			height="24"
			width="24"/>
		<span>{nextTheme}</span>
	</div>
}