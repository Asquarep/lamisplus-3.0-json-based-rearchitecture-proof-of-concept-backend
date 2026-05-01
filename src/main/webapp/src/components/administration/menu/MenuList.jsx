import React from 'react';
import {
    Box,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    IconButton,
    Tooltip
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Visibility as VisibilityIcon
} from '@mui/icons-material';

const DUMMY_MENUS = [
    { id: 1, displayName: 'Home', code: 'HOME', location: 'Sidebar', path: '/app/dashboard', parent: '-', position: 1, status: 'Active' },
    { id: 2, displayName: 'Administration', code: 'ADMIN', location: 'Sidebar', path: '/app/administration', parent: '-', position: 10, status: 'Active' },
    { id: 3, displayName: 'User Management', code: 'USER_MGMT', location: 'Admin Page', path: '/app/administration?section=users', parent: 'Administration', position: 1, status: 'Active' },
    { id: 4, displayName: 'Module List', code: 'MOD_LIST', location: 'Quick Access', path: '/app/dashboard', parent: '-', position: 2, status: 'Active' },
];

const MenuList = ({ onCreateNew }) => {
    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    System Menus
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={onCreateNew}
                >
                    Create Menu
                </Button>
            </Box>

            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
                <Table>
                    <TableHead sx={{ bgcolor: 'action.hover' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 700 }}>Display Name</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Code</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Location</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Path</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Parent</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Pos</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {DUMMY_MENUS.map((row) => (
                            <TableRow key={row.id} hover>
                                <TableCell sx={{ fontWeight: 500 }}>{row.displayName}</TableCell>
                                <TableCell><code>{row.code}</code></TableCell>
                                <TableCell>
                                    <Chip label={row.location} size="small" variant="outlined" />
                                </TableCell>
                                <TableCell sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>{row.path}</TableCell>
                                <TableCell>{row.parent}</TableCell>
                                <TableCell>{row.position}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={row.status}
                                        size="small"
                                        color={row.status === 'Active' ? 'success' : 'default'}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <Tooltip title="Preview">
                                        <IconButton size="small">
                                            <VisibilityIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Edit">
                                        <IconButton size="small" color="primary">
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton size="small" color="error">
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default MenuList;
