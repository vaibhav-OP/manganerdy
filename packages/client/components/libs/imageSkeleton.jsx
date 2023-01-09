import { AiOutlineLoading } from "react-icons/ai"
export default function() {
    return (
        <div className="w-full h-full absolute bg-slate-400 flex justify-center items-center">
            <AiOutlineLoading className="animate-spin text-xl"/>
        </div>
    )
}