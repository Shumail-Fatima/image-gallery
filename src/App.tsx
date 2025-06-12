//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'
import ImageViewer from './pages/ImageViewer'

function App() {
  return(
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/category/:category' element={<CategoryPage/>}/>
    <Route path='/image/:id' element={<ImageViewer/>}/>
  </Routes>
  )
}

export default App
