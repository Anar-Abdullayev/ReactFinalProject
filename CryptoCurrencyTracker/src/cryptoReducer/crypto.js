import cryptoCurrencySlicer from './slices/cryptoCurrencySlicer'

import { configureStore } from "@reduxjs/toolkit";

const crypto = configureStore({
    reducer: {
        cryptoSlice: cryptoCurrencySlicer
    }
});

export default crypto;
