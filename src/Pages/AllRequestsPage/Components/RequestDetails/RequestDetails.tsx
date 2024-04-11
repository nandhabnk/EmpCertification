import { Box, Card, Grid, Typography, Divider } from "@mui/material";

import { RequestData } from "../../../../shared/types/requestDetails";

import KeyValuePair from "../../../../shared/Components/KeyValuePair";

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
          <Grid container flexDirection="column">
            <Typography
              variant="h4"
              component="h2"
              textAlign={"center"}
              id="request-details-heading"
            >
              Certificate request details
            </Typography>
            <Divider />
            {Object.entries(sortedCurrentRequest(currentRequest)).map(
              (data, i) => (
                <KeyValuePair key={i} data={data} />
              )
            )}
          </Grid>
        </Box>
      </Card>
    </Styled.RequestDetailsWrapper>
  );
};

export default RequestDetails;
