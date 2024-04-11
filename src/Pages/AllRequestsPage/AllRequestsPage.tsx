import { useEffect, useState } from "react";

import axios from "axios";

import { Grid } from "@mui/material";

import RequestTable from "./Components/RequestTable";

import * as Styled from "./AllRequestsPage.style";

const AllRequestsPage = () => {
  const [allRequests, setAllRequests] = useState();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios(
          "https://zalexinc.azure-api.net/request-list?subscription-key=43b647491f1d436cb0130a329fcdca50"
        );
        setAllRequests(response.data);
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
        {allRequests && <RequestTable tableData={allRequests} />}
      </Grid>
    </Styled.AllRequestsPageWrapper>
  );
};

export default AllRequestsPage;
