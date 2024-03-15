import { useState } from 'react'
import { Header } from './components/Header';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Cabs from './pages/Cabs';
import Locations from './pages/Locations';
import Bookings from './pages/Bookings';

function App() {

  return (
    
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='cabs' element={<Cabs/>}/>
      <Route path='locations' element={<Locations/>}/>
      <Route path='bookings' element={<Bookings/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
