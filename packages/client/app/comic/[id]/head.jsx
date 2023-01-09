async function getPostTitle(id) {
  const response = await fetch(`http://localhost:3001/comics/comic_name/${id}`)
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
        <title>{comic.title + " - Apex Manga"}</title>
      </>
    )
  }