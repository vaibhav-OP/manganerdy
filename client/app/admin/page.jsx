"use client"
import { useState } from "react";

import SidePanel from "../../components/admin/sidePanel";
import MainScreen from "../../components/admin/mainScreen";

export default function() {
    const [page, setPage] = useState("addPage")
    return (
        <div className="flex">
            <SidePanel page={page} setPage={setPage} />
            <MainScreen page={page} />
        </div>
    )
}