import { useState } from "react";
import "./component.css";
import Day from "./Day";

export default function Activity(props) {
  const monthNames = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const currentMonth = new Date().getMonth();
  const month = monthNames[currentMonth];
  const d = new Date();
  const numberofDays = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();

  const [isRemoved, setIsRemoved] = useState(false);
  const [taskDays, setTaskDays] = useState([]);

  function remove() {
    setIsRemoved(true);
    localStorage.removeItem(props.name);

    //Remove the Activity from LocalStroage
    let localActivity = localStorage.getItem("activity");
    localActivity = localActivity.split(",");

    let indexOfActivity = localActivity.indexOf(props.name);
    localActivity.splice(indexOfActivity, 1);
    localStorage.removeItem("activity");

    if (localActivity.length > 0) {
      localStorage.setItem("activity", localActivity);
    }
  }
  if (isRemoved) {
    return null;
  }
  return (
    <>
      <div className="card mb-3 actmain">
        <div className="row g-0">
          <div className="col-md-4 date-task">
            <span>{props.name}</span>
            <p>{month}</p>
          </div>
          <div className="col-md-8">
            <button
              type="button"
              className="btn-close cross"
              aria-label="Close"
              onClick={remove}
            ></button>
            <div className="card-body">
              <p className="card-text">
                {Array.from({ length: numberofDays }, (a, index) => (
                  <Day
                    day={index + 1}
                    name={props.name}
                    taskDays={taskDays}
                    setTaskDays={setTaskDays}
                  />
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
