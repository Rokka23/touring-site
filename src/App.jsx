import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/Home/HomePage'
import { DetailPage } from './pages/Detail/DetailPage';
import { Favorites } from './pages/Favorites/Favorites';
import { PlanSelectionProvider } from './contexts/PlanSelection/PlanSelectionContext';
import { CreatedPlansProvider } from './contexts/CreatedPlans/CreatedPlansContext';
import { Plan } from './pages/Plan/Plan';

import './App.css'

function App() {
  return (
    <PlanSelectionProvider>
      <CreatedPlansProvider>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/detail/:name' element={<DetailPage />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/plan' element={<Plan />} />
        </Routes>
      </CreatedPlansProvider>
    </PlanSelectionProvider>
  )
}

export default App
