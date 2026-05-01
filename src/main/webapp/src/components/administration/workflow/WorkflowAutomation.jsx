import React, { useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setBreadcrumbs } from '../../../store/slices/uiSlice';
import APPLICATION_ROUTES from '../../../util/APPLICATION_ROUTES';
import WorkflowList from './WorkflowList';
import WorkflowEditor from './WorkflowEditor';

const WorkflowAutomation = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const view = searchParams.get('view') || 'list';
    const dispatch = useDispatch();

    useEffect(() => {
        const baseBreadcrumbs = [
            { label: 'Home', path: APPLICATION_ROUTES.DASHBOARD },
            { label: 'Administration', path: APPLICATION_ROUTES.ADMINISTRATION },
            {
                label: 'Workflow Automation',
                path: `${APPLICATION_ROUTES.ADMINISTRATION}?section=workflow-automation`
            }
        ];

        if (view === 'create') {
            baseBreadcrumbs.push({
                label: 'Create Workflow',
                path: `${APPLICATION_ROUTES.ADMINISTRATION}?section=workflow-automation&view=create`
            });
        }

        dispatch(setBreadcrumbs(baseBreadcrumbs));
    }, [view, dispatch]);

    const handleBack = () => {
        setSearchParams({ section: 'workflow-automation', view: 'list' });
    };

    const handleCreateNew = () => {
        setSearchParams({ section: 'workflow-automation', view: 'create' });
    };

    const renderView = () => {
        switch (view) {
            case 'list':
                return <WorkflowList onCreateNew={handleCreateNew} />;
            case 'create':
                return <WorkflowEditor onBack={handleBack} onSave={handleBack} />;
            default:
                return <WorkflowList onCreateNew={handleCreateNew} />;
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
                        Create Workflow
                    </Typography>
                </Box>
            )}
            {renderView()}
        </Box>
    );
};

export default WorkflowAutomation;
