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
      const sortedCurrentRequest = ({
        reference_no,
        address_to,
        purpose,
        issued_on,
        status,
      }: RequestData) => {
        const issuedOn =
          status.toLocaleLowerCase() === "done" ? { issued_on } : {};
        return { reference_no, address_to, purpose, ...issuedOn, status };
      };
      state.currentRequest = sortedCurrentRequest(action.payload);
    },
    updateDetail(state, action) {
      state.currentRequest = { ...state.currentRequest, ...action.payload };
      state.allRequests = state.allRequests.map((req) => {
        if (req.reference_no === state.currentRequest.reference_no) {
          return state.currentRequest;
        }
        return req;
      });
    },
  },
});

export const requestActions = requestSlice.actions;
export default requestSlice.reducer;
