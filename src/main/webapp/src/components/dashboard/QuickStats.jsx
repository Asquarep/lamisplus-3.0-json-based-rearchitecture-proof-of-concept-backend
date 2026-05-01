import React from 'react';
import { Grid, Paper, Box, Typography, Avatar } from '@mui/material';
import {
    Extension as ExtensionIcon,
    People as PeopleIcon,
    AssignmentTurnedIn as TasksIcon,
    HealthAndSafety as HealthIcon
} from '@mui/icons-material';

const STATS_DATA = [
    { label: 'Installed Modules', value: '12', icon: <ExtensionIcon />, color: '#3f51b5' },
    { label: 'Active Users', value: '1,248', icon: <PeopleIcon />, color: '#f44336' },
    { label: 'Forms Completed', value: '45,672', icon: <TasksIcon />, color: '#4caf50' },
    { label: 'System Health', value: '98%', icon: <HealthIcon />, color: '#ff9800' },
];

const QuickStats = () => {
    return (
        <Grid container spacing={3} sx={{ mb: 4 }}>
            {STATS_DATA.map((stat, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                    <Paper
                        sx={{
                            p: 3,
                            display: 'flex',
                            alignItems: 'center',
                            borderRadius: 3,
                            boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
                            border: '1px solid',
                            borderColor: 'divider',
                            transition: 'transform 0.2s',
                            '&:hover': {
                                transform: 'translateY(-4px)'
                            }
                        }}
                    >
                        <Avatar
                            sx={{
                                bgcolor: `${stat.color}15`,
                                color: stat.color,
                                width: 56,
                                height: 56,
                                mr: 2
                            }}
                        >
                            {stat.icon}
                        </Avatar>
                        <Box>
                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                                {stat.label}
                            </Typography>
                            <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                {stat.value}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
};

export default QuickStats;
