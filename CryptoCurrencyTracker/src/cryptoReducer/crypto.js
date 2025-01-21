import cryptoCurrencySlicer from './slices/cryptoSlicer/cryptoCurrencySlicer'
import sidebarSlicer from './slices/sideBarSlicer/sidebarSlicer'

import { configureStore } from "@reduxjs/toolkit";

const crypto = configureStore({
    reducer: {
        cryptoSlice: cryptoCurrencySlicer,
        sidebarSlice: sidebarSlicer
    }
});

export default crypto;
