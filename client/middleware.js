import { NextResponse } from "next/server";

export default async function(req, event) {
    const { cookies, nextUrl } = req;
    const token = cookies.get("token");

    if(nextUrl.pathname.startsWith("/auth")) {
        if(token === undefined) return NextResponse.next();

        try {
            const response = await fetch("http://localhost:3001/auth/verify?token=" + token.value, {
                method: "GET",
            })
            .then(res => res.json())

            if(response.status === "ok") {
                nextUrl.pathname = "/";
                return NextResponse.redirect(nextUrl);
            }
            else {
                return NextResponse.next()
            }
        } catch(e) {
            return NextResponse.next()
        }
    }

    if(nextUrl.pathname.startsWith("/admin")) {
        if(token === undefined) {
            nextUrl.pathname = "/404";
            return NextResponse.redirect(nextUrl);
        };

        try {
            const response = await fetch("http://localhost:3001/auth/verify?token=" + token.value, {
                method: "GET",
            })
            .then(res => res.json())

            if(response.status === "ok" && response.data.isAdmin) {
                return NextResponse.next()
            }
            else {
                nextUrl.pathname = "/404";
                return NextResponse.redirect(nextUrl);
            }
        } catch(e) {
            nextUrl.pathname = "/404";
            return NextResponse.redirect(nextUrl);
        }
    }

    if(nextUrl.pathname.startsWith("/dashboard")) {
        if(token === undefined) return NextResponse.next();

        try {
            const response = await fetch("http://localhost:3001/auth/verify?token=" + token.value, {
                method: "GET",
                credentials: "include"
            })
            .then(res => res.json())

            if(response.status === "ok") {
                return NextResponse.next()
            }
            else {
                await fetch("http://localhost:3001/auth/sign-out", {
                        method: "GET",
                        credentials: 'include'
                    })
                nextUrl.pathname = "/auth/sign-in";
                return NextResponse.redirect(nextUrl);
            }
        } catch(e) {
            await fetch("http://localhost:3001/auth/sign-out", {
                    method: "GET",
                    credentials: 'include'
                })
            nextUrl.pathname = "/auth/sign-in";
            return NextResponse.redirect(nextUrl);
        }
    }
}