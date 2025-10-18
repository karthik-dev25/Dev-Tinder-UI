import React, { useEffect } from "react";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeFeed } from "../../store/feedSlice";
import FeedCard from "./FeedCard";
import { useNavigate } from "react-router";
import { showToast } from "../../store/toastSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const feeds = useSelector((store) => store.feed);
  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeFeed(userId));
      const messsage = status === "ignored" ? status : "sent";
      dispatch(
        showToast({
          type: "success",
          message: "Connection " + messsage + " successfully",
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        showToast({
          type: "error",
          message: error.response.data,
        })
      );
    }
  };
  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
      console.log(error);
    }
  };
  useEffect(() => {
    if (!feeds) getFeed();
  }, []);
  return (
    <div className="flex justify-center items-center h-[40rem] lg:h-[28rem]">
        {feeds?.length ? (
          <FeedCard feed={feeds?.[0]} handleSendRequest={handleSendRequest} />
        ) : (
          <div className="text-2xl font-bold">No Dev Feeds available!!</div>
        )}
    </div>
  );
};

export default Feed;
