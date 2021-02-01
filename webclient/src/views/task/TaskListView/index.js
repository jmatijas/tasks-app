import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import data from './data';

import { usersGet } from 'src/actions/users';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const UserListView = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  //const [users] = useState(data);

  const users = useSelector((state) => state.users.list);
  const loading = useSelector((state) => state.users.loading);

  useEffect(() => {
    dispatch(usersGet());
  }, []);

  return (
    <Page className={classes.root} title="Users">
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results users={users} />
        </Box>
      </Container>
    </Page>
  );
};

export default UserListView;
