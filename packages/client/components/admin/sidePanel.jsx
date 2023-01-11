import {MdOutlineAddCircleOutline, MdEdit} from "react-icons/md";

export default function SidePanel({ page, setPage }) {
    return (
        <div className="w-72 h-full left-0 top-0 text-xl py-8 font-bold">
            <ul className="flex flex-col gap-3">
                <li aria-checked={`${page == "addPage" ? true : false}`} className="border-l-4 border-white aria-checked:border-themeColor" onClick={() => setPage("addPage")}>
                    <div className="flex items-center pl-3 cursor-pointer">
                        <MdOutlineAddCircleOutline/>
                        <span className="text-[#8B8B8B]">Add Comic</span>
                    </div>
                </li>
                <li aria-checked={`${page == "addChapter" ? true : false}`} className="border-l-4 border-white aria-checked:border-themeColor" onClick={() => setPage("addChapter")}>
                    <div className="flex items-center pl-3 cursor-pointer">
                        <MdEdit/>
                        <span className="text-[#8B8B8B]">Add Chapter</span>
                    </div>
                </li>
            </ul>
        </div>
    )
}