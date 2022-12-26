import Link from "next/link";
import Image from "next/image";

import UserProfile from "./userProfile";
import SearchField from "./searchField";
import ThemeToggleBtn from "./themeToggleBtn";

export default function Navbar() {
    return (
        <div>
            <div className="w-full h-20 dark:bg-darkthemeLinearGradient bg-themeLinearGradient text-white grid grid-cols-[auto,auto,1fr,auto] items-center fixed z-10">
                <Link href={"/"} className="flex">
                    <Image
                        width={120}
                        height={72}
                        src="/logo.png"
                        alt="Apex Manga-Logo"/>
                </Link>
                <ThemeToggleBtn />
                <SearchField />
                <UserProfile />
            </div>
        </div>
    )
}