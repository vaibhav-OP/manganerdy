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

/*
  All these functions are performed server side.
  they send limit and page number a query because we might want them to be lazy loading in future
*/

// latest created are the banner comics top
async function getLatestComics() {
  const response = await fetch(process.env.NEXT_PUBLIC_serverURL + "/comics/latest_created", { cache: 'no-store' })
    .then(res => res.json())
    .catch((error) => {});

  if(!response) return [];
  return response.data;
}

// most viewed are the onces that show up after latest created hence middle one
async function getMostViewedComics() {
  const response = await fetch(process.env.NEXT_PUBLIC_serverURL + "/comics/most_viewed?limit=10&page=0", { cache: 'no-store' })
    .then(res => res.json())
    .catch((error) => {});

  if(!response) return [];
  return response.data;
}

// last section is the latest onces updated
async function getLatestUpdatedComics() {
  const response = await fetch(process.env.NEXT_PUBLIC_serverURL + "/comics/latest_updated?limit=25&page=0", { cache: 'no-store' })
    .then(res => res.json())
    .catch((error) => {});

  if(!response) return []
  return response.data
}