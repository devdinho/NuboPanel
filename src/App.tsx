import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './components/home';
import Terminal from './components/terminal';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Layout>
            <Home />
          </Layout>
        } />
        <Route path="/terminal" element={
          <Layout>
            <Terminal />
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
