import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from "chart.js";

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ComponentComplianceChart = () => {
    const [chartData, setChartData] = useState(null);

    // Dummy data
    const dummyData = {
        labels: ["Windows", "Doors", "Walls"], // Component types
        datasets: [
            {
                label: "Total",
                data: [10, 8, 15], // Total components
                backgroundColor: "#d3d3d3",
                barPercentage: 0.6,
            },
            {
                label: "With U-Values",
                data: [6, 5, 9], // Components with U-values
                backgroundColor: "#ff9800",
                barPercentage: 0.6,
            },
            {
                label: "Compliant",
                data: [3, 2, 7], // Components meeting regulations
                backgroundColor: "#4caf50",
                barPercentage: 0.6,
            },
        ]
    };

    // Chart options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const value = context.raw;
                        const total = dummyData.datasets[0].data[context.dataIndex];
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${context.dataset.label}: ${value} (${percentage}%)`;
                    },
                },
            },
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                beginAtZero: true,
                ticks: {
                    precision: 0,
                },
            },
        },
    };

    useEffect(() => {
        // Set dummy data initially
        setChartData(dummyData);

        // Once the backend is ready, replace this with an API call
        // Example:
        // fetch("http://localhost:3000/api/component-stats")
        //     .then((response) => response.json())
        //     .then((data) => {
        //         // Transform data for chart
        //         const labels = ["Windows", "Doors", "Walls"];
        //         const totalData = [10, 8, 15]; // Replace with actual data
        //         const withUValueData = [6, 5, 9]; // Replace with actual data
        //         const compliantData = [3, 2, 7]; // Replace with actual data

        //         setChartData({
        //             labels,
        //             datasets: [
        //                 { label: "Total", data: totalData, backgroundColor: "#d3d3d3" },
        //                 { label: "With U-Values", data: withUValueData, backgroundColor: "#ff9800" },
        //                 { label: "Compliant", data: compliantData, backgroundColor: "#4caf50" },
        //             ],
        //         });
        //     });
    }, []);

    if (!chartData) {
        return <div>Loading chart...</div>;
    }

    return (
        <div className="card">
            <div className="card-header">
                Component Compliance (Dummy Data)
            </div>
            <div className="chart-container">
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
};

export default ComponentComplianceChart;
