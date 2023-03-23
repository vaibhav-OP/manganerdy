import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script'
import { notFound } from "next/navigation";
import { HiOutlineBookOpen } from "react-icons/hi";

import ComicImage from './ComicImage';
import ChaptersList from './ChaptersList';

export default async function ComicPage({ params }) {
    if(!params.id) notFound();
    const comicData = await getComicData(params.id);
    if(!comicData) notFound();

    const updatedOn = new Date(comicData?.updatedAt).toLocaleString('en-GB');
    const publishedOn = new Date(comicData?.createdAt).toLocaleString('en-GB');

    const chapters = comicData?.chapters?.chapters?.map((chapter, index) => {
        return <Link href={`/comic/${params.id}/chapter/${comicData.chapters._id}/${chapter.name}`} key={index}>
                <li id={`${chapter.name.toLowerCase()}`}
                    className='font-medium flex items-center py-3 px-4 w-full border-l-4 border-transparent cursor-pointer border-b-black
                               hover:border-l-themeColor hover:bg-white text-base hover:text-theme transition-all
                               hover:dark:bg-[#2f2f2f] hover:dark:text-white'>
                    <div className='gap-2 flex items-center'>
                        <HiOutlineBookOpen />
                        <h6 className=''>{chapter.name}</h6>
                    </div>
                </li>
            </Link>
    })

    return (
        <div className='pb-6 dark:text-white'>
            <div className="relative bg-cover bg-center bg-no-repeat bg-themeColor">
                <Image
                    src={process.env.NEXT_PUBLIC_serverURL + comicData?.profilePhotoLocation}
                    fill
                    className="object-cover object-center"
                    priority/>
                <div className="h-4/5 w-full text-white px-7 py-10 flex gap-5 lg:flex-row flex-col bg-gradient-to-tr from-black to-black/40 backdrop-blur-sm lg:items-start items-center">
                    <div className='flex gap-5 lg:items-start items-center lg:flex-row flex-col'>
                        <div className="h-64 relative rounded-md overflow-hidden min-w-[208px] w-52">
                            <ComicImage src={process.env.NEXT_PUBLIC_serverURL + comicData?.profilePhotoLocation}
                                        alt={comicData?.title}
                            />
                        </div>
                        <div className="text-white/80 flex flex-col gap-5 max-w-5xl">
                            <h1 className="font-medium text-4xl text-white">{comicData?.title}</h1>
                            <div className='max-h-36 overflow-y-scroll
                                            scrollbar-thin scrollbar-w-1 scrollbar-thumb-rounded-sm scrollbar-thumb-[#302b63]'>
                                <span dangerouslySetInnerHTML={{__html: comicData?.description || "nothing"}}/>
                            </div>
                        </div>
                    </div>
                    <div className='lg:flex hidden flex-col'>
                        <div className='flex gap-2 items-center'>
                            <h3 className='font-semibold text-base'>Author:</h3>
                            <span>{comicData.authorName}</span>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <h3 className='font-semibold text-base'>Updated:</h3>
                            <span>{updatedOn}</span>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <h3 className='font-semibold text-base'>Published:</h3>
                            <span>{publishedOn}</span>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <h3 className='font-semibold text-base'>Genre:</h3>
                            <div>
                                {comicData?.genre.map((genre, index) => {
                                    return <span key={index}>{genre}, </span>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='lg:hidden grid grid-flow-col grid-cols-[1fr_1fr_1fr_1fr] justify-between bg-themeColor py-3 text-white'>
                <div className='flex items-center flex-col border-r border-[rgba(255,255,255,.1)]  text-center'>
                    <h3 className='font-semibold text-base'>Author</h3>
                    <span>{comicData.authorName}</span>
                </div>
                <div className='flex items-center flex-col border-r border-[rgba(255,255,255,.1)]  text-center'>
                    <h3 className='font-semibold text-base'>Updated</h3>
                    <span>{updatedOn}</span>
                </div>
                <div className='flex items-center flex-col border-r border-[rgba(255,255,255,.1)]  text-center'>
                    <h3 className='font-semibold text-base'>Published</h3>
                    <span>{publishedOn}</span>
                </div>
                <div className='flex items-center flex-col text-center'>
                    <h3 className='font-semibold text-base'>Genre</h3>
                    <div>
                        {comicData?.genre.map((genre, index) => {
                            return <span key={index}>{genre}, </span>
                        })}
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
            
            <div id="disqus_thread"></div>

<Script strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `(function() {
    var d = document, s = d.createElement('script');

    s.src = 'https://manganerdy.disqus.com/embed.js';

    s.setAttribute('data-timestamp', +new Date());

    (d.head || d.body).appendChild(s);

    })();`
    }}

/>
        </div>
    )
}

async function getComicData(id) {
    const response = await fetch(process.env.NEXT_PUBLIC_serverURL + `/comics/comic/${id}`, { cache: 'no-store' })
        .then(res => res.json())
        .catch(error => {})

    if(!response) return;
    return response.data;
}
