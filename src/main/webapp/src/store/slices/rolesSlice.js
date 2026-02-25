import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../setting/interceptor";

/* ------------------ THUNKS ------------------ */

// fetch roles
export const fetchRoles = createAsyncThunk(
    "roles/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/api/roles");
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch roles");
        }
    }
);

// create role
export const addRole = createAsyncThunk(
    "roles/create",
    async (roleData, { rejectWithValue, dispatch }) => {
        try {
            const res = await api.post("/api/roles", roleData);
            dispatch(fetchRoles());
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to create role");
        }
    }
);

// update permissions
export const updatePermissions = createAsyncThunk(
    "roles/updatePermissions",
    async ({ roleId, permissions }, { rejectWithValue, dispatch }) => {
        try {
            const res = await api.put(`/api/roles/${roleId}/permissions`, permissions);
            dispatch(fetchRoles());
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to update permissions");
        }
    }
);

/* ------------------ SLICE ------------------ */

const rolesSlice = createSlice({
    name: "roles",
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetch
            .addCase(fetchRoles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRoles.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchRoles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // create
            .addCase(addRole.pending, (state) => {
                state.loading = true;
            })
            .addCase(addRole.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addRole.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default rolesSlice.reducer;
