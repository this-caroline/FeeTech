/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';

import { ProductsToolbar, ProductCard } from './components';
import api from '../../services/api';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}));

const CardsList = () => {
  const classes = useStyles();

  const [cards, setCards] = useState([]);

  useEffect(() => {
    getCards();
  }, []);

  const getCards = async () => {
    const { data } = await api.endpoints.listCards(localStorage.getItem('userId'));
    if (data) setCards(...cards, data.data);
  };

  return (
    <div className={classes.root}>
      <ProductsToolbar />
      <div className={classes.content}>
        <Grid container spacing={3}>
          {cards ? (
            cards.map(card => (
              <Grid item key={card.id} lg={4} md={6} xs={12}>
                <ProductCard card={card} />
              </Grid>
            ))
          ) : (
            <Typography display="inline" variant="body1">
              Nenhum cartão cadastrado
            </Typography>
          )}
        </Grid>
      </div>
      {/* <div className={classes.pagination}>
        <Typography variant="caption">1-6 of 20</Typography>
        <IconButton>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton>
          <ChevronRightIcon />
        </IconButton>
      </div> */}
    </div>
  );
};

export default CardsList;
