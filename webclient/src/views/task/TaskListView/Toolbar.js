import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  CircularProgress,
  makeStyles
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

import { usersDeleteMany } from 'src/actions/users';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  wrapper: {
    position: 'relative'
  },
  buttonProgress: {
    color: 'primary',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const selectedUserIds = useSelector((state) => state.users.selectedIds);
  const loading = useSelector((state) => state.users.loading);

  const handleRemoveSelectedUsers = () => {
    console.log('handleRemoveSelectedUsers');
    dispatch(usersDeleteMany(selectedUserIds));
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display="flex" justifyContent="flex-end">
        <div className={classes.wrapper}>
          <Button
            disabled={!selectedUserIds || selectedUserIds.length < 1 || loading}
            className={classes.exportButton}
            onClick={handleRemoveSelectedUsers}
          >
            Remove Selected Users{' '}
            {selectedUserIds.length > 0 ? ` (${selectedUserIds.length})` : ''}
          </Button>
          {loading && (
            <CircularProgress
              disableShrink
              size={24}
              className={classes.buttonProgress}
            />
          )}
        </div>
        <Link to="/app/users/create">
          <Button color="primary" variant="contained">
            Add User
          </Button>
        </Link>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search customer"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
