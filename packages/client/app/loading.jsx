import { AiOutlineLoading3Quarters } from "react-icons/ai"
export default async function() {
    return (
        <div className="flex justify-center items-center flex-col min-h-[calc(100vh-240px)]">
            <h1 className="font-bold text-2xl animate-spin"><AiOutlineLoading3Quarters /></h1>
        </div>
    )
}