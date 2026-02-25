import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    Button,
    List,
    ListItem,
    ListItemText,
    Divider,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Checkbox,
    FormGroup,
    FormControlLabel,
    IconButton,
    CircularProgress
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoles, addRole, updatePermissions } from '../../store/slices/rolesSlice';

const AVAILABLE_PERMISSIONS = [
    'READ_ROLES',
    'CREATE_ROLES',
    'MANAGE_PERMISSIONS',
    'VIEW_MODULES',
    'UPLOAD_MODULES',
    'DELETE_MODULES',
    'MANAGE_FACILITY'
];

function RoleSettings() {
    const dispatch = useDispatch();
    const { list: roles, loading, error } = useSelector((state) => state.roles);

    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [newRoleName, setNewRoleName] = useState('');
    const [selectedRole, setSelectedRole] = useState(null);
    const [selectedPermissions, setSelectedPermissions] = useState([]);

    useEffect(() => {
        dispatch(fetchRoles());
    }, [dispatch]);

    const handleCreateRole = async () => {
        try {
            await dispatch(addRole({ name: newRoleName })).unwrap();
            setNewRoleName('');
            setOpen(false);
        } catch (err) {
            console.error('Error creating role:', err);
        }
    };

    const handleEditRole = (role) => {
        setSelectedRole(role);
        setSelectedPermissions(role.permissions?.map(p => p.name) || []);
        setEditOpen(true);
    };

    const handleTogglePermission = (permission) => {
        setSelectedPermissions(prev =>
            prev.includes(permission)
                ? prev.filter(p => p !== permission)
                : [...prev, permission]
        );
    };

    const handleSavePermissions = async () => {
        try {
            await dispatch(updatePermissions({
                roleId: selectedRole.id,
                permissions: selectedPermissions
            })).unwrap();
            setEditOpen(false);
        } catch (err) {
            console.error('Error saving permissions:', err);
        }
    };

    if (loading && roles.length === 0) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Role Management</Typography>
                <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                    Add Role
                </Button>
            </Box>

            {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                    {typeof error === 'string' ? error : JSON.stringify(error)}
                </Typography>
            )}

            <Paper>
                <List>
                    {roles.map((role, index) => (
                        <React.Fragment key={role.id}>
                            <ListItem
                                secondaryAction={
                                    <IconButton edge="end" aria-label="edit" onClick={() => handleEditRole(role)}>
                                        <EditIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemText
                                    primary={role.name}
                                    secondary={`Permissions: ${role.permissions?.map(p => p.name).join(', ') || 'None'}`}
                                />
                            </ListItem>
                            {index < roles.length - 1 && <Divider />}
                        </React.Fragment>
                    ))}
                </List>
            </Paper>

            {/* Add Role Dialog */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Create New Role</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Role Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newRoleName}
                        onChange={(e) => setNewRoleName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleCreateRole} disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : 'Create'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Permissions Dialog */}
            <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Manage Permissions for {selectedRole?.name}</DialogTitle>
                <DialogContent>
                    <FormGroup>
                        {AVAILABLE_PERMISSIONS.map((permission) => (
                            <FormControlLabel
                                key={permission}
                                control={
                                    <Checkbox
                                        checked={selectedPermissions.includes(permission)}
                                        onChange={() => handleTogglePermission(permission)}
                                    />
                                }
                                label={permission}
                            />
                        ))}
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditOpen(false)}>Cancel</Button>
                    <Button
                        onClick={handleSavePermissions}
                        variant="contained"
                        color="primary"
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Save Changes'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default RoleSettings;
