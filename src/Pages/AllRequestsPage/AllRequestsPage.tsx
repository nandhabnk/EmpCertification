import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

import { requestActions } from "../../store/request-slice";

import { Grid } from "@mui/material";

import RequestTable from "./Components/RequestTable";

import { RequestState } from "../../shared/types/requestDetails";

import * as Styled from "./AllRequestsPage.style";

const AllRequestsPage = () => {
  const { allRequests } = useSelector(
    (state: { certificateReq: RequestState }) => state.certificateReq
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios(
          "https://zalexinc.azure-api.net/request-list?subscription-key=43b647491f1d436cb0130a329fcdca50"
        );
        dispatch(requestActions.updateAllReq(response.data));
      } catch (err) {
        console.log("@#@# err", err);
      }
    };

    fetchRequests();
  }, []);

  return (
    <Styled.AllRequestsPageWrapper>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        {allRequests && <RequestTable />}
      </Grid>
    </Styled.AllRequestsPageWrapper>
  );
};

export default AllRequestsPage;
