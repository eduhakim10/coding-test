import React from "react";
import LoadingSpinnerSalesCard from "./LoadingSpinnerSalesCard";

/**
 * @typedef {Object} Deal
 * @property {string} client
 * @property {number} value
 * @property {string} status
 */

/**
 * @typedef {Object} SalesRep
 * @property {number} id
 * @property {string} name
 * @property {string} role
 * @property {string} region
 * @property {string[]} skills
 * @property {Deal[]} deals
 * @property {Array<{ name: string, industry: string, contact: string }>} clients
 */

/**
 * @typedef {Object} SalesRepCardProps
 * @property {SalesRep} salesRep
 */

export default function SalesRepCard({ salesRep, loading }) {
  if (loading) return <LoadingSpinnerSalesCard />;
  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">{salesRep.name}</h2>
          <p className="text-gray-600">{salesRep.role}</p>
          <p className="text-gray-600">{salesRep.region}</p>
        </div>
        <div className="flex flex-wrap gap-2 overflow-hidden">
          {salesRep.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold">Deals</h3>
        <ul className="space-y-2">
          {salesRep.deals.map((deal, index) => (
            <li key={index} className="flex justify-between">
              <span>{deal.client}</span>
              <span className="font-semibold">
                {deal.value.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </span>
              <span
                className={`${
                  deal.status === "Closed Won"
                    ? "bg-green-100 text-green-800"
                    : deal.status === "In Progress"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                } text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full`}
              >
                {deal.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-semibold">Clients</h3>
        <ul>
            {salesRep.clients.map((client) => (
            <li key={client.name} className="mb-2">
              <strong>Name:</strong> {client.name} <br />
              <strong>Industry:</strong> {client.industry} <br />
              <strong>Contact:</strong> {client.contact}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
