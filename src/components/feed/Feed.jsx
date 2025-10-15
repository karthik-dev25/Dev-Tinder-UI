import React, { useEffect } from "react";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../../store/feedSlice";
import FeedCard from "./FeedCard";
import { useNavigate } from "react-router";

const Feed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const feeds = useSelector((store) => store.feed);
  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
      console.log(error)
    }
  };
  useEffect(() => {
    if (!feeds) getFeed();
  }, []);
  return (
    <div className="flex justify-center items-center h-96">
     {feeds && <FeedCard feed={feeds?.[0]}/>}
    </div>
  );
};

export default Feed;
