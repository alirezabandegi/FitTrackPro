import React, { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function Dashboard(){
    const navigate = useNavigate();
    const { tokenVerify } = useOutletContext();

    useEffect(() => {
        if(!tokenVerify){
            navigate("/login")
        }
    }, [navigate, tokenVerify])

    return(
        <>Dashboard</>
    );
}