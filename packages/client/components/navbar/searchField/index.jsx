"use client"
import { useRouter } from "next/navigation";

export default function SearchBar() {
    const router = useRouter();

    function handleSubmit(e) {
        if(e.key !== "Enter") return;
        let searchValue = e.target.value;
        let value = searchValue.trim();

        if(value === "") return router.push("/");
        router.push("/search?title=" + value);
    }

    return <div className="flex text-white px-3 h-[40px]">
        <input
            className="px-3 outline-none bg-[#3c3d4f] rounded-md w-full placeholder:text-slate-400"
            type="text"
            placeholder="Search Comic"
            onKeyDown={handleSubmit} />
    </div>;
}