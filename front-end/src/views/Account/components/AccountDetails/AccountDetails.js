import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../../../../services/api';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardHeader, CardContent, CardActions, Divider, Grid, Button, TextField } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const AccountDetails = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    firstName: 'Shen',
    lastName: 'Zhi',
    email: 'shen.zhi@devias.io',
    phone: '',
    state: 'Alabama',
    country: 'USA'
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const [states, setStates] = useState([]);

  const getStates = async () => {
    const { data } = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
    console.log(data);
    setStates(data);
  };

  const getUserData = async () => {
    const { data } = await api.endpoints.getUser(localStorage.getItem('userId'));
    console.log(data.data);
  };

  useEffect(() => {
    getStates();
    getUserData();
  }, []);

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form autoComplete="off" noValidate>
        <CardHeader subheader="Os dados podem ser alterados" title="Perfil" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                // helperText="Please specify the first name"
                label="Nome"
                margin="dense"
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
                label="Sobrenome"
                margin="dense"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField fullWidth label="E-mail" margin="dense" name="email" onChange={handleChange} required value={values.email} variant="outlined" />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField fullWidth label="Telefone" margin="dense" name="phone" onChange={handleChange} type="number" value={values.phone} variant="outlined" />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Estado"
                margin="dense"
                name="state"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={values.state}
                variant="outlined">
                {states.length
                  ? states.map(state => (
                      <option key={state.id} value={state.id}>
                        {state.nome}
                      </option>
                    ))
                  : null}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField fullWidth label="Country" margin="dense" name="country" onChange={handleChange} required value={values.country} variant="outlined" />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" variant="contained">
            Save details
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;
