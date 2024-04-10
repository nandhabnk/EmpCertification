import { Grid, Typography } from "@mui/material";

import * as Styled from "./HomePage.style";

const HomePage = () => {
  return (
    <Styled.HomePageWrapper>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h2" component="h2" textAlign={"center"}>
          HOME (Work in progress 🚧)
        </Typography>
      </Grid>
    </Styled.HomePageWrapper>
  );
};

export default HomePage;
