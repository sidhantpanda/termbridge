import React from 'react';
import TerminalContainer from '../components/Terminal/TerminalContainer';
import { useNavigate, useParams } from 'react-router-dom';
import LoggedOut from '../components/Terminal/LoggedOut';
import Layout from '../Layout';

const Terminal = () => {
  const { id_host } = useParams();
  const navigate = useNavigate();
  const [isLoggedOut, setIsLoggedOut] = React.useState(false);
  const [id, ...rest] = id_host.split('-')

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
          onHomeRequested={() => navigate('/')}
          onReloadTerminalRequested={() => setIsLoggedOut(false)}
        />
      </Layout>
    );
  }
};

export default Terminal;
