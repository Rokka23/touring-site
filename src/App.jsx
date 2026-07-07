import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/Home/HomePage'
import { DetailPage } from './pages/Detail/DetailPage';
import { Favorites } from './pages/Favorites/Favorites';

import './App.css'

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/detail/:name' element={<DetailPage />} />
      <Route path='/favorites' element={<Favorites />} />
    </Routes>
  )
}

export default App
