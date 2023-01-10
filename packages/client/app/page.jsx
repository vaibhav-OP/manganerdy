import LatestCreated from '../components/latestCreated';
import LatestUpdated from '../components/latestUpdated';
import MostViewedComics from "../components/MostViewedComics";

export default async function() {
  const latestComics = await getLatestComics();
  const mostViewedComics = await getMostViewedComics();
  const lastestUpdatedComics = await getLatestUpdatedComics();
  return (
    <>
      <LatestCreated latestComics={latestComics} />
      {
      (latestComics.length !== 0) &&
        <>
          <MostViewedComics mostViewedComics={mostViewedComics}/>
          <LatestUpdated preRenderedData={lastestUpdatedComics}/>
        </>
      }
    </>
  )
}

async function getLatestUpdatedComics() {
  const response = await fetch(process.env.NEXT_PUBLIC_serverURL + "/comics/latest_updated", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
        limit: 25,
        page: 0
    })
  })
  .then(res => res.json())
  .catch((error) => {});

  if(!response) return []
  return response.data
}

async function getLatestComics() {

  const response = await fetch(process.env.NEXT_PUBLIC_serverURL + "/comics/latest_created", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  })
  .then(res => res.json())
  .catch((error) => {});

  if(!response) return []
  return response.data
}

async function getMostViewedComics() {
  const response = await fetch(process.env.NEXT_PUBLIC_serverURL + "/comics/most_viewed", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      limit: 10,
      page: 0
    })
  })
  .then(res => res.json())
  .catch((error) => {});

  if(!response) return []
  return response.data
}