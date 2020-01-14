import React from "react";

const Result = ({ result: { deadline, description, name, workerId } }) => {
  return (
    <>
      <ul>
        <li>{deadline}</li>
        <li>{description}</li>
        <li>{name}</li>
        <li>{workerId}</li>
      </ul>
    </>
  );
};

export default Result;
