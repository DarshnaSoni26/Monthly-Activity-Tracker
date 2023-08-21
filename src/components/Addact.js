import { useEffect, useState } from "react";
import "./component.css";
import Activity from "./Activity";

export default function Addact() {
  const [taskName, setTaskName] = useState("");
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("activity")) {
      let localActivity = localStorage.getItem("activity");
      localActivity = localActivity.split(",");
      setActivities(localActivity);
    }
  }, []);

  useEffect(() => {
    if (activities.length > 0) {
      localStorage.setItem("activity", activities);
    }
  }, [activities]);

  function addAct() {
    if (taskName !== "") {
      setActivities([...activities, taskName]); // Append new activity to the activities array
      setTaskName(""); // Reset the input field after adding
    }
  }

  return (
    <>
      <form className="Main">
        <h1>Monthly Activity Tracker</h1>

        <div className="cntnt">
          <input
            type="text"
            className="form-control"
            placeholder="Add Activity"
            onChange={(e) => {
              setTaskName(e.target.value);
            }}
          />
          <span>*Can't be Empty</span>
          <br />
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={addAct}
            style={{ float: "right" }}
          >
            ADD
          </button>
        </div>
      </form>
      {activities.map((activity) => (
        <Activity name={activity} />
      ))}
    </>
  );
}
