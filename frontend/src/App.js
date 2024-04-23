import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import './App.css';
import Home from './screens/Home'; 
import Charts from './screens/Charts';
import Forecast from './screens/Forecast';
import Navbar from './components/Navbar';
import Price from './screens/Price'; 
import Log from './screens/Log';

const App = () => {
  return (
    <>
      
        <Router> 
         <Navbar />
         <div>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/Home' element={<Home/>} /> 
            <Route path='/Charts' element={<Charts/>} />
            <Route path='/Forecast' element={<Forecast/>} />
            <Route path='/Price' element={<Price/>} />
            <Route path='/Log' element={<Log/>} />
          </Routes>
          </div>
        </Router>
    </>
  );
}

export default App;