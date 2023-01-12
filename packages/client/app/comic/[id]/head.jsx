async function getPostTitle(id) {
  const response = await fetch(process.env.NEXT_PUBLIC_serverURL + `/comics/comic/${id}`)
  .then(res => res.json())
  .catch((error) => {
    console.log(error)
  });

  if(!response) return;
  return response.data;
}

export default async function Head({ params }) {
  const comic = await getPostTitle(params.id)
    return (
      <>
        <title>{comic?.title || "Unkown" + " - Apex Manga"}</title>
      </>
    )
  }