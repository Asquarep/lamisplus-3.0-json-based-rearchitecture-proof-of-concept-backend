import { useSelector } from 'react-redux';

/**
 * Hook to check if the current user has specific permissions.
 */
const usePermissions = () => {
    const { user } = useSelector((state) => state.auth);

    const hasPermission = (permissionName) => {
        if (!user || !user.roles) return false;

        // Check if any role has the permission
        return user.roles.some(role =>
            role.permissions && role.permissions.some(p => p.name === permissionName)
        );
    };

    const hasAnyPermission = (permissionNames) => {
        return permissionNames.some(name => hasPermission(name));
    };

    const hasAllPermissions = (permissionNames) => {
        return permissionNames.every(name => hasPermission(name));
    };

    const isAdmin = () => {
        if (!user || !user.roles) return false;
        return user.roles.some(role => role.name === 'ADMIN');
    };

    return { hasPermission, hasAnyPermission, hasAllPermissions, isAdmin };
};

export default usePermissions;
