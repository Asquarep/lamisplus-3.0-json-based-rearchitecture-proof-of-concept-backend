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
    PlayArrow as RunIcon
} from '@mui/icons-material';

const DUMMY_WORKFLOWS = [
    { id: 1, name: 'Patient Alert SMS', trigger: 'Vital Sign Threshold', action: 'Send SMS', status: 'Active', type: 'Configurable' },
    { id: 2, name: 'Lab Result Notification', trigger: 'Lab Result Authorized', action: 'Email Provider', status: 'Active', type: 'Built-in' },
    { id: 3, name: 'Monthly Report Sync', trigger: 'Schedule (Monthly)', action: 'Export to DHIS2', status: 'Inactive', type: 'Configurable' },
    { id: 4, name: 'New User Onboarding', trigger: 'User Created', action: 'Setup Profile', status: 'Active', type: 'Built-in' },
];

const WorkflowList = ({ onCreateNew }) => {
    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    System Workflows
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={onCreateNew}
                >
                    Create Workflow
                </Button>
            </Box>

            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
                <Table>
                    <TableHead sx={{ bgcolor: 'action.hover' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Trigger</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Action</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {DUMMY_WORKFLOWS.map((row) => (
                            <TableRow key={row.id} hover>
                                <TableCell sx={{ fontWeight: 500 }}>{row.name}</TableCell>
                                <TableCell>{row.trigger}</TableCell>
                                <TableCell>{row.action}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={row.type}
                                        size="small"
                                        variant="outlined"
                                        color={row.type === 'Built-in' ? 'secondary' : 'primary'}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={row.status}
                                        size="small"
                                        color={row.status === 'Active' ? 'success' : 'default'}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <Tooltip title="Run Now">
                                        <IconButton size="small" color="success">
                                            <RunIcon fontSize="small" />
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

export default WorkflowList;
