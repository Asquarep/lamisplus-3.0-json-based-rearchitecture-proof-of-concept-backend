import { useState } from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import UserSettings from '../components/settings/UserSettings';
import RoleSettings from '../components/settings/RoleSettings';
import FacilitySettings from '../components/settings/FacilitySettings';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`settings-tabpanel-${index}`}
            aria-labelledby={`settings-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function SettingsPage() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Typography variant="h4" gutterBottom>
                Settings
            </Typography>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="settings categories">
                    <Tab label="User" />
                    <Tab label="Roles" />
                    <Tab label="Facility" />
                </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
                <UserSettings />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <RoleSettings />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <FacilitySettings />
            </TabPanel>
        </Box>
    );
}

export default SettingsPage;
