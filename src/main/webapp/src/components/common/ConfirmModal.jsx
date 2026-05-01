import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Typography,
    Box,
    CircularProgress
} from '@mui/material';

/**
 * A reusable confirmation modal component.
 * 
 * @param {boolean} open - Whether the modal is open.
 * @param {string} title - The title of the modal.
 * @param {string} message - The message/body of the modal.
 * @param {function} onConfirm - Callback function when confirmed.
 * @param {function} onCancel - Callback function when cancelled.
 * @param {boolean} loading - Loading state for the confirm button.
 * @param {string} confirmText - Text for the confirm button.
 * @param {string} cancelText - Text for the cancel button.
 * @param {string} confirmColor - Color for the confirm button (primary, error, etc.)
 */
const ConfirmModal = ({
    open,
    title = "Confirm Action",
    message = "Are you sure you want to proceed?",
    onConfirm,
    onCancel,
    loading = false,
    confirmText = "Confirm",
    cancelText = "Cancel",
    confirmColor = "primary"
}) => {
    return (
        <Dialog
            open={open}
            onClose={loading ? null : onCancel}
            aria-labelledby="confirm-dialog-title"
            aria-describedby="confirm-dialog-description"
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    p: 1,
                    minWidth: 400
                }
            }}
        >
            <DialogTitle id="confirm-dialog-title">
                <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
                    {title}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="confirm-dialog-description">
                    <Box component="span" sx={{ color: 'text.primary' }}>
                        {message}
                    </Box>
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ p: 2, pt: 0 }}>
                <Button 
                    onClick={onCancel} 
                    color="inherit" 
                    disabled={loading}
                    sx={{ fontWeight: 600 }}
                >
                    {cancelText}
                </Button>
                <Button
                    onClick={onConfirm}
                    disabled={loading}
                    variant="contained"
                    color={confirmColor}
                    sx={{ fontWeight: 600, borderRadius: 2, minWidth: 100 }}
                    autoFocus
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                >
                    {loading ? 'Processing...' : confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmModal;
