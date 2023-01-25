import { notFound } from "next/navigation";

import Images from "./Images";

export default async function ChaptersPage({ searchParams }) {
    if(!searchParams.name || !searchParams.id) notFound();

    const data = await getChapterData(searchParams.id, searchParams.name)
    if(!data) notFound();

    return <Images data={data}/>
}

async function getChapterData(id, name){
    // get the chapter image urls from the server the server logic for getting the urls from db is a mess
    // if anyone can help :)
    const response = await fetch(process.env.NEXT_PUBLIC_serverURL + `/comics/chapter?id=${id}&name=${name}`,{ next: { revalidate: 60 } })
        .then(res => res.json())
        .catch(error => {
            console.log(error)
        })

    if(!response) return;
    return response;
}