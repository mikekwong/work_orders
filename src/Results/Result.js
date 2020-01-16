import React from "react";
import "./Result.css";

const Result = ({ worker, result: { deadline, description, name } }) => {
  const convertDateTime = deadline => {
    let a = new Date(deadline * 1000);
    let year = a.getFullYear();
    let month = a.getMonth() + 1;
    let date = a.getDate();
    let hour = a.getHours();
    let dd = "AM";
    if (hour >= 12) {
      dd = "PM";
    }
    let hourValue = "";
    if (hour > 0 && hour <= 12) {
      hourValue = "" + hour;
    } else if (hour > 12) {
      hourValue = "" + (hour - 12);
    } else if (hour === 0) {
      hourValue = "12";
    }
    let min =
      a.getMinutes().toString().length === 1
        ? `0${a.getMinutes()}`
        : a.getMinutes();
    let sec =
      a.getSeconds().toString().length === 1
        ? `0${a.getSeconds()}`
        : a.getSeconds();

    return `${month}/${date}/${year} ${hourValue}:${min}:${sec} ${dd}`;
  };

  return (
    <div className="container-workorder">
      <div className="workorder-info">
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
      <div className="workorder-worker">
        <img alt="worker" src={worker.worker.image} />
        <div className="workorder-workerInfo">
          <p>{worker.worker.name}</p>
          <p>{worker.worker.companyName}</p>
          <p>{worker.worker.email}</p>
        </div>
      </div>
      <div className="workorder-datetime">
        <p>{convertDateTime(deadline)}</p>
      </div>
    </div>
  );
};

export default Result;
