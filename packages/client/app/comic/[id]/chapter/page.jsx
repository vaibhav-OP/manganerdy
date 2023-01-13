import Image from "next/image";
import { notFound } from "next/navigation";

export default async function ({ searchParams }) {
    const data = await getChapterData(searchParams.id, searchParams.name)

    const images = data.url.map((url) => {
        console.log(url)
        return (
            <img src={url}/>
        )
    })
    return  (
        <div>
            <div className="flex">
                <div className="max-w-2xl mx-auto">
                    {images}
                </div>
            </div>
        </div>
    )
}

async function getChapterData(id, name){
    const response = await fetch(process.env.NEXT_PUBLIC_serverURL + `/comics/chapter?id=${id}&name=${name}`, { cache: 'no-store' })
        .then(res => res.json())
        .catch(error => {})

    if(!response) notFound()
    return response
}