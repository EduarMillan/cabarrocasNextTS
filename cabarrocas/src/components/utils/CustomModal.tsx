import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';

type modalTypes = {
    open: boolean;
    onClose: () => void;
    title: string;
    body: string;
    accion: () => void;
  };

export default function CustomModal(props: modalTypes) {

  const handleClose = () => {
    props.onClose();
  };

  const handleClick = () => {
    props.accion();
  };
  

  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose = {handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {props.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.body}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleClick} autoFocus>Aceptar</Button>
          {/* <SecondaryButton name = "Cancelar"/> */}
          {/* <PrimaryButton name = "Aceptar"/> */}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}