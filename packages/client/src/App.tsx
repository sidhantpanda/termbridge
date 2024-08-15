import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import AllTerminals from './pages/AllTerminals';
import Terminal from './pages/Terminal';
import './style.css';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/terminals" element={<AllTerminals />} />
            <Route path="/terminal/:host" element={<Terminal />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </Router>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default App;
