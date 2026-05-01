import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import {
    AdminPanelSettings as AdminIcon,
    AddCircleOutline as ModuleIcon,
    AccountTree as WorkflowIcon,
    MenuOpen as MenuIcon,
    Apps as ModulesIcon,
    ContactSupport as SupportIcon
} from '@mui/icons-material';
import ReusableCardComponent from '../common/ReusableCardComponent';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import APPLICATION_ROUTES from '../../util/APPLICATION_ROUTES';

const SHORTCUTS = [
    {
        label: 'Administration',
        icon: <AdminIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
        path: APPLICATION_ROUTES.ADMINISTRATION,
        description: 'System settings and user management'
    },
    {
        label: 'Module Management',
        icon: <ModuleIcon sx={{ fontSize: 40, color: 'warning.main' }} />,
        path: `${APPLICATION_ROUTES.ADMINISTRATION}?section=module-management`,
        description: 'Design and install system extensions'
    },
    {
        label: 'Workflow Automation',
        icon: <WorkflowIcon sx={{ fontSize: 40, color: 'info.main' }} />,
        path: `${APPLICATION_ROUTES.ADMINISTRATION}?section=workflow-automation`,
        description: 'Configure triggers and actions'
    },
    {
        label: 'Menu Management',
        icon: <MenuIcon sx={{ fontSize: 40, color: 'error.main' }} />,
        path: `${APPLICATION_ROUTES.ADMINISTRATION}?section=menu-management`,
        description: 'Manage navigation and hierarchy'
    },
    {
        label: 'Installed Modules',
        icon: <ModulesIcon sx={{ fontSize: 40, color: 'success.main' }} />,
        path: '/app/modules',
        description: 'View and interact with active modules'
    },
    {
        label: 'Support & Help',
        icon: <SupportIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
        path: `${APPLICATION_ROUTES.ADMINISTRATION}?section=support`,
        description: 'FAQs and technical assistance'
    },
];

const QuickAccess = () => {
    const navigate = useCustomNavigate();

    return (
        <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Quick Access
            </Typography>
            <Grid container spacing={3}>
                {SHORTCUTS.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <ReusableCardComponent onClick={() => navigate(item.path)}>
                            <Box sx={{ p: 1, textAlign: 'center' }}>
                                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                                    {item.icon}
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                                    {item.label}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.description}
                                </Typography>
                            </Box>
                        </ReusableCardComponent>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default QuickAccess;
