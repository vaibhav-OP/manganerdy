import Image from "next/image";
import { notFound } from "next/navigation";

export default async function ({searchParams }) {
    const data = await getChapterData(searchParams.id, searchParams.name)

    // might be using the NEXT.JS image tag in future but for now i have to idea
    // how to make its height auto and width the size of container.
    const images = data?.url.map((url) => {
        return <img src={process.env.NEXT_PUBLIC_serverURL + url} />
    })

    return  <div className="flex">
                <div className="max-w-2xl mx-auto">
                    {images}
                </div>
            </div>
}

async function getChapterData( id, name){
    // get the chapter image urls from the server the server logic for getting the urls from db is a mess
    // if anyone can help :)
    const response = await fetch(process.env.NEXT_PUBLIC_serverURL + `/comics/chapter?id=${id}&name=${name}`, { cache: 'no-store' })
        .then(res => res.json())
        .catch(error => {
            console.log(error)
        })

    if(!response) notFound()
    return response
}