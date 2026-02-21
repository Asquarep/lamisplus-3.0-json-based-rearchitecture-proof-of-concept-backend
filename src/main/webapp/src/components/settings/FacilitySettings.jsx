import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

function FacilitySettings() {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Facility Settings
            </Typography>
            <Paper sx={{ p: 2 }}>
                <Typography variant="body2">
                    Configure facility-specific details, departments, and location settings.
                </Typography>
            </Paper>
        </Box>
    );
}

export default FacilitySettings;
