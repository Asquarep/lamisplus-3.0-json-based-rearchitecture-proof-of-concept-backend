import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setBreadcrumbs } from '../../../store/slices/uiSlice';
import APPLICATION_ROUTES from '../../../util/APPLICATION_ROUTES';
import AdminModuleList from './AdminModuleList';
import AdminModuleDetails from './AdminModuleDetails';
import ModuleCreator from '../ModuleCreator'; // We will rename this or use it as is
import { Box, IconButton, Typography } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';

const ModuleManagement = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const view = searchParams.get('view') || 'list';
    const moduleId = searchParams.get('id');
    const { list: modules } = useSelector(state => state.modules);
    const selectedModule = moduleId ? modules.find(m => String(m.id) === String(moduleId)) : null;

    const dispatch = useDispatch();

    useEffect(() => {
        const baseBreadcrumbs = [
            { label: 'Home', path: APPLICATION_ROUTES.DASHBOARD },
            { label: 'Administration', path: APPLICATION_ROUTES.ADMINISTRATION },
            {
                label: 'Module Management',
                path: `${APPLICATION_ROUTES.ADMINISTRATION}?section=module-management`
            }
        ];

        if (view === 'details' && selectedModule) {
            baseBreadcrumbs.push({
                label: selectedModule.name,
                path: `${APPLICATION_ROUTES.ADMINISTRATION}?section=module-management&view=details&id=${selectedModule.id}`
            });
        } else if (view === 'create') {
            baseBreadcrumbs.push({
                label: 'Create New Module',
                path: `${APPLICATION_ROUTES.ADMINISTRATION}?section=module-management&view=create`
            });
        }

        dispatch(setBreadcrumbs(baseBreadcrumbs));
    }, [view, selectedModule, dispatch]);

    const handleBack = () => {
        setSearchParams({ section: 'module-management', view: 'list' });
    };

    const handleSelectModule = (module) => {
        setSearchParams({ section: 'module-management', view: 'details', id: module.id });
    };

    const handleCreateNew = () => {
        setSearchParams({ section: 'module-management', view: 'create' });
    };

    const renderView = () => {
        switch (view) {
            case 'list':
                return <AdminModuleList onSelectModule={handleSelectModule} onCreateNew={handleCreateNew} />;
            case 'details':
                return <AdminModuleDetails module={selectedModule} onBack={handleBack} />;
            case 'create':
                return <ModuleCreator onBack={handleBack} onSave={() => setView('list')} />;
            default:
                return <AdminModuleList onSelectModule={handleSelectModule} onCreateNew={handleCreateNew} />;
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            {view !== 'list' && (
                <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton onClick={handleBack} color="primary" sx={{ border: '1px solid', borderColor: 'divider' }}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {view === 'details' ? selectedModule?.name : 'Create New Module'}
                    </Typography>
                </Box>
            )}
            {renderView()}
        </Box>
    );
};

export default ModuleManagement;
