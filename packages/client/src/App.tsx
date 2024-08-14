import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'

// import '@radix-ui/themes/styles.css';
import './style.css';
import Home from './pages/Home';

const About = () => {
  return <h1>About Page</h1>;
};

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
