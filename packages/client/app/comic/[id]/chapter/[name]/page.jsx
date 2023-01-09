export default function ({ params }) {
    console.log(params);

    return  (
        <div>
            <h1>tes</h1>
            <div className="flex">
                <div className="max-w-2xl mx-auto">
                    hey
                    {/* { chapterData.url?.map(url => {
                        return (
                            <img src={url} loading="lazy"/>
                        )
                    }) } */}
                </div>
            </div>
        </div>
    )
}

// export async function getServerSideProps(context) {
//     const { id, name } = context.params

//     const response = await fetch("http://localhost:3001/comics/getchapter", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             id,
//             name
//         })
//     })

//     if(!response) {
//         return {
//             notFound: true,
//         }
//     }

//     const data = await response.json();

//     if(data.status !== "ok") {
//         return {
//             notFound: true,
//         }
//     } else {
//         return {
//             props: {
//                 comic_name: data.data.title,
//                 chapterData: data.data.chapter
//             }
//         }
//     }
// }