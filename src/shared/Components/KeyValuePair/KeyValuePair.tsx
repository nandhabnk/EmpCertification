import { Button, Grid, Typography } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

import TextAreaField from "../TextAreaField";

import * as Styled from "./KeyValuePair.style";
import { useState } from "react";

const KeyValuePair = ({
  data,
  status,
}: {
  data: Array<string | number>;
  status: string;
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const headingFormatter = (heading: string) => {
    return heading
      .replace("_", " ")
      .replace(/(^|\s)([a-z])/g, function (match, p1, p2) {
        return p1 + p2.toUpperCase();
      });
  };

  const updateIsEditting = (val: boolean) => {
    setIsEditing(val);
  };

  const isPurposeEditable =
    data[0] === "purpose" && status.toLowerCase() === "new";

  return (
    <Styled.KeyValuePairWrapper>
      {isPurposeEditable && isEditing ? (
        <Grid container>
          <TextAreaField
            data={[headingFormatter(data[0] as string), data[1]]}
            updateIsEditting={updateIsEditting}
          />
        </Grid>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "bold",
              }}
            >
              {headingFormatter(data[0] as string)}:
              {isPurposeEditable && (
                <Grid item>
                  <Button onClick={() => updateIsEditting(true)}>
                    Edit <EditIcon />
                  </Button>
                </Grid>
              )}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">{data[1]}</Typography>
          </Grid>
        </Grid>
      )}
    </Styled.KeyValuePairWrapper>
  );
};

export default KeyValuePair;
