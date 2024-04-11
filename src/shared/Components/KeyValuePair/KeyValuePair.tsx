import { Grid, Typography } from "@mui/material";

import * as Styled from "./KeyValuePair.style";

const KeyValuePair = ({ data }: { data: Array<string | number> }) => {
  console.log("@#@DATA", data);
  const headingFormatter = (heading: string) => {
    return heading
      .replace("_", " ")
      .replace(/(^|\s)([a-z])/g, function (match, p1, p2) {
        return p1 + p2.toUpperCase();
      });
  };

  return (
    <Styled.KeyValuePairWrapper>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Typography variant="h6">
            {headingFormatter(data[0] as string)}:
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6">{data[1]}</Typography>
        </Grid>
      </Grid>
    </Styled.KeyValuePairWrapper>
  );
};

export default KeyValuePair;
