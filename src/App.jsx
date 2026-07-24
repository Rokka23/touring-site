import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/Home/HomePage'
import { DetailPage } from './pages/Detail/DetailPage';
import { Favorites } from './pages/Favorites/Favorites';
import { SelectedSpotsProvider } from './contexts/SelectedSpotsContext/SelectedSpotsContext';
import { CreatedPlansProvider } from './contexts/CreatedPlansContext/CreatedPlansContext';
import { Plan } from './pages/Plan/Plan';

import './App.css'

function App() {
  return (
    <SelectedSpotsProvider>
      <CreatedPlansProvider>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/detail/:name' element={<DetailPage />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/plan' element={<Plan />} />
        </Routes>
      </CreatedPlansProvider>
    </SelectedSpotsProvider>
  )
}

export default App
