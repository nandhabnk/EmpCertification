import { useNavigate } from "react-router-dom";

import { Button, Stack, Typography } from "@mui/material";

import * as Styled from "./HomePage.style";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Styled.HomePageWrapper>
      <Stack
        justifyContent="space-between"
        spacing={2}
        padding={2}
        id="home-stack"
      >
        <Stack spacing={2} padding={4} id="home-text-grp" alignItems="center">
          <Typography variant="h2" component="h2" textAlign={"center"}>
            Zalex Certify
          </Typography>
          <Typography variant="h5" component="h2" textAlign={"center"}>
            Welcome to your One-Stop Shop for Employee Certifications
          </Typography>
          <Typography variant="h6" component="h3" textAlign="justify">
            Empowering employees and streamlining HR processes, Zalex Inc.
            introduces a new self-service platform for managing certificates of
            employment. This easy-to-use web app allows you to request,
            generate, and download certificates needed for various purposes, at
            your convenience. Explore the benefits of our streamlined
            certificate management system today!
          </Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-evenly"
          spacing={2}
          id="home-button-grp"
        >
          <Button
            variant="contained"
            onClick={() => navigate("/createRequest")}
          >
            Request Certificate
          </Button>
          <Button variant="contained" onClick={() => navigate("/allRequests")}>
            Requests List
          </Button>
        </Stack>
      </Stack>
    </Styled.HomePageWrapper>
  );
};

export default HomePage;
