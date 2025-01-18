import React from "react";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

// Register required components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const EnergySavingsGraph = () => {
    const data = {
        labels: ["2020", "2025", "2030", "2035", "2040"], // X-axis labels (Years)
        datasets: [
            {
                label: "kW/m² Saved",
                data: [10, 25, 45, 60, 80], // Y-axis data points
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top"
            },
            title: {
                display: true,
                text: "Energy Savings Over Time (kW/m²)"
            }
        }
    };

    return  <div className="card">
                <div className="card-header">
                    Energy Efficiency (EUI kWh/m<sup>2</sup>/y) <span style={{ fontWeight: "lighter", fontSize: "0.9em" }}>*if retrofitted</span>
                </div>
                <div className="lineGraph-container">
                    <Line data={data} options={options} />
                </div>
            </div>
};

export default EnergySavingsGraph;
