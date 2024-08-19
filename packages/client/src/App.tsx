import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import Terminal from './pages/Terminal';
import './style.css';
import AddRemote from './pages/AddRemote';
import Layout from './Layout';
import EditRemote from './pages/EditRemote';
import LoggedOut from './components/Terminal/LoggedOut';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />} >
              <Route path="/" element={<Home />} />
              <Route path="/remotes/add" element={<AddRemote />} />
              <Route path="*" element={<h1>Not Found</h1>} />
              <Route path="/remotes/:id/edit" element={<EditRemote />} />
            </Route>
            <Route path="/remotes/:id_host/terminal" element={<Terminal />} />
          </Routes>
        </Router>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default App;
