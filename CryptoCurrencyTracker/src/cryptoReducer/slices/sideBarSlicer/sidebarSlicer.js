import { createSlice } from '@reduxjs/toolkit'
import { sideBarChartFetch } from './sidebarFetchs'

let sidebarSlicer = createSlice({
    name: 'sidebarSlice',
    initialState: {
        sideBar: [],
        loading: false,
        error: null
    },
    reducers: {
        test: (state, action) => {

        }
    },
    extraReducers: (builder) => {
        builder.addCase(sideBarChartFetch.pending, (state, action) => {
            state.loading = true;
            state.error = false;
        })
        builder.addCase(sideBarChartFetch.fulfilled, (state, action) => {
            state.loading = true;
            state.error = false;
        })
        builder.addCase(sideBarChartFetch.rejected, (state, action) => {
            state.loading = true;
            state.error = false;
        })
    }
})

export const { test } = sidebarSlicer.actions
export default sidebarSlicer.reducer