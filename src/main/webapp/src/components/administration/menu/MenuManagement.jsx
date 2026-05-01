import React, { useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setBreadcrumbs } from '../../../store/slices/uiSlice';
import APPLICATION_ROUTES from '../../../util/APPLICATION_ROUTES';
import MenuList from './MenuList';
import MenuEditor from './MenuEditor';

const MenuManagement = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const view = searchParams.get('view') || 'list';
    const dispatch = useDispatch();

    useEffect(() => {
        const baseBreadcrumbs = [
            { label: 'Home', path: APPLICATION_ROUTES.DASHBOARD },
            { label: 'Administration', path: APPLICATION_ROUTES.ADMINISTRATION },
            {
                label: 'Menu Management',
                path: `${APPLICATION_ROUTES.ADMINISTRATION}?section=menu-management`
            }
        ];

        if (view === 'create') {
            baseBreadcrumbs.push({
                label: 'Create Menu',
                path: `${APPLICATION_ROUTES.ADMINISTRATION}?section=menu-management&view=create`
            });
        }

        dispatch(setBreadcrumbs(baseBreadcrumbs));
    }, [view, dispatch]);

    const handleBack = () => {
        setSearchParams({ section: 'menu-management', view: 'list' });
    };

    const handleCreateNew = () => {
        setSearchParams({ section: 'menu-management', view: 'create' });
    };

    const renderView = () => {
        switch (view) {
            case 'list':
                return <MenuList onCreateNew={handleCreateNew} />;
            case 'create':
                return <MenuEditor onBack={handleBack} onSave={handleBack} />;
            default:
                return <MenuList onCreateNew={handleCreateNew} />;
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
                        Create Menu Item
                    </Typography>
                </Box>
            )}
            {renderView()}
        </Box>
    );
};

export default MenuManagement;
