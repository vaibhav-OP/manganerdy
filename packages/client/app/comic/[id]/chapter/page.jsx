import { notFound } from "next/navigation";

import Images from "./Images";
import ChapterContainer from "./Container";

export default async function ChaptersPage({ searchParams }) {
    if(!searchParams.name || !searchParams.id) notFound();

    const data = await getChapterData(searchParams.id)
    if(!data) notFound();

    /**
     * Find the chapter with name
     * @param {string} name
    */
    const findChapterByName = (name) => {
        return data.chapters.find(chapter => chapter.name === name)
    }

    // find the current chapter from the data
    const currentChapter = findChapterByName(searchParams.name);
    const currentChapterIndex = data.chapters.findIndex(chapter => chapter.name === searchParams.name);

    return <ChapterContainer data={data} currentChapter={currentChapter} currentChapterIndex={currentChapterIndex}>
        <Images data={currentChapter}/>
    </ChapterContainer>
}

async function getChapterData(id){
    // get the chapter image urls from the server the server logic for getting the urls from db is a mess
    // if anyone can help :)
    const response = await fetch(process.env.NEXT_PUBLIC_serverURL + `/comics/chapter?id=${id}`,{ next: { revalidate: 60 } })
        .then(res => res.json())
        .catch(error => {
            console.log(error)
        })

    if(!response) return;
    return response;
}