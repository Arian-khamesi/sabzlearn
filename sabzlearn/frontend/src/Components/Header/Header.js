import React, { useEffect, useState } from 'react'
import "./Header.css"
import TopBar from '../TopBar/TopBar'
import NavBar from '../NavBar/NavBar'
import Landing from '../Landing/Landing'

export default function Header() {

// const [indexInfo,setIndexInfo]=useState({})

// useEffect(()=>{
//     fetch("http://localhost:5000/v1/infos/index")
//     .then(res=>console.log(res))
//     // .then(result=>console.log(result))
// },[])


// console.log(indexInfo);
    return (

        <header className="header">
            <TopBar />

            <NavBar />

            <Landing/>
        </header>

    )
}
