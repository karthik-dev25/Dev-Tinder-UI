import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../store/requestsSlice";
import ConnectionsCard from "./ConnectionsCard";
import { showToast } from "../store/toastSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const [loading, setLoading] = useState(false);

  const handleReviewRequest = async (status = "accepted", requestId = "") => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + requestId,
        {},
        { withCredentials: true }
      );
      dispatch(
        showToast({
          type: "success",
          message: "Request " + status + " successfully",
        })
      );
      dispatch(removeRequest(requestId));
    } catch (error) {
      console.log(error);
    }
  };

  const getRequests = async () => {
    setLoading(true);
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      setLoading(false);
      dispatch(addRequests(res.data.data));
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getRequests();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-58 font-bold text-2xl">Loading...</div>;
  if (!requests || requests.length === 0)
    return (
      <div className="flex justify-center items-center h-58 text-2xl font-bold">
        No Requests Found !!
      </div>
    );

  return (
    <div className="w-full flex-col justify-center items-center mt-5">
      <h1 className="flex justify-center text-2xl font-bold mb-5">
        Connection Requests
      </h1>
      {requests.length &&
        requests.map((request) => (
          <ConnectionsCard
            user={request}
            isRequests
            handleReview={handleReviewRequest}
          />
        ))}
    </div>
  );
};

export default Requests;
