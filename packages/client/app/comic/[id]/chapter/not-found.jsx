export default function PostNotFound() {
  // 404 page for both /comic/:id and /comic/:id/chapter
  // not sure how to design it :(
  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="font-bold text-2xl">404:Comic not found</h1>
    </div>
  )
}