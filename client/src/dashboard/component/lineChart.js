import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import moment from "moment"; // for timezone conversion
import '../style/dashboard.css'

const WarehouseGraph = () => {
  const [data, setData] = useState([]);
  async function fetchGraph(){
    try {
      const res = await fetch("http://127.0.0.1:8080/warehouseall");
      const json = await res.json();
      const convertedData = json.result.map((item) => {
        const timestamp = moment(item.Timestamp).format("YYYY-MM-DD HH:mm:ss");
        return { ...item, Timestamp: timestamp };
      });
      setData(convertedData);
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
      fetchGraph();
      const intervalId = setInterval(() => {
        fetchGraph(); // Fetch data every 10 seconds
      }, 10000); // 10000 milliseconds = 10 seconds
      // Clear the interval when the component unmounts
      return () => {
        clearInterval(intervalId);
      };
  }, []);
  return (
    <div className="flex justify-center mt-4">
      <LineChart
      width={1200}
      height={300}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="Timestamp" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="Level" stroke="#8884d8" />
      <Line type="monotone" dataKey="Pressure" stroke="#82ca9d" />
      <Line type="monotone" dataKey="Flow" stroke="#ffc658" />
    </LineChart>
    </div>
    
  );
};
export default WarehouseGraph;