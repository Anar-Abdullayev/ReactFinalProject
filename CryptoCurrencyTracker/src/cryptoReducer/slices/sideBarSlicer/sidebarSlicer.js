import { createSlice } from '@reduxjs/toolkit'
import { sideBarChartFetch } from './sidebarFetchs'

let sidebarSlicer = createSlice({
    name: 'sidebarSlicer',
    initialState: {
        crypto: [],
        chartPriceData: [],
        lastYearHistory: [],
        visible: false,
        loading: false,
        error: null
    },
    reducers: {
        getCryptoHistory: (state, action) => {
            state.lastYearHistory = action.payload
        },
        setCryptoId: (state, action) => {
            state.crypto = action.payload
            state.visible = true
        },
        setCrpytoInfoVisibility: (state, action) => {
            state.visible = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(sideBarChartFetch.pending, (state, action) => {
            state.loading = true;
            state.error = false;
        })
        builder.addCase(sideBarChartFetch.fulfilled, (state, action) => {
            if (action.payload)
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

export const { getCryptoHistory, setCryptoId, setCrpytoInfoVisibility } = sidebarSlicer.actions
export default sidebarSlicer.reducer