import React from "react";

export const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, about, skills, photoUrl } = user;
  return (
    <div className="card card-compact bg-base-300 w-96 shadow-xl">
      <figure>
        <img src={photoUrl} alt="Dev" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center">
          <button className="btn btn-primary">Ignored</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};
