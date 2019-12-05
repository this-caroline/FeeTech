import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import api from '../../../../services/api';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, CardActions, Typography, Grid, Divider, IconButton, Snackbar } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import { SimpleDialog } from 'components';

const useStyles = makeStyles(theme => ({
  root: {},
  imageContainer: {
    height: 64,
    width: 64,
    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  }
}));

const ItemCard = props => {
  const { className, card, ...rest } = props;
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);

  const classes = useStyles();

  const removeCard = async card_id => {
    await api.endpoints.removeCard(localStorage.getItem('userId'), card_id);
    setOpen(true);
    window.location.reload();
  };

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = value => {
    setOpen(false);
  };

  return (
    <>
      <Card {...rest} className={clsx(classes.root, className)}>
        <CardContent>
          <div className={classes.imageContainer}>
            <img alt="Product" className={classes.image} src="/images/placeholder.jpg" />
          </div>
          <Typography align="center" gutterBottom variant="h4">
            {card.card_name}
          </Typography>
        </CardContent>
        <Divider />
        <CardActions>
          <Grid container justify="space-between">
            <Grid className={classes.statsItem} item>
              <AttachMoneyIcon className={classes.statsIcon} />
              <Typography display="inline" variant="body2">
                Valor disponível: R$ {card.amount}
              </Typography>
            </Grid>
            <Grid className={classes.statsItem} item>
              <IconButton aria-label="edit" size="small" onClick={handleClickOpen}>
                <EditIcon />
              </IconButton>
              <IconButton aria-label="delete" size="small" onClick={() => removeCard(card.id)}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
      <SimpleDialog isEdit selectedValue={''} open={openModal} onClose={handleClose} cardId={card.id} />
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={open}
        autoHideDuration={6000}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={<span id="message-id">Cartão removido</span>}
        action={[
          <IconButton key="close" aria-label="close" color="inherit" className={classes.close}>
            <CloseIcon />
          </IconButton>
        ]}
      />
    </>
  );
};

ItemCard.propTypes = {
  className: PropTypes.string,
  card: PropTypes.object.isRequired
};

export default ItemCard;
