import { Card, CardContent, Grid, Typography } from "@mui/material";

import * as Styled from "./CreateRequestPage.style";
import CreateForm from "./Components/CreateForm";

const CreateRequestPage = () => {
  return (
    <Styled.CreateRequestPageWrapper>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Card variant="outlined">
          <Typography
            variant="h4"
            component="h2"
            textAlign={"center"}
            id="create-request-heading"
          >
            Request Certificate
          </Typography>
          <CardContent>
            <CreateForm />
          </CardContent>
        </Card>
      </Grid>
    </Styled.CreateRequestPageWrapper>
  );
};

export default CreateRequestPage;
