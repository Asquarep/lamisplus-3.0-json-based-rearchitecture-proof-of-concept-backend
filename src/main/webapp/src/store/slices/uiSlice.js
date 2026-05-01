import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    breadcrumbs: [
        { label: 'Home', path: '/app/dashboard' }
    ]
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setBreadcrumbs: (state, action) => {
            // Ensure Home is always at the root if not provided
            const newBreadcrumbs = action.payload;
            if (newBreadcrumbs.length > 0 && newBreadcrumbs[0].label !== 'Home') {
                state.breadcrumbs = [{ label: 'Home', path: '/app/dashboard' }, ...newBreadcrumbs];
            } else {
                state.breadcrumbs = newBreadcrumbs.length > 0 ? newBreadcrumbs : initialState.breadcrumbs;
            }
        },
        updateLastBreadcrumb: (state, action) => {
            if (state.breadcrumbs.length > 0) {
                state.breadcrumbs[state.breadcrumbs.length - 1] = {
                    ...state.breadcrumbs[state.breadcrumbs.length - 1],
                    ...action.payload
                };
            }
        },
        pushBreadcrumb: (state, action) => {
            state.breadcrumbs.push(action.payload);
        },
        popBreadcrumb: (state) => {
            if (state.breadcrumbs.length > 1) {
                state.breadcrumbs.pop();
            }
        }
    }
});

export const { setBreadcrumbs, updateLastBreadcrumb, pushBreadcrumb, popBreadcrumb } = uiSlice.actions;
export default uiSlice.reducer;
