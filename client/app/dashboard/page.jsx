"use client"
export default function() {
    function handleSignOut() {
        alert("clicked")
        document.cookie = 'token="";Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
    return (
        <div>
            <h1>user only page</h1>
            <button onClick={handleSignOut}>sign out</button>
        </div>
    )
}