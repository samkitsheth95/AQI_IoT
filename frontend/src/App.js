import React, { useEffect, useState } from "react";
import BarChartShare from "./BarChartShare";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState("");
  const [nowDate, setNowDate] = useState([]);
  useEffect(() => {
    call();
    setInterval(() => {
      call();
    }, 30000);
  }, []);
  function call() {
    axios
      .get("/getData")
      .then(function (response) {
        setNowDate(new Date(response.data[0].date).toDateString());
        response.data.forEach(function (arrayItem) {
          arrayItem.date = new Date(arrayItem.date).toLocaleTimeString();
        });
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const graphOne = { data, key: "pmt_2_5", color: "blue" };
  const graphTwo = { data, key: "aqi_2_5", color: "blue" };
  const graphThree = { data, key: "pmt_10", color: "red" };
  const graphFour = { data, key: "aqi_10", color: "red" };
  return (
    <div className="App">
      <div class="container">
        <nav class="navbar navbar-light bg-light">
          <a class="navbar-brand">Real Time AQI and PM of Santa Clara County</a>
        </nav>
        <br/>
        <p class="font-weight-bold">AQI Table</p>
        <img src="/tq.png" alt="AQI Table" width="648" height="382"></img>
        <p class="font-weight-bold">Based on the value of real-time AQI 2.5 you can determine if the air quality is safe.<br/>
          The numerical value in the table represent the value of AQI 2.5.
        </p>
        <div class="row">
          <div class="col">
            <br />
            
            <p class="font-weight-bold">PM 2.5 Chart Real-Time</p>
            <BarChartShare data={graphOne} />X Axis = Time (PDT) {nowDate}{" "}
            <br /> Y Axis = PM (Particulate Matter) 2.5
          </div>
          <div class="col">
            <br />
            <p class="font-weight-bold">AQI 2.5 Chart Real-Time</p>
            <BarChartShare data={graphTwo} />X Axis = Time (PDT) {nowDate}{" "}
            <br /> Y Axis = AQI (Air Quality Index) 2.5
          </div>
        </div>
        <div className="row">
          <div class="col">
            <br />
            <p class="font-weight-bold">PM 10 Chart Real-Time</p>
            <BarChartShare data={graphThree} />X Axis = Time (PDT) {nowDate}{" "}
            <br /> Y Axis = PM (Particulate Matter) 10
          </div>
          <br />
          <div class="col">
            <br />
            <p class="font-weight-bold">AQI 10 Chart Real-Time</p>
            <BarChartShare data={graphFour} />X Axis = Time (PDT) {nowDate}{" "}
            <br /> Y Axis = AQI (Air Quality Index) 10
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
