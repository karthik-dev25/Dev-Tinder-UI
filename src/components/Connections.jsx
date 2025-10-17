import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../store/connectionSlice";
import ConnectionsCard from "./ConnectionsCard";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const [loading, setLoading] = useState(false);

  const getConnections = async () => {
    setLoading(true);
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      setLoading(false);
      dispatch(addConnections(res.data.data));
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getConnections();
  }, []);

  if (loading) return <div className=" flex justify-center items-center h-58 font-bold text-2xl">Loading...</div>;
  if (!connections || connections.length === 0)
    return (
      <div className="flex justify-center items-center h-58 text-2xl font-bold">
        No Connection Found !!
      </div>
    );
  return (
    <div className="w-full flex-col justify-center items-center mt-5">
      <h1 className="flex justify-center text-2xl font-bold mb-5">
        Connections
      </h1>
      {connections.length &&
        connections.map((connection) => (
          <ConnectionsCard user={connection} isConnections />
        ))}
    </div>
  );
};

export default Connections;
