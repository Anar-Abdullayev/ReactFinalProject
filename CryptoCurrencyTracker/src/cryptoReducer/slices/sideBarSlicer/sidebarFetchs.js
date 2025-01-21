import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCryptoHistory } from "./sidebarSlicer";

export const sideBarChartFetch = createAsyncThunk('content/sideBarChartFetch', async (coinId) => {
    let res = await fetch(`https://ajax.coinlore.com/ajax/hdatav5/?coin=${coinId}&time=1d`)
    let data = await res.json();
    return data;
})

export const sideBarCryptoHistory = (coinId) => {
    return async (dispatch) => {
        let res = await fetch(`https://charts.coinlore.com/ajax/hdatav_yoy/?coin=${coinId}`)
        let data = await res.json()
        let lastKey = Object.keys(data).sort().reverse()[0];
        let lastYear = data[lastKey]
        dispatch(getCryptoHistory(lastYear))
    }
}