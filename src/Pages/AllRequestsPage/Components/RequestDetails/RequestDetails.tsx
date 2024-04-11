import { useSelector } from "react-redux";

import { PDFViewer } from "@react-pdf/renderer";

import { Box, Card, Grid, Typography, Divider, Stack } from "@mui/material";

import InfoIcon from "@mui/icons-material/Info";

import { RequestState } from "../../../../shared/types/requestDetails";
import KeyValuePair from "../../../../shared/Components/KeyValuePair";

import RequestPdfDoc from "../RequestPdfDoc";

import * as Styled from "./RequestDetails.style";

const RequestDetails = () => {
  const { currentRequest } = useSelector(
    (state: { certificateReq: RequestState }) => state.certificateReq
  );
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
              {Object.entries(currentRequest).map((data) => (
                <div key={data[0]}>
                  <KeyValuePair data={data} status={currentRequest.status} />
                  <Divider />
                </div>
              ))}
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
