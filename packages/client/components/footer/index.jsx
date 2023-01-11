import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return(
        <div className="w-full text-white dark:bg-darkthemeLinearGradient bg-themeLinearGradient transition-colors">
            <div className="flex flex-col items-center">
                <Image
                    width={168}
                    height={120}
                    src="/logo.png"
                    alt="Apex Manga - Logo"/>
                <ul className="flex font-poppin">
                <li className="my-3 mx-5"><Link href="/">Home</Link></li>
                    <li className="my-3 mx-5"><Link href="/dmca">DMCA</Link></li>
                    <li className="my-3 mx-5"><Link href="/privacy-policy">Privacy Policy</Link></li>
                </ul>
            </div>
            <div className="flex flex-col gap-2 py-3 opacity-50 items-center px-2 text-center">
                <p>All the comics on this website are only previews of the original comics, there may be many language errors, character names, and story lines. For the original version, please buy the comic if it&apos;s available in your city.</p>
                <p>© Apexmanga.com</p>
            </div>
        </div>
    )
}