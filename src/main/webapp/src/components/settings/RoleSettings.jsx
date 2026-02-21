import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

function RoleSettings() {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Role Settings
            </Typography>
            <Paper sx={{ p: 2 }}>
                <Typography variant="body2">
                    Define and manage user roles and permissions across the system.
                </Typography>
            </Paper>
        </Box>
    );
}

export default RoleSettings;
