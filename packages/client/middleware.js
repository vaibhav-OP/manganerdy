import { NextResponse } from "next/server";

export default async function(req, event) {
    const { cookies, nextUrl } = req;
    const token = cookies.get("token");

}