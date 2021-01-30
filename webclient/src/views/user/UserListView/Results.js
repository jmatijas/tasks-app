import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';

import {
  usersSetSelectedIds,
  usersSetLimit,
  usersSetPage
} from 'src/actions/users';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, users, ...rest }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const selectedUserIds = useSelector((state) => state.users.selectedIds);
  const limit = useSelector((state) => state.users.limit);
  const page = useSelector((state) => state.users.page);

  const handleSelectAll = (event) => {
    let newSelectedUserIds;

    if (event.target.checked) {
      newSelectedUserIds = users.map((user) => user.id);
    } else {
      newSelectedUserIds = [];
    }

    dispatch(usersSetSelectedIds(newSelectedUserIds));
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedUserIds.indexOf(id);
    let newSelectedUserIds = [];

    if (selectedIndex === -1) {
      newSelectedUserIds = newSelectedUserIds.concat(selectedUserIds, id);
    } else if (selectedIndex === 0) {
      newSelectedUserIds = newSelectedUserIds.concat(selectedUserIds.slice(1));
    } else if (selectedIndex === selectedUserIds.length - 1) {
      newSelectedUserIds = newSelectedUserIds.concat(
        selectedUserIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedUserIds = newSelectedUserIds.concat(
        selectedUserIds.slice(0, selectedIndex),
        selectedUserIds.slice(selectedIndex + 1)
      );
    }

    dispatch(usersSetSelectedIds(newSelectedUserIds));
  };

  const handleLimitChange = (event) => {
    dispatch(usersSetLimit(event.target.value));
  };

  const handlePageChange = (event, newPage) => {
    dispatch(usersSetPage(newPage));
  };

  console.log('selectedUserIds:', selectedUserIds);
  console.log('users:', users);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedUserIds.length === users.length}
                    color="primary"
                    indeterminate={
                      selectedUserIds.length > 0 &&
                      selectedUserIds.length < users.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Signed-In status</TableCell>
                <TableCell>Secret</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.slice(page * limit, (page + 1) * limit).map((user) => (
                <TableRow
                  hover
                  key={user.id}
                  selected={selectedUserIds.indexOf(user.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedUserIds.indexOf(user.id) !== -1}
                      onChange={(event) => handleSelectOne(event, user.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      alignItems="center"
                      display="flex"
                      onClick={() => console.log('avatarrrr')}
                    >
                      <Avatar
                        className={classes.avatar}
                        src="/static/images/avatars/avatar_1.png"
                      >
                        {`${user.name[0]}${user.lastName[0]}`}
                      </Avatar>
                      <Typography color="textPrimary" variant="body1">
                        {user.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.admin ? 'user, admin' : 'user'}</TableCell>
                  <TableCell>
                    {user.loggedIn ? 'Signed In' : 'Signed Out'}
                  </TableCell>
                  <TableCell>{user.secret}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={users.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default Results;
