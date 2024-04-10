import { Grid, Typography } from "@mui/material";

import * as Styled from "./CreateRequestPage.style";

const CreateRequestPage = () => {
  return (
    <Styled.CreateRequestPageWrapper>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h2" component="h2" textAlign={"center"}>
          Create Request (Work in progress 🚧)
        </Typography>
      </Grid>
    </Styled.CreateRequestPageWrapper>
  );
};

export default CreateRequestPage;
