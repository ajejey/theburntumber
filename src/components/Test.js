import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

function MyDialog({ open, onClose, title, content, actions }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        {actions.map((action, index) => (
          <Button key={index} onClick={action.handler} color={action.color}>
            {action.label}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
}

export default MyDialog;
