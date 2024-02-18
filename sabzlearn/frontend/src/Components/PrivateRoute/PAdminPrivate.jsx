import React, { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

export default function PAdminPrivate({ children }) {


    const navigate = useNavigate()

    const [userInfos, setUserInfos] = useState("")

    useEffect(() => {

        const localStorageData = JSON.parse(localStorage.getItem("user"))

        if (localStorageData) {
            fetch("http://localhost:5000/v1/auth/me", {
                headers: {
                    "Authorization": `Bearer ${localStorageData.token}`
                }
            }).then(res => res.json())
                .then(userData => {
                    console.log(userData.role);
                    setUserInfos(userData.role)

                })
        }

        //  else {
        //   setIsLoggedIn(false)
        // }

    }, [])
    return (
        <>
            {
                userInfos === "ADMIN" ? <>{children}</> : navigate("/login")
            }
        </>
    )
}
