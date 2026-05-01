import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
    Box,
    Typography,
    Grid,
    CardContent,
    IconButton,
    Fade
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { setBreadcrumbs } from '../store/slices/uiSlice';
import APPLICATION_ROUTES from '../util/APPLICATION_ROUTES';
import ReusableCardComponent from '../components/common/ReusableCardComponent';
import ModuleManagement from '../components/administration/module-management/ModuleManagement';
import WorkflowAutomation from '../components/administration/workflow/WorkflowAutomation';
import MenuManagement from '../components/administration/menu/MenuManagement';
import UserSettings from '../components/administration/UserSettings';
import RoleSettings from '../components/administration/RoleSettings';
import FacilitySettings from '../components/administration/FacilitySettings';
import Support from '../components/administration/Support';
import {
    People as PeopleIcon,
    Security as SecurityIcon,
    Business as BusinessIcon,
    ArrowBack as ArrowBackIcon,
    AddCircleOutline as AddCircleOutlineIcon,
    AccountTree as AccountTreeIcon,
    MenuOpen as MenuOpenIcon,
    ContactSupport as SupportIcon
} from '@mui/icons-material';

const ADMIN_SECTIONS = [
    {
        id: 'users',
        title: 'User Management',
        description: 'Manage application users, their status, and account details.',
        icon: <PeopleIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
        component: <UserSettings />
    },
    {
        id: 'roles',
        title: 'Role & Permissions',
        description: 'Define roles and assign specific permissions to control access.',
        icon: <SecurityIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
        component: <RoleSettings />
    },
    {
        id: 'facility',
        title: 'Facility Settings',
        description: 'Configure institutional details and facility-wide parameters.',
        icon: <BusinessIcon sx={{ fontSize: 40, color: 'success.main' }} />,
        component: <FacilitySettings />
    },
    {
        id: 'module-management',
        title: 'Module Management',
        description: 'Design new modules, define forms/fields, and manage installations.',
        icon: <AddCircleOutlineIcon sx={{ fontSize: 40, color: 'warning.main' }} />,
        component: <ModuleManagement />
    },
    {
        id: 'workflow-automation',
        title: 'Workflow Automation',
        description: 'Configure system triggers and actions for module events.',
        icon: <AccountTreeIcon sx={{ fontSize: 40, color: 'info.main' }} />,
        component: <WorkflowAutomation />
    },
    {
        id: 'menu-management',
        title: 'Menu Management',
        description: 'Configure system menus, locations, hierarchy, and icons.',
        icon: <MenuOpenIcon sx={{ fontSize: 40, color: 'error.main' }} />,
        component: <MenuManagement />
    },
    {
        id: 'support',
        title: 'Support',
        description: 'Get help, access FAQs, and contact the support team.',
        icon: <SupportIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
        component: <Support />
    }
];

function AdministrationPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeSection = searchParams.get('section');
    const dispatch = useDispatch();

    useEffect(() => {
        const adminBreadcrumbs = [
            { label: 'Home', path: APPLICATION_ROUTES.DASHBOARD },
            { label: 'Administration', path: APPLICATION_ROUTES.ADMINISTRATION }
        ];

        if (activeSection) {
            const section = ADMIN_SECTIONS.find(s => s.id === activeSection);
            if (section) {
                adminBreadcrumbs.push({
                    label: section.title,
                    path: `${APPLICATION_ROUTES.ADMINISTRATION}?section=${activeSection}`
                });
            }
        }

        dispatch(setBreadcrumbs(adminBreadcrumbs));
    }, [activeSection, dispatch]);

    const handleBack = () => {
        setSearchParams({});
    };

    const setActiveSection = (sectionId) => {
        setSearchParams({ section: sectionId });
    };

    const currentSection = ADMIN_SECTIONS.find(s => s.id === activeSection);

    return (
        <Box sx={{ width: '100%', minHeight: '80vh' }}>
            {/* Header / Back Button */}
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                {activeSection && (
                    <IconButton onClick={handleBack} color="primary" sx={{ border: '1px solid', borderColor: 'divider' }}>
                        <ArrowBackIcon />
                    </IconButton>
                )}
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {activeSection ? currentSection.title : "Administration"}
                    </Typography>
                    {!activeSection && (
                        <Typography variant="body2" color="text.secondary">
                            Configure and manage your system parameters
                        </Typography>
                    )}
                </Box>
            </Box>

            {!activeSection ? (
                <Fade in={!activeSection} timeout={500}>
                    <Grid container spacing={3}>
                        {ADMIN_SECTIONS.map((section) => (
                            <Grid item xs={12} sm={6} md={4} key={section.id}>
                                <ReusableCardComponent
                                    onClick={() => setActiveSection(section.id)}
                                >
                                    <CardContent sx={{ textAlign: 'center', p: 2 }}>
                                        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                                            {section.icon}
                                        </Box>
                                        <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 600 }}>
                                            {section.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {section.description}
                                        </Typography>
                                    </CardContent>
                                </ReusableCardComponent>
                            </Grid>
                        ))}
                    </Grid>
                </Fade>
            ) : (
                <Fade in={!!activeSection} timeout={500}>
                    <Box sx={{ mt: 2 }}>
                        {currentSection.component}
                    </Box>
                </Fade>
            )}
        </Box>
    );
}

export default AdministrationPage;
