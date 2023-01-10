async function getPostTitle(id) {
  const response = await fetch(process.env.NEXT_PUBLIC_serverURL + `/comics/comic_name/${id}`)
  .then(res => res.json())
  .catch((error) => {
    console.log(error)
  });

  return response.data;
}

export default async function Head({ params }) {
  const comic = await getPostTitle(params.id)
    return (
      <>
        <title>{comic?.title || "404" + " - Apex Manga"}</title>
      </>
    )
  }