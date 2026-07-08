import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/Home/HomePage'
import { DetailPage } from './pages/Detail/DetailPage';
import { Favorites } from './pages/Favorites/Favorites';
import { PlanSelectionProvider } from './contexts/PlanSelectionContext';

import './App.css'

function App() {
  return (
    <PlanSelectionProvider>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/detail/:name' element={<DetailPage />} />
        <Route path='/favorites' element={<Favorites />} />
      </Routes>
    </PlanSelectionProvider>
  )
}

export default App
