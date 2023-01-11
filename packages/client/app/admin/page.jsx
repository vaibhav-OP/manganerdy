"use client"
import { useState, useCallback } from "react";

import toast from "../../components/Toast";
import LoginComponent from "./Login.component";
import SidePanel from "../../components/admin/sidePanel";
import MainScreen from "../../components/admin/mainScreen";

export default function() {
    const [page, setPage] = useState("addPage");
    const [Admin, setAdmin] = useState(false);

    const notify = useCallback((type, message) => {
        toast({ type, message });
    }, []);

    if (!Admin) return <LoginComponent setAdmin={setAdmin} notify={notify}/>
    return (
        <div className="flex">
            <SidePanel page={page} setPage={setPage}/>
            <MainScreen page={page} notify={notify}/>
        </div>
    )
}