import React from "react";

const FeedCard = ({ feed, handleSendRequest }) => {
  const { firstName, lastName, photoUrl, _id } = feed;

  return (
    <div className="card bg-base-100 w-78 shadow-sm">
      <figure>
        <img
          src={
            photoUrl ||
            "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          }
          alt="user"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{feed?.about}</p>
        <div className="card-actions justify-between">
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignored
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
