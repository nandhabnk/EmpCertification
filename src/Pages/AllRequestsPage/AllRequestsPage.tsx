import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

import { requestActions } from "../../store/request-slice";

import { Grid } from "@mui/material";

import RequestTable from "./Components/RequestTable";

import { RequestState } from "../../shared/types/requestDetails";
import BackdropOverlay from "../../shared/Components/BackdropOverlay";
import { apiKey } from "../../shared/contants";

import ErrorComponent from "../../shared/Components/ErrorComponent";

import * as Styled from "./AllRequestsPage.style";

const AllRequestsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFailure, setIsFailure] = useState(false);

  const { allRequests } = useSelector(
    (state: { certificateReq: RequestState }) => state.certificateReq
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRequests = async () => {
      setIsFailure(false);
      setIsLoading(true);
      try {
        const response = await axios(
          `https://zalexinc.azure-api.net/request-list?subscription-key=${apiKey}`
        );
        dispatch(requestActions.updateAllReq(response.data));
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setIsFailure(true);
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
        {isFailure ? (
          <ErrorComponent type={"unknown"} />
        ) : (
          allRequests && !isLoading && <RequestTable />
        )}
      </Grid>
      <BackdropOverlay isLoading={isLoading} />
    </Styled.AllRequestsPageWrapper>
  );
};

export default AllRequestsPage;
