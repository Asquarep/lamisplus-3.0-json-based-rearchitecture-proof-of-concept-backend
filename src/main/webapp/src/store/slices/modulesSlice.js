import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../setting/interceptor";

/* ------------------ THUNKS ------------------ */

// fetch modules
export const fetchModules = createAsyncThunk(
  "modules/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/modules");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch modules");
    }
  }
);

// upload module
export const uploadModule = createAsyncThunk(
  "modules/upload",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      await api.post("/api/modules/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (err) {
      return rejectWithValue(err.response?.data || "Upload failed");
    }
  }
);

// module actions
export const activateModule = createAsyncThunk(
  "modules/activate",
  async (id, { rejectWithValue }) => {
    try {
      await api.post(`/api/modules/${id}/activate`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const deactivateModule = createAsyncThunk(
  "modules/deactivate",
  async (id, { rejectWithValue }) => {
    try {
      await api.post(`/api/modules/${id}/deactivate`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const uninstallModule = createAsyncThunk(
  "modules/uninstall",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/api/modules/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const checkModuleUpdates = createAsyncThunk(
  "modules/checkUpdates",
  async (id, { rejectWithValue }) => {
    try {
      await api.post(`/api/modules/${id}/check-updates`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

/* ------------------ SLICE ------------------ */

const modulesSlice = createSlice({
  name: "modules",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchModules.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchModules.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchModules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // uninstall
      .addCase(uninstallModule.fulfilled, (state, action) => {
        state.list = state.list.filter(m => m.id !== action.payload);
      });
  },
});

export default modulesSlice.reducer;
