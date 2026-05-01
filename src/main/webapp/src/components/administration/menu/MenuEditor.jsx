import React from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Divider,
    Switch,
    FormControlLabel,
    InputAdornment
} from '@mui/material';
import {
    Save as SaveIcon,
    Cancel as CancelIcon,
    InsertEmoticon as IconIcon,
    Link as LinkIcon
} from '@mui/icons-material';

const MenuEditor = ({ onBack, onSave }) => {
    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Configure Menu Item
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="outlined"
                        startIcon={<CancelIcon />}
                        onClick={onBack}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={onSave}
                    >
                        Save Menu
                    </Button>
                </Box>
            </Box>

            <Paper sx={{ p: 4, borderRadius: 2, border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
                <Grid container spacing={4}>
                    {/* Basic Info */}
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                            Identity & Navigation
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Display Name"
                                    placeholder="e.g., Pharmacy"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Menu Code"
                                    placeholder="e.g., PHARMACY_MODULE"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} md={9}>
                                <TextField
                                    fullWidth
                                    label="Navigation Path"
                                    placeholder="/app/pharmacy"
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LinkIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <FormControlLabel
                                    control={<Switch defaultChecked />}
                                    label="Active"
                                    sx={{ mt: 1 }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}><Divider /></Grid>

                    {/* Hierarchy & Location */}
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                            Placement & Hierarchy
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Parent Menu (Optional)</InputLabel>
                                    <Select label="Parent Menu (Optional)" defaultValue="">
                                        <MenuItem value=""><em>None (Top Level)</em></MenuItem>
                                        <MenuItem value="admin">Administration</MenuItem>
                                        <MenuItem value="reports">Reports</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Target Location</InputLabel>
                                    <Select label="Target Location" defaultValue="sidebar">
                                        <MenuItem value="sidebar">Sidebar Navigation</MenuItem>
                                        <MenuItem value="quick_access">Quick Access Header</MenuItem>
                                        <MenuItem value="admin_page">Administration Hub</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    type="number"
                                    label="Display Position"
                                    placeholder="e.g., 5"
                                    helperText="Order in which it appears (lower numbers first)"
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}><Divider /></Grid>

                    {/* Visuals */}
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                            Icon & Aesthetics
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Icon Library</InputLabel>
                                    <Select label="Icon Library" defaultValue="mui">
                                        <MenuItem value="mui">Material UI Icons</MenuItem>
                                        <MenuItem value="font_awesome">Font Awesome</MenuItem>
                                        <MenuItem value="custom_url">Custom Image URL</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Icon Identifier"
                                    placeholder="e.g., LocalPharmacy"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <IconIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default MenuEditor;
