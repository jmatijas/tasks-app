import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  makeStyles
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { usersPost, usersPostReset } from 'src/actions/users';
import { SettingsBackupRestore } from '@material-ui/icons';

const userRoles = [
  {
    value: 'user',
    label: 'user'
  },
  {
    value: 'admin',
    label: 'admin'
  }
];

const useStyles = makeStyles((theme) => ({
  root: {},
  formControl: {
    margin: theme.spacing(1)
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

const NewUserDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    role: 'user',
    signedIn: false,
    secret: ''
  });

  const dispatch = useDispatch();
  const createdUserId = useSelector((state) => state.users.createdUserId);
  const error = useSelector((state) => state.users.error);
  const loading = useSelector((state) => state.users.loading);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleChangeCheckbox = (event) => {
    setValues({ ...values, [event.target.name]: event.target.checked });
  };

  const handleAddNewUser = () => {
    const newUser = {
      name: values.firstName,
      lastName: values.lastName,
      admin: values.role === 'admin',
      loggedIn: values.signedIn,
      secret: values.secret
    };
    dispatch(usersPost(newUser));
  };

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="New User"
        />
        <Divider />
        <CardContent>
          <Box my={3}>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  helperText="Please specify the first name"
                  label="First name"
                  name="firstName"
                  onChange={handleChange}
                  required
                  value={values.firstName}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Last name"
                  name="lastName"
                  onChange={handleChange}
                  required
                  value={values.lastName}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Select Role"
                  name="role"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.role}
                  variant="outlined"
                >
                  {userRoles.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Secret"
                  name="secret"
                  onChange={handleChange}
                  required
                  value={values.secret}
                  variant="outlined"
                />
              </Grid>
              <Grid>
                <FormControlLabel
                  className={classes.formControl}
                  control={
                    <Checkbox
                      name="signedIn"
                      onChange={handleChangeCheckbox}
                      checked={values.signedIn}
                    />
                  }
                  label="Signed In"
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />

        {error ? <Alert severity="error">{error}</Alert> : ''}
        <Box display="flex" justifyContent="flex-end" p={2}>
          <div className={classes.wrapper}>
            <Button
              color="primary"
              variant="contained"
              disabled={loading}
              onClick={handleAddNewUser}
            >
              Add New User
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </Box>
      </Card>
    </form>
  );
};

NewUserDetails.propTypes = {
  className: PropTypes.string
};

export default NewUserDetails;
