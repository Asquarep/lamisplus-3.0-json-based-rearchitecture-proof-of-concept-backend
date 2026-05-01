import React from 'react';
import { Box, Typography, Paper, Button, Grid } from '@mui/material';
import { HelpOutline as HelpIcon, Email as EmailIcon, Phone as PhoneIcon } from '@mui/icons-material';

const Support = () => {
    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Help & Support
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 4, textAlign: 'center', border: '1px dashed', borderColor: 'divider', bgcolor: 'transparent', boxShadow: 'none' }}>
                        <HelpIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
                        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                            How can we help you today?
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                            Our support team is here to assist you with any questions or issues you may encounter while using the platform.
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                            <Button variant="contained" startIcon={<EmailIcon />}>
                                Contact Support
                            </Button>
                            <Button variant="outlined" startIcon={<PhoneIcon />}>
                                Call Helpdesk
                            </Button>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                            Quick FAQ
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main', cursor: 'pointer' }}>
                                How to install a new module?
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main', cursor: 'pointer' }}>
                                Managing user permissions
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main', cursor: 'pointer' }}>
                                Configuring system triggers
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main', cursor: 'pointer' }}>
                                Troubleshooting connection issues
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Support;
