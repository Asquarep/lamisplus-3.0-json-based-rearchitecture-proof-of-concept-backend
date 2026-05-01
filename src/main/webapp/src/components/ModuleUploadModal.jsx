import React, { useState, useRef } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    IconButton,
    CircularProgress,
    Paper,
    Fade
} from "@mui/material";
import {
    CloudUpload as UploadIcon,
    Close as CloseIcon,
    InsertDriveFile as FileIcon,
    CheckCircle as SuccessIcon
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchModules, uploadModule } from "../store/slices/modulesSlice";
import { toast } from "react-toastify";

const ModuleUploadModal = ({ open, onClose }) => {
    const [file, setFile] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef(null);
    
    const dispatch = useDispatch();
    const { uploading } = useSelector(state => state.modules);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            validateAndSetFile(e.target.files[0]);
        }
    };

    const validateAndSetFile = (selectedFile) => {
        if (selectedFile.type !== "application/json" && !selectedFile.name.endsWith('.json')) {
            toast.error("Please upload a valid JSON file");
            return;
        }
        setFile(selectedFile);
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            validateAndSetFile(e.dataTransfer.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        try {
            const resultAction = await dispatch(uploadModule(file));
            if (uploadModule.fulfilled.match(resultAction)) {
                toast.success("Module uploaded and loaded successfully!");
                dispatch(fetchModules());
                handleClose();
            } else {
                toast.error(resultAction.payload || "Failed to upload module");
            }
        } catch (error) {
            toast.error("An unexpected error occurred during upload");
        }
    };

    const handleClose = () => {
        setFile(null);
        onClose();
    };

    return (
        <Dialog 
            open={open} 
            onClose={uploading ? null : handleClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: { borderRadius: 3, p: 1 }
            }}
        >
            <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
                    Upload New Module
                </Typography>
                {!uploading && (
                    <IconButton onClick={handleClose} size="small">
                        <CloseIcon />
                    </IconButton>
                )}
            </DialogTitle>
            
            <DialogContent>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Select a module configuration JSON file to upload and install it on the system.
                </Typography>

                <Paper
                    variant="outlined"
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => !uploading && fileInputRef.current.click()}
                    sx={{
                        p: 4,
                        textAlign: 'center',
                        cursor: uploading ? 'default' : 'pointer',
                        backgroundColor: dragActive ? 'action.hover' : 'background.paper',
                        borderStyle: 'dashed',
                        borderWidth: 2,
                        borderColor: dragActive ? 'primary.main' : 'divider',
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                            borderColor: uploading ? 'divider' : 'primary.main',
                            backgroundColor: uploading ? 'background.paper' : 'action.hover',
                        }
                    }}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".json,application/json"
                        style={{ display: 'none' }}
                    />

                    {!file ? (
                        <Box sx={{ py: 2 }}>
                            <UploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2, opacity: 0.7 }} />
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                Click to browse or drag and drop
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Supported format: .json
                            </Typography>
                        </Box>
                    ) : (
                        <Fade in={!!file}>
                            <Box sx={{ py: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <FileIcon sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                    {file.name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {(file.size / 1024).toFixed(2)} KB
                                </Typography>
                                {!uploading && (
                                    <Button 
                                        size="small" 
                                        color="error" 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setFile(null);
                                        }}
                                        sx={{ mt: 1 }}
                                    >
                                        Remove
                                    </Button>
                                )}
                            </Box>
                        </Fade>
                    )}
                </Paper>
            </DialogContent>

            <DialogActions sx={{ p: 2, px: 3 }}>
                <Button 
                    onClick={handleClose} 
                    disabled={uploading}
                    color="inherit"
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={handleUpload}
                    disabled={!file || uploading}
                    startIcon={uploading ? <CircularProgress size={20} color="inherit" /> : <UploadIcon />}
                    sx={{ 
                        borderRadius: 2,
                        px: 3,
                        boxShadow: 2
                    }}
                >
                    {uploading ? 'Uploading...' : 'Upload Module'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModuleUploadModal;
