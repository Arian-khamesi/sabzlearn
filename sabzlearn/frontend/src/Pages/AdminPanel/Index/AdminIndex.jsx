import React from 'react'
import "./AdminIndex.css"
import { Outlet } from 'react-router-dom'
import Sidebar from '../../../Components/AdminPanel/Sidebar/Sidebar'

export default function Index() {
  return (
    <>
    <div id='content'>
      <Sidebar/>
    </div>
    <Outlet/>
    </>
  )
}