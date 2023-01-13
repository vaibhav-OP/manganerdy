import fetch from 'node-fetch';

const getImageUrl = (url: string) => {
    return fetch(url)
        .then(async response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }

            let html:string = await response.text();

            html = html.replace(/<[^>]*>?/gm, '');

            let chapterArray:string[] = html.split("\n");

            // get all links
            chapterArray.map((line, index) => {
                chapterArray[index] = chapterArray[index].split(" ")[0];
            });

            // sort string with there number
            chapterArray = chapterArray.sort((a:any, b:any) => {return a.split(".")[0]-b.split(".")[0]})

            return chapterArray;
        });
}

export default getImageUrl;