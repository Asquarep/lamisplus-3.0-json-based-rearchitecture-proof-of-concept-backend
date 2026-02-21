import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

function UserSettings() {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                User Settings
            </Typography>
            <Paper sx={{ p: 2 }}>
                <Typography variant="body2">
                    Manage user profiles, passwords, and personal preferences here.
                </Typography>
            </Paper>
        </Box>
    );
}

export default UserSettings;
