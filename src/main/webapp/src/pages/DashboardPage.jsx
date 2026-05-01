import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setBreadcrumbs } from '../store/slices/uiSlice';
import QuickStats from '../components/dashboard/QuickStats';
import QuickAccess from '../components/dashboard/QuickAccess';
import APPLICATION_ROUTES from '../util/APPLICATION_ROUTES';

const DashboardPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setBreadcrumbs([{ label: 'Home', path: APPLICATION_ROUTES.DASHBOARD }]));
    }, [dispatch]);

    return (
        <Box sx={{ width: '100%', minHeight: '80vh' }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    Overview & Insights
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Welcome back! Here is what is happening in your system today.
                </Typography>
            </Box>

            <QuickStats />
            <QuickAccess />
        </Box>
    );
};

export default DashboardPage;
