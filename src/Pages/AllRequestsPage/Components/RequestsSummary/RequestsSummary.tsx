import { useEffect, useState } from "react";

import { Grid, Stack, Typography } from "@mui/material";

import NewReleasesIcon from "@mui/icons-material/NewReleases";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import PendingIcon from "@mui/icons-material/Pending";
import DoneIcon from "@mui/icons-material/Done";

import { RequestData } from "../../../../shared/types/requestDetails";
import { capitalizeWords } from "../../../../shared/utils/tableUtils";

import * as Styled from "./RequestsSummary.style";

const RequestsSummary = ({
  allRequests,
}: {
  allRequests: Array<RequestData>;
}) => {
  const [summaryData, setSummaryData] = useState({
    new: 0,
    "under review": 0,
    pending: 0,
    done: 0,
  });

  useEffect(() => {
    if (allRequests) {
      const states = { new: 0, "under review": 0, pending: 0, done: 0 };
      allRequests.forEach((req) => {
        states[req.status.toLocaleLowerCase() as keyof typeof states]++;
      });
      setSummaryData(states);
    }
  }, [allRequests]);

  const getIcons = (key: string) => {
    switch (key) {
      case "new":
        return <NewReleasesIcon />;
      case "under review":
        return <HourglassTopIcon />;
      case "pending":
        return <PendingIcon />;
      case "done":
        return <DoneIcon />;
      default:
        return "";
    }
  };

  return (
    <Styled.RequestsSummaryWrapper>
      <Grid container direction="row">
        {Object.entries(summaryData).map(([key, value]) => (
          <Typography variant="h6" component="h2">
            <Stack flexDirection="row" alignItems="center">
              <Stack flexDirection="row" alignItems="center">
                {getIcons(key)}
                {capitalizeWords(key)}
              </Stack>
              : {value}
            </Stack>
          </Typography>
        ))}
      </Grid>
    </Styled.RequestsSummaryWrapper>
  );
};

export default RequestsSummary;
