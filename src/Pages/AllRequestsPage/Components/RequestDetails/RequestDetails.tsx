import { PDFViewer } from "@react-pdf/renderer";

import { Box, Card, Grid, Typography, Divider, Stack } from "@mui/material";

import InfoIcon from "@mui/icons-material/Info";

import { RequestData } from "../../../../shared/types/requestDetails";
import KeyValuePair from "../../../../shared/Components/KeyValuePair";

import RequestPdfDoc from "../RequestPdfDoc";

import * as Styled from "./RequestDetails.style";

const RequestDetails = ({
  currentRequest,
}: {
  currentRequest: RequestData;
}) => {
  const sortedCurrentRequest = ({
    reference_no,
    address_to,
    purpose,
    issued_on,
    status,
  }: RequestData) => {
    const issuedOn = status.toLocaleLowerCase() === "done" ? { issued_on } : {};
    return { reference_no, address_to, purpose, ...issuedOn, status };
  };
  return (
    <Styled.RequestDetailsWrapper>
      <Card variant="outlined">
        <Box>
          <Typography
            variant="h4"
            component="h2"
            textAlign={"center"}
            id="request-details-heading"
          >
            Certificate request details
          </Typography>
          <Grid
            container
            flexDirection="row"
            justifyContent="space-around"
            padding={"10px"}
          >
            <Grid item xs={6}>
              {Object.entries(sortedCurrentRequest(currentRequest)).map(
                (data) => (
                  <div key={data[0]}>
                    <KeyValuePair data={data} />
                    <Divider />
                  </div>
                )
              )}
            </Grid>
            <Grid item xs={4} alignContent="space-around">
              {currentRequest.status.toLowerCase() === "done" ? (
                <PDFViewer>
                  <RequestPdfDoc currentRequest={currentRequest} />
                </PDFViewer>
              ) : (
                <Stack alignItems="center">
                  <InfoIcon fontSize="large" color="primary" />
                  <Typography variant="h4" component="h2" textAlign={"center"}>
                    Certificate is yet to be issued.
                  </Typography>
                </Stack>
              )}
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Styled.RequestDetailsWrapper>
  );
};

export default RequestDetails;
