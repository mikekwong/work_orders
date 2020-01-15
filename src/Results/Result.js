import React, { useState, useEffect } from "react";
import { BASE_URL } from "../api/hatchways";

const Result = ({
  worker,
  result: { deadline, description, name, workerId }
}) => {
  return (
    <>
      <ul>
        <li>{name}</li>
        <li>{deadline}</li>
        <li>{description}</li>
        <li>{workerId}</li>
        {worker && (
          <div>
            <img src={worker.worker.image} />
            <li>{worker.worker.name}</li>
            <li>{worker.worker.companyName}</li>
            <li>{worker.worker.email}</li>
          </div>
        )}
      </ul>
    </>
  );
};

export default Result;
