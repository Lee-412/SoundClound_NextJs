'use client'
// import AppHeader from "@/components/Header/app.header"
// import { useState } from "react";

const LikePage = () => {
    // const [name, setName] = useState("Oke");
    const handleClick = () => {
        alert("oke")
    }
    return (
        <>
            <div onClick={() => handleClick()}>
                Like Page : with name
            </div>
        </>

    )
}
export default LikePage;