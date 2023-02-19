import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Layout from './components/ui/Layout';
import Home from './components/pages/Home';
import Developers from './components/pages/Developers';
import Teams from './components/pages/Teams';
import NoPage from './components/pages/NoPage';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="developers" element={<Developers />} />
          <Route path="teams" element={<Teams />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
