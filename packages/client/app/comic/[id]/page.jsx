import Link from 'next/link';
import { notFound } from "next/navigation";
import { HiOutlineBookOpen } from "react-icons/hi";

import ComicImage from './ComicImage';
import ChaptersList from './ChaptersList';

export default async function ComicPage({ params }) {
    if(!params.id) notFound();
    const comicData = await getComicData(params.id);
    if(!comicData) notFound();

    const chapters = comicData?.chapters?.chapters?.map((chapter, index) => {
        return <Link href={`/comic/${params.id}/chapter/${comicData.chapters._id}/${chapter.name}`} key={index}>
                <li id={`${chapter.name.toLowerCase()}`}
                    className='transition-all font-medium flex items-center py-3 px-4 w-full hover:text-theme cursor-pointer hover:border-l-themeColor hover:border-l-4  hover:bg-white text-base dark:border-b-[1px] border-b-black dark:hover:bg-[#2f2f2f]'>
                    <div className='gap-2 flex items-center'>
                        <HiOutlineBookOpen />
                        <h6 className=''>{chapter.name}</h6>
                    </div>
                </li>
            </Link>
    })

    return (
        <div className='pb-6 dark:text-white'>
            <div
                style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_serverURL + comicData?.profilePhotoLocation})` }}
                className="relative bg-cover bg-center bg-no-repeat">
                <div className="h-4/5 w-full text-white px-7 py-10 grid gap-1 sm:grid-cols-[200px_minmax(auto,1fr)] bg-gradient-to-tr from-black to-black/40 backdrop-blur-sm">
                    <div className="h-64 w-44 relative rounded-md overflow-hidden">
                        <ComicImage src={process.env.NEXT_PUBLIC_serverURL + comicData?.profilePhotoLocation}
                                    alt={comicData?.title}
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
                    <div className='border-b-8 border-themeColor flex gap-2'>
                        <h4 className='bg-themeColor text-white py-2 px-5 rounded-t font-medium text-lg'>Chapters</h4>
                    </div>
                    <ChaptersList chapters={chapters}/>
                </div>
            </div>
        </div>
    )
}

async function getComicData(id) {
    const response = await fetch(process.env.NEXT_PUBLIC_serverURL + `/comics/comic/${id}`, { next: { revalidate: 30 } })
        .then(res => res.json())
        .catch(error => {})

    if(!response) return;
    return response.data;
}