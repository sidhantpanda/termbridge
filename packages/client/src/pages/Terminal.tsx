import React, { useEffect } from 'react';
import TerminalContainer from '../components/Terminal/TerminalContainer';
import { useNavigate, useParams } from 'react-router-dom';
import LoggedOut from '../components/Terminal/LoggedOut';
import Layout from '../Layout';

const Terminal = () => {
  const { id_host } = useParams();
  const navigate = useNavigate();
  const [isLoggedOut, setIsLoggedOut] = React.useState(false);
  const [id, ...rest] = id_host.split('-');

  const navigateToHome = () => {
    navigate('/');
  }

  useEffect(() => {
    if (isLoggedOut) {
      const handleKeyPress = (e: KeyboardEvent) => {
        if (e.ctrlKey) {
          if (e.key === 't') {
            setIsLoggedOut(false);
          }
          if (e.key === 'd') {
            navigateToHome();
          }
        }
      };
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [isLoggedOut]);

  if (!isLoggedOut) {
    return (
      <TerminalContainer
        id={id}
        name={rest.join('-')}
        h="100vh"
        w="100vw"
        onLogout={() => setIsLoggedOut(true)}
      />
    );
  } else {
    return (
      <Layout>
        <LoggedOut
          onHomeRequested={navigateToHome}
          onReloadTerminalRequested={() => setIsLoggedOut(false)}
        />
      </Layout>
    );
  }
};

export default Terminal;
