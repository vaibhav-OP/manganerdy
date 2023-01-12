import { AiOutlineLoading3Quarters } from "react-icons/ai";

/*
    do not make any other loading screen, next will use this one by default
*/
export default async function LoadingScreen() {
    return (
        <div className="flex justify-center items-center flex-col min-h-[calc(100vh-240px)]">
            <h1 className="font-bold text-2xl animate-spin"><AiOutlineLoading3Quarters /></h1>
        </div>
    )
}