import { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActionArea,
    IconButton,
    Fade,
    Breadcrumbs,
    Link
} from '@mui/material';
import {
    People as PeopleIcon,
    Security as SecurityIcon,
    Business as BusinessIcon,
    ArrowBack as ArrowBackIcon,
    NavigateNext as NavigateNextIcon
} from '@mui/icons-material';
import UserSettings from '../components/administration/UserSettings';
import RoleSettings from '../components/administration/RoleSettings';
import FacilitySettings from '../components/administration/FacilitySettings';

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
    }
];

function AdministrationPage() {
    const [activeSection, setActiveSection] = useState(null);

    const handleBack = () => {
        setActiveSection(null);
    };

    const currentSection = ADMIN_SECTIONS.find(s => s.id === activeSection);

    return (
        <Box sx={{ width: '100%', minHeight: '80vh' }}>
            {/* Header / Breadcrumbs */}
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                {activeSection && (
                    <IconButton onClick={handleBack} color="primary" sx={{ border: '1px solid', borderColor: 'divider' }}>
                        <ArrowBackIcon />
                    </IconButton>
                )}
                <Box>
                    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                        <Link
                            underline="hover"
                            color={activeSection ? "inherit" : "text.primary"}
                            onClick={handleBack}
                            sx={{ cursor: 'pointer', fontWeight: activeSection ? 400 : 700, fontSize: '1.2rem' }}
                        >
                            Administration
                        </Link>
                        {activeSection && (
                            <Typography color="text.primary" sx={{ fontWeight: 700, fontSize: '1.2rem' }}>
                                {currentSection.title}
                            </Typography>
                        )}
                    </Breadcrumbs>
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
                                <Card
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        cursor: "pointer",
                                        flexDirection: 'column',
                                        transition: 'transform 0.2s, box-shadow 0.2s',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: 6,
                                            border: '1px solid #1976d2',
                                            backgroundColor: '#dcecfcff'
                                            
                                        },
                                        borderRadius: 3,
                                        overflow: 'hidden',
                                        border: '1px solid',
                                        borderColor: 'divider'
                                    }}
                                >
                                    <CardActionArea
                                        onClick={() => setActiveSection(section.id)}
                                        sx={{ flexGrow: 1, p: 2 }}
                                    >
                                        <CardContent sx={{ textAlign: 'center' }}>
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
                                    </CardActionArea>
                                </Card>
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
