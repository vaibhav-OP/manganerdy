import Link from 'next/link';
import { notFound } from "next/navigation";
import { HiOutlineBookOpen } from "react-icons/hi";

import SearchForm from "./chapaterSeachForm"

export default async function({ params }) {

    const comicData = await getComicData(params.id)

    const chapters = comicData?.chapters?.chapters?.map((chapter) => {
        return (
            <Link href={`/comic/${comicData?._id}/chapter/${chapter.name}`}>
                <li id={`${chapter.name.toLowerCase()}`}
                    className='font-medium flex items-center py-3 px-4 w-full hover:text-theme cursor-pointer hover:border-l-themeColor hover:border-l-4  hover:bg-white text-base dark:border-b-[1px] border-b-black dark:hover:bg-[#2f2f2f]'>
                    <div className='gap-2 flex items-center'>
                        <HiOutlineBookOpen />
                        <h6 className=''>{chapter.name}</h6>
                    </div>
                </li>
            </Link>
        )
    })

    return (
        <div className='pb-6 dark:text-white'>
            <div
                style={{ backgroundImage: `url(${comicData?.profilePhotoLocation})`}}
                className="relative bg-cover bg-center bg-no-repeat">
                <div className="h-4/5 w-full text-white px-7 py-10 grid gap-1 sm:grid-cols-[200px_minmax(auto,1fr)] bg-black/75 backdrop-blur-md">
                    <div className="h-64 w-auto relative">
                        <img
                            src={`${comicData?.profilePhotoLocation}`}
                            className="w-auto h-full rounded-lg border-white border-4"
                        />
                    </div>
                    <div className="text-white/80">
                        <h1 className="font-medium text-4xl text-white">{comicData?.title}</h1>
                        <div><span dangerouslySetInnerHTML={{__html: comicData?.description || "nothing"}}/></div>
                    </div>
                </div>
            </div>
            <div className='w-full lg:w-11/12 mx-auto'>
                <div className='sm:px-2 px-4 mt-3'>
                    <div className='border-b-8 border-themeColor'>
                        <ul className='flex gap-2'>
                            <li className='bg-themeColor text-white py-2 px-5 rounded-t font-medium text-lg'>Chapters</li>
                        </ul>
                    </div>
                    <div>
                        <div className='py-2 px-2 flex justify-end dark:bg-[#15202B] bg-[#f0f1f2] shadow-2xl'>
                            <SearchForm />
                        </div>
                        <ul className='mt-6 dark:bg-[#15202B] bg-[#f0f1f2] max-h-80 overflow-y-scroll scroll-smooth scrollbar-none'>{chapters}</ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

async function getComicData(id) {
    const response = await fetch(process.env.NEXT_PUBLIC_serverURL + `/comics/comic/${id}`, { cache: 'no-store' })
        .then(res => res.json())
        .catch(error => {})

    if(!response || response.status !== "ok") notFound();
    return response.data;
}