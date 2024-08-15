import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider, Flex } from '@chakra-ui/react'

// import '@radix-ui/themes/styles.css';
import './style.css';
import Home from './pages/Home';
import AllTerminals from './pages/AllTerminals';
import Terminal from './pages/Terminal';

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
          <Route path="/terminals" element={<AllTerminals />} />
          <Route path="/terminal/:host" element={<Terminal />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
