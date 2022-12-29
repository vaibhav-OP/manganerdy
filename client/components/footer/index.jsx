import Image from "next/image"
export default function Footer() {
    return(
        <div className="w-full text-white dark:bg-darkthemeLinearGradient bg-themeLinearGradient transition-colors">
            <div>
                <Image
                    width={168}
                    height={120}
                    src="/logo.png"
                    alt="Apex Manga - Logo"/>
            </div>
            <div className="flex flex-col gap-2 py-3">
                <hr className="w-11/12 mx-auto border-0 h-0 border-t-[#8c8c8c] border-t-[1px] border-solid"/>
                <div className="mx-auto"><span>made with ❤️</span></div>
            </div>
        </div>
    )
}