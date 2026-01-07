import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import api from "../setting/interceptor";

const FormDataDialog = ({ open, onClose, form }) => {
  const [values, setValues] = useState({});

  const handleChange = (field, value) => {
    let parsedValue = value;

    switch (field.type.toLowerCase()) {
        case 'int':
        parsedValue = value === '' ? null : parseInt(value, 10);
        break;
        case 'float':
        case 'double':
        parsedValue = value === '' ? null : parseFloat(value);
        break;
        case 'boolean':
        parsedValue = value === 'true' || value === true;
        break;
        // case 'date':
        // parsedValue = value ? new Date(value) : null;
        // break;
        default:
        parsedValue = value;
    }

    setValues((prev) => ({ ...prev, [field.name]: parsedValue }));
  };

  const handleSave = async () => {    
    await api.post(`/api/forms/${form.tableName}`, values);
    onClose();
    window.location.reload();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Data to {form.display}</DialogTitle>
      <DialogContent>
        {form.fields.map((field) => (
            <>
            {field.type.toLowerCase() === 'string' ? <TextField
            key={field.name}
            label={field.display}
            fullWidth
            margin="dense"
            onChange={(e) => handleChange(field, e.target.value)}
          /> : field.type.toLowerCase() === 'int' ? <TextField
            key={field.name}
            label={field.display}
            type="number"
            fullWidth
            margin="dense"
            onChange={(e) => handleChange(field, e.target.value)}
          /> : field.type.toLowerCase() === 'date' ? <TextField
            key={field.name}
            label={field.display}
            type="date"
            fullWidth
            margin="dense"
            InputLabelProps={{ shrink: true }}
            onChange={(e) => handleChange(field, e.target.value)}
            /> : null}
            </>
          
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDataDialog;
