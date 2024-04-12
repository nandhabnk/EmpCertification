import { useNavigate } from "react-router-dom";

import { Button, Card, Grid, Stack, Typography } from "@mui/material";

import WarningIcon from "@mui/icons-material/Warning";

import * as Styled from "./ErrorComponent.style";

const ErrorComponent = ({ type = "" }: { type?: string }) => {
  const navigate = useNavigate();

  return (
    <Styled.ErrorComponentWrapper>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Card variant="outlined">
          <Typography variant="h4" component="h2" textAlign={"center"}>
            <WarningIcon fontSize="large" sx={{ color: "#ff4545" }} />
            {type === "unknown"
              ? "Something went wrong. Please try again"
              : "404: Page not found"}
          </Typography>
          <Stack direction="row" spacing={2}>
            {type === "unknown" ? (
              <Button
                variant="contained"
                onClick={() => window.location.reload()}
              >
                Retry
              </Button>
            ) : (
              <Button variant="contained" onClick={() => navigate("/home")}>
                HOME
              </Button>
            )}

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
