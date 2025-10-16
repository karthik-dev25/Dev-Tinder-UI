import React from "react";

const ConnectionsCard = ({
  user,
  isConnections = false,
  isRequests = false,
  handleReview,
}) => {
  console.log(user);
  const { photoUrl, firstName, lastName, about } = isConnections ? user : user.fromUserId;
  return (
    <div className="w-[75%] mx-auto flex justify-center items-center mt-4">
      <ul className="list bg-base-100 rounded-box shadow-md w-1/2">
        <li className="list-row">
          <div>
            <img className="size-10 rounded-box" src={photoUrl} />
          </div>
          <div>
            <div>{firstName + " " + lastName}</div>
            <div className="text-xs font-semibold opacity-60">{about}</div>
          </div>
          {isConnections && (
            <button className="btn btn-soft btn-info">Message</button>
          )}
          {isRequests && (
            <div>
              <button
                className="btn btn-soft btn-success mr-2"
                onClick={() => handleReview("accepted", user?._id)}
              >
                Accept
              </button>
              <button
                className="btn btn-soft btn-warning"
                onClick={() => handleReview("rejected", user?._id)}
              >
                Reject
              </button>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default ConnectionsCard;
