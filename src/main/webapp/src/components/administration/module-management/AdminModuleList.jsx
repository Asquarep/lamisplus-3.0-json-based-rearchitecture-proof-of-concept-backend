import React, { useState } from "react";
import {
    Box,
    Typography,
    Button,
    Grid,
    CardContent,
    CardActions,
    IconButton,
    Tooltip,
    Divider,
    ToggleButton,
    ToggleButtonGroup,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from "@mui/material";
import {
    ViewModule as GridViewIcon,
    ViewList as ListViewIcon,
    Add as AddIcon,
    Update as UpdateIcon,
    Delete as DeleteIcon,
    PowerSettingsNew as PowerIcon,
    CloudUpload as UploadIcon,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
    activateModule,
    deactivateModule,
    uninstallModule,
    checkModuleUpdates,
} from "../../../store/slices/modulesSlice";
import ReusableCardComponent from "../../common/ReusableCardComponent";
import ModuleUploadModal from "../../ModuleUploadModal";
import ConfirmModal from "../../common/ConfirmModal";

const AdminModuleList = ({ onSelectModule, onCreateNew }) => {
    const [viewMode, setViewMode] = useState('grid');
    const [uploadModalOpen, setUploadModalOpen] = useState(false);
    const { list: modules } = useSelector(state => state.modules);
    const dispatch = useDispatch();

    const [selectedModule, setSelectedModule] = useState(null);
    const [confirmModal, setConfirmModal] = useState({ open: false, type: null });
    const [actionLoading, setActionLoading] = useState(false);

    const handleAction = (e, action, module) => {
        e.stopPropagation();
        if (action === 'update') {
            dispatch(checkModuleUpdates(module.id));
            return;
        }
        
        setSelectedModule(module);
        setConfirmModal({ open: true, type: action });
    };

    const handleConfirmAction = async () => {
        if (!selectedModule || !confirmModal.type) return;

        setActionLoading(true);
        try {
            let action;
            let successMessage = "";

            switch (confirmModal.type) {
                case "activate":
                    action = activateModule;
                    successMessage = `${selectedModule.name} activated successfully`;
                    break;
                case "deactivate":
                    action = deactivateModule;
                    successMessage = `${selectedModule.name} deactivated successfully`;
                    break;
                case "uninstall":
                    action = uninstallModule;
                    successMessage = `${selectedModule.name} uninstalled successfully`;
                    break;
                default:
                    return;
            }

            await dispatch(action(selectedModule.id)).unwrap();
            toast.success(successMessage);
            setConfirmModal({ open: false, type: null });
        } catch (err) {
            toast.error(err || `Failed to ${confirmModal.type} module`);
        } finally {
            setActionLoading(false);
        }
    };

    const renderGridView = () => (
        <Grid container spacing={3}>
            {modules.map((m) => (
                <Grid item xs={12} sm={6} md={4} key={m.id}>
                    <ReusableCardComponent onClick={() => onSelectModule(m)} useActionArea={true}>
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {m.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2, height: '3em', overflow: 'hidden' }}>
                                {m.description || "This module adds extended functionality."}
                            </Typography>
                            <Divider sx={{ mb: 1 }} />
                            <Typography variant="body2">
                                <strong>Latest Version:</strong> {m.version || "1.0.0"}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {m.active ? "Active" : "Inactive"}
                            </Typography>
                        </CardContent>
                        <CardActions onClick={(e) => e.stopPropagation()}>
                            <Tooltip title={m.active ? "Deactivate" : "Activate"}>
                                <IconButton size="small" onClick={(e) => handleAction(e, m.active ? "deactivate" : "activate", m)}>
                                    <PowerIcon color={m.active ? "success" : "disabled"} fontSize="small" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Update">
                                <IconButton size="small" onClick={(e) => handleAction(e, "update", m)}>
                                    <UpdateIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Uninstall">
                                <IconButton size="small" onClick={(e) => handleAction(e, "uninstall", m)}>
                                    <DeleteIcon fontSize="small" color="error" />
                                </IconButton>
                            </Tooltip>
                        </CardActions>
                    </ReusableCardComponent>
                </Grid>
            ))}
        </Grid>
    );

    const renderListView = () => (
        <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead sx={{ bgcolor: 'grey.50' }}>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Module Name</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Key</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Version</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                        <TableCell sx={{ fontWeight: 600 }} align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {modules.map((m) => (
                        <TableRow
                            key={m.id}
                            hover
                            onClick={() => onSelectModule(m)}
                            sx={{ cursor: 'pointer' }}
                        >
                            <TableCell>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{m.name}</Typography>
                                <Typography variant="caption" color="text.secondary">{m.description}</Typography>
                            </TableCell>
                            <TableCell>{m.key}</TableCell>
                            <TableCell>{m.version || '1.0.0'}</TableCell>
                            <TableCell>
                                <Box sx={{
                                    px: 1,
                                    py: 0.5,
                                    borderRadius: 1,
                                    bgcolor: m.active ? 'success.light' : 'grey.200',
                                    color: m.active ? 'success.dark' : 'text.secondary',
                                    display: 'inline-block',
                                    fontSize: '0.75rem',
                                    fontWeight: 700
                                }}>
                                    {m.active ? "ACTIVE" : "INACTIVE"}
                                </Box>
                            </TableCell>
                            <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                                <IconButton size="small" onClick={(e) => handleAction(e, m.active ? "deactivate" : "activate", m)}>
                                    <PowerIcon color={m.active ? "success" : "disabled"} fontSize="small" />
                                </IconButton>
                                <IconButton size="small" onClick={(e) => handleAction(e, "uninstall", m)}>
                                    <DeleteIcon fontSize="small" color="error" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Installed Modules</Typography>
                    <ToggleButtonGroup
                        value={viewMode}
                        exclusive
                        onChange={(e, next) => next && setViewMode(next)}
                        size="small"
                        sx={{ ml: 2 }}
                    >
                        <ToggleButton value="grid">
                            <GridViewIcon fontSize="small" />
                        </ToggleButton>
                        <ToggleButton value="list">
                            <ListViewIcon fontSize="small" />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                        variant="outlined"
                        startIcon={<UploadIcon />}
                        onClick={() => setUploadModalOpen(true)}
                        sx={{ borderRadius: 2 }}
                    >
                        Upload Module
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={onCreateNew}
                        sx={{ borderRadius: 2 }}
                    >
                        Create New Module
                    </Button>
                </Box>
            </Box>

            <ModuleUploadModal 
                open={uploadModalOpen} 
                onClose={() => setUploadModalOpen(false)} 
            />

            {modules.length > 0 ? (
                viewMode === 'grid' ? renderGridView() : renderListView()
            ) : (
                <Typography color="text.secondary" sx={{ textAlign: 'center', py: 8 }}>
                    No modules found. Create one to get started.
                </Typography>
            )}

            <ConfirmModal
                open={confirmModal.open}
                title={`${confirmModal.type?.charAt(0).toUpperCase() + confirmModal.type?.slice(1)} Module`}
                message={`Are you sure you want to ${confirmModal.type} the module "${selectedModule?.name}"?`}
                confirmText={confirmModal.type?.charAt(0).toUpperCase() + confirmModal.type?.slice(1)}
                confirmColor={confirmModal.type === 'uninstall' ? 'error' : confirmModal.type === 'activate' ? 'success' : 'primary'}
                loading={actionLoading}
                onConfirm={handleConfirmAction}
                onCancel={() => setConfirmModal({ open: false, type: null })}
            />
        </Box>
    );
};

export default AdminModuleList;
