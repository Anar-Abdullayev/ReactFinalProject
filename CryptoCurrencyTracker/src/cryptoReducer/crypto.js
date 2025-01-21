import cryptoCurrencySlicer from './slices/cryptoSlicer/cryptoCurrencySlicer'

import { configureStore } from "@reduxjs/toolkit";

const crypto = configureStore({
    reducer: {
        cryptoSlice: cryptoCurrencySlicer,
        sidebarSlice: s
    }
});

export default crypto;
