import { createAsyncThunk } from "@reduxjs/toolkit";

export const sideBarChartFetch = createAsyncThunk('content/cryptoListFetch', async (coinId) => {
    let res = await fetch(`https://ajax.coinlore.com/ajax/hdatav5/?coin=${coinId}&time=1d`)
    let data = await res.json();
    return data;
}) 