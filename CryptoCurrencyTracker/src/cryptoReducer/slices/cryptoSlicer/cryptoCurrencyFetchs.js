import { createAsyncThunk } from "@reduxjs/toolkit";

export const cryptoListFetch = createAsyncThunk('content/cryptoListFetch', async (limitation) => {
    let res = await fetch(`https://api.coinlore.net/api/tickers/?start=${limitation.start}&limit=${limitation.limit}`)
    let data = await res.json();
    return data;
}) 