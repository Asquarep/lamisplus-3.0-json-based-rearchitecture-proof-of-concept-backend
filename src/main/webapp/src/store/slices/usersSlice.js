import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../setting/interceptor";

/* ------------------ THUNKS ------------------ */

// fetch users
export const fetchUsers = createAsyncThunk(
    "users/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/api/users");
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch users");
        }
    }
);

// create user
export const addUser = createAsyncThunk(
    "users/create",
    async (userData, { rejectWithValue, dispatch }) => {
        try {
            const res = await api.post("/api/users", userData);
            dispatch(fetchUsers());
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to create user");
        }
    }
);

// update user
export const updateUser = createAsyncThunk(
    "users/update",
    async ({ id, userData }, { rejectWithValue, dispatch }) => {
        try {
            const res = await api.put(`/api/users/${id}`, userData);
            dispatch(fetchUsers());
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to update user");
        }
    }
);

// delete user
export const deleteUser = createAsyncThunk(
    "users/delete",
    async (id, { rejectWithValue, dispatch }) => {
        try {
            await api.delete(`/api/users/${id}`);
            dispatch(fetchUsers());
            return id;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to delete user");
        }
    }
);

// Toggle user status actions
const createStatusThunk = (type, action) => createAsyncThunk(
    `users/${type}`,
    async (id, { rejectWithValue, dispatch }) => {
        try {
            const res = await api.patch(`/api/users/${id}/${action}`);
            dispatch(fetchUsers());
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || `Failed to ${action} user`);
        }
    }
);

export const activateUser = createStatusThunk("activate", "activate");
export const deactivateUser = createStatusThunk("deactivate", "deactivate");
export const archiveUser = createStatusThunk("archive", "archive");
export const unarchiveUser = createStatusThunk("unarchive", "unarchive");

/* ------------------ SLICE ------------------ */

const usersSlice = createSlice({
    name: "users",
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addMatcher(
                (action) => action.type.endsWith('/pending') && action.type.startsWith('users/'),
                (state) => { state.loading = true; }
            )
            .addMatcher(
                (action) => (action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected')) && action.type.startsWith('users/'),
                (state) => { state.loading = false; }
            );
    },
});

export default usersSlice.reducer;
