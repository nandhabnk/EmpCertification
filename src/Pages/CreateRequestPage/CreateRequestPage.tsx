import { useState } from "react";

import axios from "axios";

import { Alert, Card, CardContent, Grid, Typography } from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";

import CreateForm from "./Components/CreateForm";

import { RequestBody } from "../../shared/types/requestDetails";
import { apiKey } from "../../shared/contants";

import BackdropOverlay from "../../shared/Components/BackdropOverlay";

import * as Styled from "./CreateRequestPage.style";

const CreateRequestPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);

  const requestCertificate = async (reqBody: RequestBody) => {
    setIsSuccess(false);
    setIsFailure(false);
    setIsLoading(true);
    try {
      const response = await axios.post(
        `https://zalexinc.azure-api.net/request-certificate?subscription-key=${apiKey}`,
        reqBody
      );
      if (response.data.responce === "Ok") {
        setIsFailure(false);
        setIsSuccess(true);
        setIsLoading(false);
      }
    } catch (err) {
      setIsFailure(true);
      setIsSuccess(false);
      setIsLoading(false);
    }
  };
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
            <CreateForm requestCertificate={requestCertificate} />
            {(isSuccess || isFailure) && (
              <Alert
                icon={<CheckIcon fontSize="inherit" />}
                severity={isSuccess ? "success" : "error"}
              >
                {isSuccess
                  ? "Certificate succesfully requested!"
                  : "Something went wrong! Please try again."}
              </Alert>
            )}
          </CardContent>
        </Card>
      </Grid>
      <BackdropOverlay isLoading={isLoading} />
    </Styled.CreateRequestPageWrapper>
  );
};

export default CreateRequestPage;
