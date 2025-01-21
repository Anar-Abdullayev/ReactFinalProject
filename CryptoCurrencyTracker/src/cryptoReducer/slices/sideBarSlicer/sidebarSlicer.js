import { createSlice } from '@reduxjs/toolkit'
import { sideBarChartFetch } from './sidebarFetchs'

let sidebarSlicer = createSlice({
    name: 'sidebarSlicer',
    initialState: {
        chartPriceData: [],
        lastYearHistory: [],
        loading: false,
        error: null
    },
    reducers: {
        getCryptoHistory: (state, action) => {
            state.lastYearHistory = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(sideBarChartFetch.pending, (state, action) => {
            state.loading = true;
            state.error = false;
        })
        builder.addCase(sideBarChartFetch.fulfilled, (state, action) => {
            state.chartPriceData = action.payload.price
            state.loading = true;
            state.error = false;
        })
        builder.addCase(sideBarChartFetch.rejected, (state, action) => {
            state.loading = true;
            state.error = false;
        })
    }
})

export const { getCryptoHistory } = sidebarSlicer.actions
export default sidebarSlicer.reducer