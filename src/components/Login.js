import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch } from 'react-redux';
import { login } from '../actions/loginActions';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@material-ui/core';
import { ROLES } from '../data/constants';
import { useFormik } from 'formik';
import { COLOR_CODES } from '../styles/styleConstants';
import { isEmpty } from 'lodash';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Hoc tieng anh
      </Link>
      {' '}
      {new Date().getFullYear()}
      .
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  errorText: {
    color: COLOR_CODES.ERROR
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  roleOption: {
    textTransform: "capitalize"
  },
  roleFormControl: {
    minWidth: 120
  }
}));

const validateForm = (values) => {
  return Object.keys(values).reduce((errorMap, key) => {
    const _value = values[key];
    switch (key) {
      case "email": {
        if (!_value) {
          errorMap[key] = "Email is required.";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(_value)) {
          errorMap[key] = "Invalid email address."
        }
        break;
      }
      case "password": {
        if (!_value) {
          errorMap[key] = "Password is required.";
        }
        break;
      }
      case "role": {
        if (!_value) {
          errorMap[key] = "Please select a role.";
        }
        break;
      }
    }
    return errorMap;
  }, {});
}

export default function SignIn() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      role: ""
    },
    initialTouched: {
      email: false,
      password: false,
      role: false
    },
    onSubmit: values => {
      const { email, password, role } = values;
      if (email && password && role) {
        dispatch(login({ email, password, role }));
      }
    },
    validate: (values) => validateForm(values)
  })

  const { values: { email, password, role } = {}, handleChange, touched, errors, handleSubmit, handleBlur } = formik; 
  const _isSubmitDisabled = !isEmpty(errors) || Object.values(touched).some((isFieldTouched) => !isFieldTouched);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <FormControl required variant="outlined" className={classes.roleFormControl}>
            <InputLabel id="roleSelectLabel">Role</InputLabel>
            <Select
              autoFocus
              labelId="roleSelectLabel"
              id="role"
              name="role"
              onChange={handleChange}
              onBlur={handleBlur}
              value={role}
              error={touched.role && Boolean(errors.role)}
              label="Role"
            >
              {
                Object.values(ROLES).map((roleOption) => (
                  <MenuItem className={classes.roleOption} value={roleOption} key={roleOption}>{roleOption}</MenuItem>
                ))
              }
            </Select>
            {
              touched.role && Boolean(errors.role) &&
              <FormHelperText className={classes.errorText}>{errors.role}</FormHelperText>
            }
          </FormControl>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={email}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={password}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={_isSubmitDisabled}
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
