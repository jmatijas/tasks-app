import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';

import LoginView from 'src/views/auth/LoginView';

const App = () => {
  const routing = useRoutes(routes);
  const { username } = useSelector((state) => state.auth);

  console.log('username:', username);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {username ? routing : <LoginView />}
    </ThemeProvider>
  );
};

export default App;
