import React, { useState } from "react";
import { Modal, Box, Button, Typography } from "@mui/material";
import { fetchModules, uploadModule } from "../store/slices/modulesSlice";
import { useDispatch } from "react-redux";

const ModuleUploadModal = ({ open, onClose, onUploaded }) => {
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();

const handleUpload = async () => {
  if (!file) return;

  await dispatch(uploadModule(file));
  dispatch(fetchModules());
  onClose();
};


  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          p: 3,
          bgcolor: "white",
          borderRadius: 2,
          width: 400,
          mx: "auto",
          mt: "15%",
        }}
      >
        <Typography variant="h6">Upload Module JSON</Typography>
        <input
          type="file"
          accept="application/json"
          onChange={(e) => setFile(e.target.files[0])}
        />
        {file && <Typography>{file.name}</Typography>}
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" onClick={handleUpload} disabled={!file}>
            Upload
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModuleUploadModal;
