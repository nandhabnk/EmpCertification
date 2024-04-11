import { createSlice } from "@reduxjs/toolkit";
import { RequestData, RequestState } from "../shared/types/requestDetails";

const initialRequestState = {
  allRequests: [],
  currentRequest: {},
} as unknown as RequestState;

const requestSlice = createSlice({
  name: "requestSlice",
  initialState: initialRequestState,
  reducers: {
    updateAllReq(state, action) {
      state.allRequests = action.payload;
    },
    updateCurrentReq(state, action) {
      state.currentRequest = action.payload;
    },
    updateDetail(state, action) {
      state.currentRequest = { ...state.currentRequest, ...action.payload };
      state.allRequests = state.allRequests.map((req) => {
        if (
          req.reference_no === state.currentRequest.reference_no &&
          req.status === state.currentRequest.status
        ) {
          return state.currentRequest;
        }
        return req;
      });
    },
  },
});

export const requestActions = requestSlice.actions;
export default requestSlice.reducer;
