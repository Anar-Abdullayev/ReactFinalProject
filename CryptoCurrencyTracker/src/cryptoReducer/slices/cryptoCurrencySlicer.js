import { createSlice } from '@reduxjs/toolkit'
import { cryptoListFetch } from './cryptoCurrencyFetchs'

let cryptoCurrencySlice = createSlice({
    name: 'cryptoState',
    initialState: {
        cryptoListArray: [],
        loading: false,
        error: null,
        count: 0
    },
    reducers: {
        getCryptoList: (state, action) => {
            state.cryptoListArray = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(cryptoListFetch.pending, (state, action) => {
            state.loading = true
            state.error = false
        })
        builder.addCase(cryptoListFetch.fulfilled, (state, action) => {
            state.loading = false
            state.cryptoListArray = action.payload.data
            state.count = action.payload.info.coins_num
        })
        builder.addCase(cryptoListFetch.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})

export const { getCryptoList } = cryptoCurrencySlice.actions
export default cryptoCurrencySlice.reducer