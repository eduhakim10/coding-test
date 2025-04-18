"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

/**
 * @typedef {Object} SalesData
 * @property {string} name
 * @property {number} closedWon
 * @property {number} inProgress
 * @property {number} closedLost
 */

/**
 * @typedef {Object} BarChartProps
 * @property {SalesData[]} salesData
 */

export default function BarChart({ salesData }) {

  const data = {
    labels: salesData.map((rep) => rep.name),
    datasets: [
      {
        label: "Closed Won",
        data: salesData.map((rep) => rep.closedWon),
        backgroundColor: "rgba(75,192,192,0.6)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1
      },
      {
        label: "In Progress",
        data: salesData.map((rep) => rep.inProgress),
        backgroundColor:"rgba(255,159,64 ,0.6)",
        borderColor:"rgba(255 ,159 ,64 ,1)",
        borderWidth :1
      },
      {
       label:"Closed Lost",
       data:salesData.map(rep=>rep.closedLost),
       backgroundColor:"rgba(255 ,99 ,132 ,0.6)",
       borderColor:"rgba(255 ,99 ,132 ,1)",
       borderWidth :1
     }
   ]
 };

 const options ={
   responsive:true,
   plugins:{
     legend:{
       position:'top' 
     },
     title:{
       display:true,
       text:'Sales Performance by Status'
     }
   }
 }


 return <Bar data={data} options={options} />;
}
