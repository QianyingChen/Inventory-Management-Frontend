import { configureStore  } from '@reduxjs/toolkit';
import { warehouseApi } from './api/warehouseApi';

const store = configureStore ({
  reducer: {
    [warehouseApi.reducerPath]: warehouseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(warehouseApi.middleware),
});

export default store;

