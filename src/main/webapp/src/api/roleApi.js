import axios from 'axios';

const API_URL = '/api/roles';

// Get all roles
export const getAllRoles = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Create a new role
export const createRole = async (roleData) => {
    const response = await axios.post(API_URL, roleData);
    return response.data;
};

// Update role permissions
export const updateRolePermissions = async (roleId, permissions) => {
    const response = await axios.put(`${API_URL}/${roleId}/permissions`, permissions);
    return response.data;
};
