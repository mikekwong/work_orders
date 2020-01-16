import React from "react";

const Result = ({
  worker,
  result: { deadline, description, name, workerId }
}) => {
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
    let time = `${month}/${date}/${year} ${hourValue}:${min}:${sec} ${dd}`;
    return time;
  };
  return (
    <>
      <ul>
        <li>{name}</li>
        <li>{convertDateTime(deadline)}</li>
        <li>{description}</li>
        <li>{workerId}</li>
        {worker && (
          <div>
            <img alt="worker" src={worker.worker.image} />
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
