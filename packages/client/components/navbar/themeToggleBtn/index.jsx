export default function ThemeToggleBtn() {
	function toggleTheme() {
		const bodyEl = document.body
		if(bodyEl.classList.contains("dark")) {
        	bodyEl.classList.remove("dark");
			window.localStorage.setItem("theme", "light");
		} else {
        	bodyEl.classList.add("dark");
			window.localStorage.setItem("theme", "dark");
		}
	}
	return(
		<div
			className="h-11 w-11 my-auto rounded-full bg-cover hover:cursor-pointer"
			onClick={toggleTheme}
			id="themeToggleBtn"/>
	)
}