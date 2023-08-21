import { useEffect, useState } from "react";
import "./component.css";

const Day = (props) => {
  const [selectday, setSelectday] = useState(false);

  function handleDay(e) {
    if (localStorage.getItem(props.name)) {
      let dayCollection = localStorage.getItem(props.name);
      dayCollection = dayCollection.split(",");

      if (!dayCollection.includes(e.target.value)) {
        dayCollection.push(e.target.value);
      } else if (dayCollection.includes(e.target.value)) {
        let indexOfActivity = dayCollection.indexOf(e.target.value);
        dayCollection.splice(indexOfActivity, 1);
      }
      localStorage.removeItem(props.name);
      localStorage.setItem(props.name, dayCollection);
    } else {
      localStorage.setItem(props.name, e.target.value);
    }

    setSelectday((prevSelectday) => !prevSelectday);
  }
  useEffect(() => {
    if (localStorage.getItem(props.name)) {
      let dayCollection = localStorage.getItem(props.name);
      dayCollection = dayCollection.split(",");
      if (dayCollection.includes(String(props.day))) {
        setSelectday(true);
      }
    }
  }, []);

  return (
    <>
      <button
        type="button"
        className="btn btn-outline-dark butt"
        value={props.day}
        style={
          selectday
            ? { background: "black", color: "white" }
            : { background: "none" }
        }
        onClick={handleDay}
      >
        {props.day}
      </button>
    </>
  );
};

export default Day;
