"use client"
export default function ({error, reset}) {
    return (
        <div className="flex justify-center items-center flex-col">
            <h1 className="font-bold text-2xl">Opps!! An error accured.</h1>
            <span>Please try refreshing the page.</span>
        </div>
    );
}