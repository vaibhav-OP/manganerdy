async function getPostTitle(id) {
  // gets the data fromt the server about the comic like title and description
  // using the same route to get data for headers and initial comic page is because
  // the header will contain meta tags with profile photo of the comic, descriptions and genre
  const response = await fetch(process.env.NEXT_PUBLIC_serverURL + `/comics/comic/${id}`)
    .then(res => res.json())
    .catch((error) => {});

  if(!response) return;
  return response.data;
}

export default async function Head({ params }) {
  const comic = await getPostTitle(params.id);
    return (
      <>
        <title>{comic?.title || "Unkown" + " - Manganerdy"}</title>
        <meta name="description" content={comic?.description}/>
        <meta name="keywords" content={"manganerdy, manganerd, manga, manwha, manhua, fast upload, reader free online, comics, comic,"+comic?.title+", "+comic?.title+"[All Chapters]"}/>

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website"/>
        <meta property="og:url" content={"https://manganerdy.com/comic/" + params.id}/>
        <meta property="og:title" content={comic?.title || "Unkown" + " - Manganerdy"}/>
        <meta property="og:description" content={comic?.description}/>
        <meta property="og:image" content={"https://manganerdy.com/server" + comic?.profilePhotoLocation}/>

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content={"https://manganerdy.com/comic/" + params.id}/>
        <meta property="twitter:title" content={comic?.title || "Unkown" + " - Manganerdy"}/>
        <meta property="twitter:description" content={comic?.description}/>
        <meta property="twitter:image" content={"https://manganerdy.com/server" + comic?.profilePhotoLocation}></meta>
      </>
    )
  }