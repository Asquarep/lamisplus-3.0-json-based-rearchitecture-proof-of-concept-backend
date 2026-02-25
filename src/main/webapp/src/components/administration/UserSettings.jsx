import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Select, FormControl, InputLabel, Chip, CircularProgress, Tooltip, Alert, FormControlLabel, Checkbox, OutlinedInput, Grid} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    ToggleOn as ToggleOnIcon,
    ToggleOff as ToggleOffIcon,
    PersonAdd as PersonAddIcon,
    Archive as ArchiveIcon,
    Unarchive as UnarchiveIcon,
    CheckCircle as CheckCircleIcon,
    Cancel as CancelIcon,
    Info as InfoIcon
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchUsers,
    addUser,
    updateUser,
    deleteUser,
    activateUser,
    deactivateUser,
    archiveUser,
    unarchiveUser
} from '../../store/slices/usersSlice';
import { fetchRoles } from '../../store/slices/rolesSlice';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function UserSettings() {
    const dispatch = useDispatch();
    const { list: users, loading: usersLoading, error: usersError } = useSelector((state) => state.users);
    const { list: roles, loading: rolesLoading } = useSelector((state) => state.roles);

    const [modalOpen, setModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        roleIds: []
    });

    const [passwordRequirements, setPasswordRequirements] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false
    });

    useEffect(() => {
        const { password } = formData;
        setPasswordRequirements({
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        });
    }, [formData.password]);

    const isPasswordStrong = Object.values(passwordRequirements).every(req => req);

    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchRoles());
    }, [dispatch]);

    const handleOpenModal = (user = null) => {
        if (user) {
            setEditMode(true);
            setSelectedUser(user);
            setFormData({
                name: user.name,
                email: user.email,
                password: '',
                roleIds: user.roles?.map(r => r.id) || []
            });
        } else {
            setEditMode(false);
            setSelectedUser(null);
            setFormData({
                name: '',
                email: '',
                password: '',
                roleIds: []
            });
        }
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRolesChange = (event) => {
        const { target: { value } } = event;
        setFormData(prev => ({
            ...prev,
            roleIds: typeof value === 'string' ? value.split(',') : value,
        }));
    };

    const handleSubmit = async () => {
        try {
            if (editMode) {
                // Update logic
                const { name, email, roleIds } = formData;
                await dispatch(updateUser({ id: selectedUser.id, userData: { name, email, roleIds } })).unwrap();
            } else {
                // Create logic
                await dispatch(addUser(formData)).unwrap();
            }
            handleCloseModal();
        } catch (err) {
            console.error('Failed to save user:', err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            await dispatch(deleteUser(id));
        }
    };

    const handleToggleStatus = async (user) => {
        if (user.active) {
            await dispatch(deactivateUser(user.id));
        } else {
            await dispatch(activateUser(user.id));
        }
    };

    const handleArchiveToggle = async (user) => {
        if (user.archived) {
            await dispatch(unarchiveUser(user.id));
        } else {
            await dispatch(archiveUser(user.id));
        }
    };

    if (usersLoading && users.length === 0) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">User Management</Typography>
                <Button
                    variant="contained"
                    startIcon={<PersonAddIcon />}
                    onClick={() => handleOpenModal()}
                >
                    Add User
                </Button>
            </Box>

            {usersError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {typeof usersError === 'string' ? usersError : JSON.stringify(usersError)}
                </Alert>
            )}

            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Roles</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Archived</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id} sx={{ opacity: user.archived ? 0.6 : 1 }}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {user.roles?.map((role) => (
                                            <Chip key={role.id} label={role.name} size="small" />
                                        ))}
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={user.active ? "Active" : "Inactive"}
                                        color={user.active ? "success" : "default"}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    {user.archived ? <Chip label="Archived" color="warning" size="small" /> : "-"}
                                </TableCell>
                                <TableCell align="right">
                                    <Tooltip title="Edit">
                                        <IconButton size="small" onClick={() => handleOpenModal(user)}>
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title={user.active ? "Deactivate" : "Activate"}>
                                        <IconButton size="small" onClick={() => handleToggleStatus(user)}>
                                            {user.active ? <ToggleOnIcon fontSize="small" color="success" /> : <ToggleOffIcon fontSize="small" />}
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title={user.archived ? "Unarchive" : "Archive"}>
                                        <IconButton size="small" onClick={() => handleArchiveToggle(user)}>
                                            {user.archived ? <UnarchiveIcon fontSize="small" /> : <ArchiveIcon fontSize="small" />}
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton size="small" color="error" onClick={() => handleDelete(user.id)}>
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                        {users.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                                    No users found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Add/Edit User Modal */}
            <Dialog open={modalOpen} onClose={handleCloseModal} maxWidth="xs" fullWidth>
                <DialogTitle>{editMode ? 'Edit User' : 'Add New User'}</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                        <TextField
                            name="name"
                            label="Full Name"
                            fullWidth
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        <TextField
                            name="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        {!editMode && (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <TextField
                                    name="password"
                                    label="Password"
                                    type="password"
                                    fullWidth
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    error={formData.password.length > 0 && !isPasswordStrong}
                                    helperText={formData.password.length > 0 && !isPasswordStrong ? "Password does not meet requirements" : ""}
                                />
                                <Box sx={{ mt: 1, p: 1.5, bgcolor: 'action.hover', borderRadius: 1 }}>
                                    <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', mb: 1, fontWeight: 'bold' }}>
                                        <InfoIcon fontSize="inherit" sx={{ mr: 0.5 }} /> Password Requirements:
                                    </Typography>
                                    <Grid container spacing={1}>
                                        {[
                                            { label: 'Min 8 characters', met: passwordRequirements.length },
                                            { label: 'Uppercase letter', met: passwordRequirements.uppercase },
                                            { label: 'Lowercase letter', met: passwordRequirements.lowercase },
                                            { label: 'A number', met: passwordRequirements.number },
                                            { label: 'Special character', met: passwordRequirements.special },
                                        ].map((req, idx) => (
                                            <Grid item xs={6} key={idx}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                    {req.met ?
                                                        <CheckCircleIcon color="success" sx={{ fontSize: 14 }} /> :
                                                        <CancelIcon color="disabled" sx={{ fontSize: 14 }} />
                                                    }
                                                    <Typography variant="caption" color={req.met ? "success.main" : "text.secondary"}>
                                                        {req.label}
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Box>
                            </Box>
                        )}
                        <FormControl fullWidth>
                            <InputLabel id="roles-label">Roles</InputLabel>
                            <Select
                                labelId="roles-label"
                                multiple
                                value={formData.roleIds}
                                onChange={handleRolesChange}
                                input={<OutlinedInput label="Roles" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={roles.find(r => r.id === value)?.name || value} size="small" />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                {roles.map((role) => (
                                    <MenuItem key={role.id} value={role.id}>
                                        {role.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={usersLoading || (!editMode && !isPasswordStrong)}
                    >
                        {usersLoading ? <CircularProgress size={24} /> : (editMode ? 'Update' : 'Create')}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default UserSettings;
