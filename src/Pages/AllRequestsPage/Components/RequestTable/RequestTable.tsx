import { useMemo, useState } from "react";
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
  TableSortLabel,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";

import RequestDetails from "../RequestDetails";

import {
  RequestData,
  RequestState,
} from "../../../../shared/types/requestDetails";
import { dateFormatter } from "../../../../shared/utils/tableUtils";
import { tableHeadings } from "../../../../shared/contants";

import { requestActions } from "../../../../store/request-slice";

import * as Styled from "./RequestTable.style";

const RequestTable = () => {
  const { allRequests, currentRequest } = useSelector(
    (state: { certificateReq: RequestState }) => state.certificateReq
  );
  const [isOpen, setIsOpen] = useState(false);
  const [orderBy, setOrderBy] = useState<keyof RequestData>("status");
  const [order, setOrder] = useState<"asc" | "desc" | undefined>("asc");

  const dispatch = useDispatch();

  const handleRequestSort = (property: keyof RequestData) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = useMemo(() => {
    let sorted = allRequests.map((request: RequestData) => {
      return { ...request, issued_on: new Date(request.issued_on as string) };
    });
    if (orderBy) {
      sorted.sort((a, b) => {
        const isDesc = order === "desc";
        if (a[orderBy] < b[orderBy]) {
          return isDesc ? 1 : -1;
        }
        if (a[orderBy] > b[orderBy]) {
          return isDesc ? -1 : 1;
        }
        return 0;
      });
    }

    console.log("@#@# SORTED AF", sorted);
    return sorted.map((request: RequestData) => {
      return {
        ...request,
        issued_on: dateFormatter(request.issued_on as Date),
      };
    });
  }, [allRequests, orderBy, order]);

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
                {tableHeadings.map((heading) => {
                  if (heading === "Issued on" || heading === "Status") {
                    const headingId =
                      heading === "Issued on" ? "issued_on" : "status";
                    return (
                      <TableCell key={heading}>
                        <TableSortLabel
                          active={orderBy === headingId}
                          direction={orderBy === headingId ? order : "asc"}
                          onClick={() => handleRequestSort(headingId)}
                        >
                          {heading}
                        </TableSortLabel>
                      </TableCell>
                    );
                  }
                  return <TableCell key={heading}>{heading}</TableCell>;
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData.map((row: RequestData) => (
                <TableRow
                  key={row.reference_no + row.status}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.reference_no}
                  </TableCell>
                  <TableCell>{row.address_to}</TableCell>
                  <TableCell>{row.purpose}</TableCell>
                  <TableCell>{row.issued_on as string}</TableCell>
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
