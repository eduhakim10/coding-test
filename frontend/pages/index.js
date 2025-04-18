"use client";
 
import { useState, useEffect } from "react";
import SalesRepCard from "../components/SalesRepCard";
import AiForm from "../components/AIForm";
import { fetchSalesData } from "../utils/api";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import SalesPerformanceBarChart from "../components/SalesPerformanceBarChart";
import LoadingSpinnerSalesCard from "../components/LoadingSpinnerSalesCard";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {

  const [salesReps, setSalesReps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [aiResponse, setAiResponse] = useState(null);
  const [selectedRole, setSelectedRole] = useState("all");
  const [roles, setRoles] = useState(null);
  


  
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchSalesData();
        if (!Array.isArray(data.salesReps)) {
          throw new Error("Data sales reps is not an array");
        }

        setSalesReps(data.salesReps);

        // Extract unique roles
        const uniqueRoles = Array.from(new Set(data.salesReps.map(rep => rep.role)));
        setRoles(["all", ...uniqueRoles]);
      } catch (err) {
        setError(err.message || "Unknown error");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const dealStatusCountsbar = salesReps.map((rep) => {
    let closedWon = 0;
    let inProgress = 0;
    let closedLost = 0;

    rep.deals.forEach(deal => {
      if (deal.status === "Closed Won") closedWon += deal.value;
      else if (deal.status === "In Progress") inProgress += deal.value;
      else if (deal.status === "Closed Lost") closedLost += deal.value;
    });

    return {
      name: rep.name,
      closedWon,
      inProgress,
      closedLost
    };
  });


  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  

  const handleRoleChange = (role) => {
    setSelectedRole(role);
  };
 
  // Filter sales reps based search term dan role
  const filteredSalesReps = salesReps
    .filter(rep => rep.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(rep => selectedRole === "all" || rep.role === selectedRole);

  // Calculate the number of deal statuses for the chart
  const dealStatusCountspie = salesReps.reduce(
    (acc, rep) => {
      rep.deals.forEach(deal => {
        if (deal.status === "Closed Won") {
          acc["Closed Won"] += 1;
        } else if (deal.status === "In Progress") {
          acc["In Progress"] += 1;
        } else if (deal.status === "Closed Lost") {
          acc["Closed Lost"] += 1;
        }
      });
      return acc;
    },
    { "Closed Won": 0, "In Progress": 0, "Closed Lost": 0 }
  );

  // Data chart pie
  const chartData = {
    labels: Object.keys(dealStatusCountspie),
    datasets: [
      {
        label: "Deal Status",
        data: Object.values(dealStatusCountspie),
        backgroundColor: ["#76C7C0", "#F6AD55", "#ED5565"],
        hoverBackgroundColor: ["#62B5AA", "#E09E49", "#E04156"],
      },
    ],
  };
  // Data chart bar
  const dealStatusCounts = salesReps.map((rep) => {
    let closedWon = 0;
    let inProgress = 0;
    let closedLost = 0;

    rep.deals.forEach(deal => {
      if (deal.status === "Closed Won") closedWon += deal.value;
      else if (deal.status === "In Progress") inProgress += deal.value;
      else if (deal.status === "Closed Lost") closedLost += deal.value;
    });

    return {
      name: rep.name,
      closedWon,
      inProgress,
      closedLost
    };
  });


  if (loading) return <LoadingSpinnerSalesCard />;
  if (error) return <p className="text-red-500">Error loading data: {error}</p>;

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-3xl font-bold">Ask a Question (AI Endpoint)</h1>
      <AiForm setAiResponse={setAiResponse} />
      {aiResponse && (
        <div className="mt-6 p-4 bg-white rounded shadow w-full max-w-md">
          <h2 className="text-xl font-bold mb-2">Response:</h2>
          <p className="text-gray-700">{aiResponse}</p>
        </div>
      )}
      <h1 className="text-3xl font-bold">Sales Deal Status Overview</h1>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="w-full md:w-1/2">
          <div className="w-64 h-64">
            <Pie data={chartData} />
          </div>
        </div>

        <div className="w-full md:w-1/2">

          <SalesPerformanceBarChart salesData={dealStatusCounts} />
        </div>
      </div>
      <h1 className="text-3xl font-bold">Sales Reps (Dummy Data)</h1>
      <div className="mb-4 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <input
          type="text"
          placeholder="Search sales representatives..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <select
          value={selectedRole}
          onChange={(e) => handleRoleChange(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          {roles.map(role => (
            <option key={role} value={role}>
              {role === "all" ? "All Roles" : role}
            </option>
          ))}
        </select>
      </div>
      {filteredSalesReps.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSalesReps.map(rep => (
            <SalesRepCard key={rep.id} salesRep={rep} loading={loading} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No matching sales representatives found.</p>
      )}


    </div>
  );
}
