import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Profile from './Profile'
import Home from './Home'
import NotFound from './404'
import { Route, Routes } from 'react-router-dom'

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
