import { createSlice } from "@reduxjs/toolkit";
import { RequestData } from "../shared/types/requestDetails";

const initialRequestState = { allRequests: [], currentRequest: {} };

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
  },
});

export const requestActions = requestSlice.actions;
export default requestSlice.reducer;
