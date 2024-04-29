import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectPage from './projectPage';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<ProjectPage />} />
      <Route path="/todo/:id" element={<App />} />
    </Routes>
  
  </Router>
);



