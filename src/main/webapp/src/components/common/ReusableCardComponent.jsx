import React from 'react';
import { Card, CardActionArea } from '@mui/material';

/**
 * ReusableCardComponent - A styled card component for administration and lists.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {Function} props.onClick - Optional click handler
 * @param {boolean} props.useActionArea - Whether to wrap content in CardActionArea (default: true)
 */
const ReusableCardComponent = ({
    children,
    onClick,
    sx = {},
    useActionArea = true,
    ...props
}) => {
    const cardContent = useActionArea ? (
        <CardActionArea
            onClick={onClick}
            sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                height: '100%'
            }}
        >
            {children}
        </CardActionArea>
    ) : (
        children
    );

    return (
        <Card
            sx={{
                height: '100%',
                maxWidth: 400,
                display: 'flex',
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
                borderColor: 'divider',
                cursor: onClick ? 'pointer' : 'default',
                ...sx
            }}
            {...props}
        >
            {cardContent}
        </Card>
    );
};

export default ReusableCardComponent;
