import React from 'react'
import "./AdminIndex.css"
import { Outlet } from 'react-router-dom'

export default function Index() {
  return (
    <>
    <div>Index</div>
    <Outlet/>
    </>
  )
}
