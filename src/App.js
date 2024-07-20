import React from 'react';
import { ImgCaption } from './Pages/imgcaption.jsx'; // Adjust the path if needed
import './App.css'; // Optional, for additional styles
import Header from './Components/Header.jsx'; // Ensure the correct path
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/objectdetection' element={<ImgCaption />} />
          <Route path='/imgCaption' element={<ImgCaption />} />
          {/* Add more routes here if needed */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
