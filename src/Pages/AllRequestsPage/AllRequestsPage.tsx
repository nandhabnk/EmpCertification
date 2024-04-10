import { Grid, Typography } from "@mui/material";

import * as Styled from "./AllRequestsPage.style";

const AllRequestsPage = () => {
  return (
    <Styled.AllRequestsPageWrapper>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h2" component="h2" textAlign={"center"}>
          All Requests (Work in progress 🚧)
        </Typography>
      </Grid>
    </Styled.AllRequestsPageWrapper>
  );
};

export default AllRequestsPage;
