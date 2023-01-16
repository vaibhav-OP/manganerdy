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
        <title>{comic?.title || "Unkown" + " - Apex Manga"}</title>
      </>
    )
  }