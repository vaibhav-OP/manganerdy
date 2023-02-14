import { notFound } from "next/navigation";

import Images from "./Images";
import ChapterContainer from "./Container";

export default async function ChaptersPage({ params }) {
    if(!params.name || !params.chapterId) notFound();

    const data = await getChapterData(params.chapterId)
    if(!data) notFound();

    /**
     * Find the chapter with name
     * @param {String} name
     * @return Object
    */
    const findChapterByName = (name) => {
        return data.chapters.find(chapter => chapter.name === decodeURI(name))
    }

    /**
     * Find the Index of the chapter
     * @param {String} name
     * @return Object
     */
    const findChapterIndex = (name) => {
        return data.chapters.findIndex(chapter => chapter.name === decodeURI(name))
    }

    // find the current chapter from the data
    const currentChapter = findChapterByName(params.name);
    const currentChapterIndex = findChapterIndex(params.name)

    return <ChapterContainer params={params} data={data} currentChapter={currentChapter} currentChapterIndex={currentChapterIndex}>
        <Images data={currentChapter}/>
    </ChapterContainer>
}

/**
 * Gets the Chapter data with Chapter Id
 * @param {String} id
 * @returns Object
 */
async function getChapterData(id){
    // get the chapter image urls from the server the server logic for getting the urls from db is a mess
    // if anyone can help :)
    if(!id) return;
    const response = await fetch(process.env.NEXT_PUBLIC_serverURL + `/comics/chapter?id=${id}`, { cache: 'no-store' })
        .then(res => res.json())
        .catch(error => {
            console.log(error)
        })

    if(!response) return;
    return response;
}