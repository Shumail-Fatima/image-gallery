import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'

function App() {
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/image/:id' element={<ImageViewer/>}/>
  </Routes>
}

export default App
