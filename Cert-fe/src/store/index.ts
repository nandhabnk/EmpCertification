import { configureStore } from "@reduxjs/toolkit";
import requestReducer from "./request-slice";

const store = configureStore({
  reducer: {
    certificateReq: requestReducer,
  },
});

export default store;
