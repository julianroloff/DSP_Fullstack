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

const ComponentComplianceChart = ({ summaryData, compareData }) => {
    const [chartData, setChartData] = useState(null);

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
                        const total = context.dataset.data.reduce((sum, num) => sum + num, 0);
                        const percentageWithU = ((value / total) * 100).toFixed(1);
                        return `${context.dataset.label}: ${value} (${percentageWithU}%)`;
                    },
                },
            },
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: false,
                beginAtZero: true,
                ticks: {
                    precision: 0,
                },
            },
        },
    };

    // Populate the chart with summaryData
    useEffect(() => {
        if (summaryData && summaryData.length > 0) {
            // Transform the summaryData into labels and datasets
            const labels = summaryData.map((item) => item.IFC_Object);
            const totalData = summaryData.map((item) => item.count);
            const withUValueData = summaryData.map((item) => item.has_thermal_transmittance);

            let meetingRegs = [];
            if (compareData && compareData.length > 0) {
                meetingRegs = compareData.map((item) => item.regulationsMet ? 1 : 0); // Read regulationsMet from compareData
            }

            setChartData({
                labels,
                datasets: [
                    { label: "With U-Values", data: withUValueData, backgroundColor: "#ff9800" },
                    { label: "Total", data: totalData, backgroundColor: "#d3d3d3" },
                    
                ],
            });
        }
    }, [summaryData, compareData]);

    if (!chartData) {
        return <div>Loading chart...</div>;
    }

    return (
        <div className="card">
            <div className="card-header">
                Component Compliance
            </div>
            <div className="chart-container">
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
};

export default ComponentComplianceChart;
