import { useNavigate } from "react-router-dom";

import { Button, Card, Grid, Stack, Typography } from "@mui/material";

import * as Styled from "./ErrorComponent.style";

const ErrorComponent = () => {
  const navigate = useNavigate();

  return (
    <Styled.ErrorComponentWrapper>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Card>
          <Typography variant="h2" component="h2" textAlign={"center"}>
            404: Page not found
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={() => navigate("/home")}>
              HOME
            </Button>
            <Button variant="contained" onClick={() => navigate(-1)}>
              Back
            </Button>
          </Stack>
        </Card>
      </Grid>
    </Styled.ErrorComponentWrapper>
  );
};

export default ErrorComponent;
