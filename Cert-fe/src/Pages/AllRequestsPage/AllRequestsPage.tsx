import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

import { requestActions } from "../../store/request-slice";

import RequestTable from "./Components/RequestTable";

import { RequestState } from "../../shared/types/requestDetails";
import BackdropOverlay from "../../shared/Components/BackdropOverlay";
import ErrorComponent from "../../shared/Components/ErrorComponent";

const AllRequestsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFailure, setIsFailure] = useState(false);

  const { allRequests } = useSelector(
    (state: { certificateReq: RequestState }) => state.certificateReq
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRequests = async () => {
      setIsFailure(false);
      setIsLoading(true);
      try {
        const response = await axios(
          `${import.meta.env.VITE_API_URL}/request-list`
        );
        dispatch(requestActions.updateAllReq(response.data));
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setIsFailure(true);
        console.error("ERROR:", err);
      }
    };

    fetchRequests();
  }, []);

  return (
    <>
      {isFailure ? (
        <ErrorComponent type={"unknown"} />
      ) : (
        allRequests && !isLoading && <RequestTable />
      )}
      <BackdropOverlay isLoading={isLoading} />
    </>
  );
};

export default AllRequestsPage;
