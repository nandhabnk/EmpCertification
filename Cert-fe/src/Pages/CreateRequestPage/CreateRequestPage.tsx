import { useState } from "react";

import axios from "axios";

import { Alert, Card, CardContent, Grid, Typography } from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";

import CreateForm from "./Components/CreateForm";

import { RequestBody } from "../../shared/types/requestDetails";

import BackdropOverlay from "../../shared/Components/BackdropOverlay";

import { toast } from "react-toastify";

import * as Styled from "./CreateRequestPage.style";
const CreateRequestPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);

  const requestCertificate = async (
    reqBody: RequestBody,
    isDateValid: boolean,
    reset: () => void
  ) => {
    setIsSuccess(false);
    setIsFailure(false);
    if (!isDateValid) return;
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/request-certificate`,
        reqBody
      );
      if (response.data.responce === "Ok") {
        reset();
        setIsFailure(false);
        setIsSuccess(true);
        setIsLoading(false);
        toast.success("The certificate request is successfully created!", {
          toastId: "request created successfully",
        });
      }
    } catch (err) {
      setIsFailure(true);
      setIsSuccess(false);
      setIsLoading(false);
      toast.error(
        "Something went wrong during the certificate request! Please try again",
        { toastId: "request created failed" }
      );
      console.error("ERROR:", err);
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
