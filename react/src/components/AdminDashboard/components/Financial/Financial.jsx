import React, { useState } from "react";
import { iconsImgs } from "../../utils/images";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import "./Financial.css";

const Financial = () => {
  const [adviceList, setAdviceList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAdvice, setNewAdvice] = useState("");

  const handleAddAdvice = () => {
    setAdviceList([...adviceList, newAdvice]);
    setIsModalOpen(false);
    setNewAdvice("");
  };

  return (
    <div className="subgrid-two-item grid-common grid-c8">
      <div className="grid-c-title">
        <h3 className="grid-c-title-text">Financial Advice</h3>
        <button className="grid-c-title-icon" onClick={() => setIsModalOpen(true)}>
          <img src={iconsImgs.plus} alt="Add" />
        </button>
      </div>
      <div className="grid-c8-content">
        {adviceList.map((advice, index) => (
          <p key={index} className="text text-silver-v1">
            {advice}
          </p>
        ))}
      </div>
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} PaperProps={{ style: { backgroundColor: '#333', color: '#fff' } }}>
        <DialogTitle>Add Financial Advice</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Enter financial advice"
            type="text"
            fullWidth
            variant="outlined"
            value={newAdvice}
            onChange={(e) => setNewAdvice(e.target.value)}
            multiline
            rows={4}
            InputLabelProps={{
              style: { color: '#aaa' },
            }}
            InputProps={{
              style: { color: '#fff' },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddAdvice} variant="contained" color="primary">
            Add
          </Button>
          <Button onClick={() => setIsModalOpen(false)} variant="contained" color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Financial;
