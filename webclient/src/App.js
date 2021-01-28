import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider, Snackbar, Button, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';

import LoginView from 'src/views/auth/LoginView';
import TotalCustomers from './views/reports/DashboardView/TotalCustomers';

import { removeToast } from 'src/actions/toast';

const App = () => {
  const routing = useRoutes(routes);
  const { username } = useSelector((state) => state.auth);
  const toasts = useSelector((state) => state.toasts);
  const dispatch = useDispatch();

  console.log('username:', username);

  const handleCloseToast = (id) => {
    dispatch(removeToast(id));
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {toasts.map((toast) => {
        return (
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            id={toast.id}
            open={true}
            autoHideDuration={6000}
            onClose={() => handleCloseToast(toast.id)}
            message={`[TOAST_ID:${toast.id}] ${toast.text}`}
            action={
              <React.Fragment>
                <Button
                  color="secondary"
                  size="small"
                  onClick={() => handleCloseToast(toast.id)}
                >
                  UNDO
                </Button>
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={() => handleCloseToast(toast.id)}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </React.Fragment>
            }
          />
        );
      })}

      {username ? routing : <LoginView />}
    </ThemeProvider>
  );
};

export default App;
