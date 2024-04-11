import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Modal,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";

import RequestDetails from "../RequestDetails";

import {
  RequestData,
  RequestState,
} from "../../../../shared/types/requestDetails";

import { requestActions } from "../../../../store/request-slice";

import * as Styled from "./RequestTable.style";

const RequestTable = () => {
  const { allRequests, currentRequest } = useSelector(
    (state: { certificateReq: RequestState }) => state.certificateReq
  );
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const tableHeadings = [
    "Reference No.",
    "Address to",
    "Purpose",
    "Issued on",
    "Status",
  ];

  const handleOpenDetails = (row: RequestData) => {
    dispatch(requestActions.updateCurrentReq(row));
    setIsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsOpen(false);
  };

  const getModal = () => {
    if (Object.keys(currentRequest).length > 0) {
      return (
        <Modal open={isOpen} onClose={handleCloseDetails}>
          <RequestDetails />
        </Modal>
      );
    }
  };

  return (
    <Styled.RequestTableWrapper>
      <Grid container alignItems="center" justifyContent="center">
        <TableContainer component={Paper}>
          <Typography
            variant="h4"
            component="h2"
            textAlign={"center"}
            id="request-table-heading"
          >
            Requests List
          </Typography>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                {tableHeadings.map((heading) => (
                  <TableCell key={heading}>{heading}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {allRequests.map((row: RequestData) => (
                <TableRow
                  key={row.reference_no + row.status}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.reference_no}
                  </TableCell>
                  <TableCell>{row.address_to}</TableCell>
                  <TableCell>{row.purpose}</TableCell>
                  <TableCell>{row.issued_on}</TableCell>
                  <TableCell>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      {row.status}
                      <Button onClick={() => handleOpenDetails(row)}>
                        <VisibilityIcon />
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {getModal()}
      </Grid>
    </Styled.RequestTableWrapper>
  );
};

export default RequestTable;
