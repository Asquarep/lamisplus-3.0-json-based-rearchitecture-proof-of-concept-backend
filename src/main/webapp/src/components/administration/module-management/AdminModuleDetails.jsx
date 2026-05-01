import React from 'react';
import {
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    CircularProgress,
    Alert,
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import { 
    MoreVert as MoreVertIcon,
    CheckCircle as CheckCircleIcon,
    Block as BlockIcon
} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import api from '../../../setting/interceptor';
import { activateModuleVersion, deactivateModuleVersion } from '../../../store/slices/modulesSlice';
import ConfirmModal from '../../common/ConfirmModal';

const AdminModuleDetails = ({ module }) => {
    const [versions, setVersions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedVersion, setSelectedVersion] = useState(null);
    const [confirmModal, setConfirmModal] = useState({ open: false, type: null });
    const [actionLoading, setActionLoading] = useState(false);

    const loadVersions = async () => {
        if (!module?.key) return;
        
        setLoading(true);
        setError(null);
        try {
            const res = await api.get(`/api/modules/versions/${module.key}`);
            const sortedVersions = (res.data || []).sort((a, b) => 
                new Date(b.createdAt) - new Date(a.createdAt)
            );
            setVersions(sortedVersions);
        } catch (err) {
            console.error("Failed to fetch versions:", err);
            setError(err.response?.data || "Failed to fetch versions history");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadVersions();
    }, [module]);

    const handleMenuOpen = (event, version) => {
        setAnchorEl(event.currentTarget);
        setSelectedVersion(version);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleActionClick = (type) => {
        setConfirmModal({ open: true, type });
        handleMenuClose();
    };

    const handleConfirmAction = async () => {
        if (!selectedVersion || !module) return;

        setActionLoading(true);
        try {
            const action = confirmModal.type === 'activate' ? activateModuleVersion : deactivateModuleVersion;
            const result = await dispatch(action({
                moduleKey: module.key,
                versionNumber: selectedVersion.versionNumber
            })).unwrap();

            toast.success(result.message || `Successfully ${confirmModal.type}d version ${selectedVersion.versionNumber}`);
            
            // Reload versions to reflect change
            await loadVersions();
            setConfirmModal({ open: false, type: null });
        } catch (err) {
            toast.error(err || `Failed to ${confirmModal.type} version`);
        } finally {
            setActionLoading(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date(dateString));
    };

    const latestVersion = versions.length > 0 ? versions[0].versionNumber : (module.version || '1.0.0');

    if (!module) return null;

    return (
        <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                    {module.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    {module.description || "No description provided for this module."}
                </Typography>

                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Typography variant="subtitle2" color="text.secondary">Module Key</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>{module.key}</Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="subtitle2" color="text.secondary">Latest Version</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>{latestVersion}</Typography>
                    </Grid>
                </Grid>
            </Paper>

            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Version History</Typography>
            
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
            ) : (
                <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                    <Table>
                        <TableHead sx={{ bgcolor: 'grey.50' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 600 }}>Version Number</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Codename</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Created At</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 600 }} align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {versions && versions.length > 0 ? versions.map((v, index) => (
                                <TableRow key={v.id || index} hover>
                                    <TableCell sx={{ fontWeight: v.status === 'ACTIVE' ? 700 : 400 }}>
                                        {v.versionNumber}
                                    </TableCell>
                                    <TableCell>{v.codename || 'N/A'}</TableCell>
                                    <TableCell sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                                        {formatDate(v.createdAt)}
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{
                                            px: 1,
                                            py: 0.5,
                                            borderRadius: 1,
                                            bgcolor: v.status === 'ACTIVE' ? 'success.light' : 'grey.200',
                                            color: v.status === 'ACTIVE' ? 'success.dark' : 'text.secondary',
                                            display: 'inline-block',
                                            fontSize: '0.75rem',
                                            fontWeight: 700
                                        }}>
                                            {v.status?.toUpperCase()}
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            size="small"
                                            onClick={(e) => handleMenuOpen(e, v)}
                                            sx={{ color: 'text.secondary' }}
                                        >
                                            <MoreVertIcon fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                                        <Typography color="text.secondary">No version history found.</Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                    elevation: 2,
                    sx: {
                        borderRadius: 2,
                        minWidth: 180,
                        mt: 1,
                        '& .MuiMenuItem-root': {
                            px: 2,
                            py: 1,
                            borderRadius: 1,
                            mx: 0.5,
                            fontSize: '0.875rem',
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem 
                    onClick={() => handleActionClick('activate')}
                    disabled={selectedVersion?.status === 'ACTIVE'}
                    sx={{ color: 'success.main' }}
                >
                    <ListItemIcon sx={{ color: 'success.main', minWidth: 36 }}>
                        <CheckCircleIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Activate Version" />
                </MenuItem>
                <MenuItem 
                    onClick={() => handleActionClick('deactivate')}
                    disabled={selectedVersion?.status !== 'ACTIVE'}
                    sx={{ color: 'error.main' }}
                >
                    <ListItemIcon sx={{ color: 'error.main', minWidth: 36 }}>
                        <BlockIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Deactivate Version" />
                </MenuItem>
            </Menu>

            <ConfirmModal
                open={confirmModal.open}
                title={confirmModal.type === 'activate' ? "Activate Version" : "Deactivate Version"}
                message={`Are you sure you want to ${confirmModal.type} version ${selectedVersion?.versionNumber} of ${module?.name}?`}
                confirmText={confirmModal.type === 'activate' ? "Activate" : "Deactivate"}
                confirmColor={confirmModal.type === 'activate' ? "success" : "error"}
                loading={actionLoading}
                onConfirm={handleConfirmAction}
                onCancel={() => setConfirmModal({ open: false, type: null })}
            />
        </Box>
    );
};

// Internal Grid helper to avoid extra import in example
const Grid = ({ children, container, item, xs, md, spacing }) => (
    <Box
        sx={{
            display: container ? 'flex' : 'block',
            flexWrap: 'wrap',
            margin: container ? `-${(spacing || 0) * 4}px` : 0,
            width: item ? `${(xs / 12) * 100}%` : 'auto',
            '@media (min-width: 900px)': {
                width: item ? `${(md / 12) * 100}%` : 'auto'
            },
            padding: item ? `${(spacing || 2) * 4}px` : 0
        }}
    >
        {children}
    </Box>
);

export default AdminModuleDetails;
