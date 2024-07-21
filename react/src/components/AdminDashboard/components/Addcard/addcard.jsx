import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const AddCardModal = ({ isOpen, onClose, onAddCard }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const handleAdd = () => {
    onAddCard({ cardNumber, expiryDate });
    onClose();
    setCardNumber('');
    setExpiryDate('');
  };

  return (
    <Dialog open={isOpen} onClose={onClose} PaperProps={{ style: { backgroundColor: '#333', color: '#fff' } }}>
      <DialogTitle>Add New Card</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Card Number"
          type="text"
          fullWidth
          variant="outlined"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          InputLabelProps={{
            style: { color: '#aaa' },
          }}
          InputProps={{
            style: { color: '#fff' },
          }}
        />
        <TextField
          margin="dense"
          label="Expiry Date"
          type="text"
          fullWidth
          variant="outlined"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          InputLabelProps={{
            style: { color: '#aaa' },
          }}
          InputProps={{
            style: { color: '#fff' },
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAdd} variant="contained" color="primary">
          Add
        </Button>
        <Button onClick={onClose} variant="contained" color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCardModal;
