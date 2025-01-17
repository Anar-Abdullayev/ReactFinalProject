import { createAsyncThunk } from "@reduxjs/toolkit";

export const cryptoListFetch = createAsyncThunk('content/cryptoListFetch', async () => {
    let res = await fetch('https://api.coinlore.net/api/tickers/')
    let data = await res.json();
    return data.data;
}) 