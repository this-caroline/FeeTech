import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import { Button, TextField, Dialog } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputMask from 'react-input-mask';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

const useStyles = makeStyles(theme => ({
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
  textField: {
    marginTop: theme.spacing(2)
  }
}));

export default function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const [cardForm, setCardForm] = useState({
    name: '',
    amount: 0,
    removed: 0
  });

  const handleChange = event => {
    event.persist();

    setCardForm(formState => ({
      ...formState,
      [event.target.name]: event.target.value
    }));
  };

  const classes = useStyles();

  const handleClose = () => {
    onClose(selectedValue);
  };

  const addCard = () => {
    console.log(cardForm);
  };

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Adicionar novo cartão
        </DialogTitle>
        <DialogContent dividers>
          <div className={classes.imageContainer}>
            <img alt="" className={classes.image} src="/images/placeholder.jpg" />
          </div>
          <TextField
            fullWidth
            className={classes.textField}
            label="Nome"
            name="name"
            type="text"
            value={cardForm.name || ''}
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            className={classes.textField}
            label="Valor disponível"
            name="amount"
            onChange={handleChange}
            value={cardForm.amount || ''}
            type="text"
            variant="outlined"
            InputProps={{
              startAdornment: <InputAdornment position="start">R$</InputAdornment>
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={addCard} color="primary" variant="contained">
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired
};
