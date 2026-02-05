import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { FaChartBar } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const WeeklySalesBarChart = () => {
    const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const data = {
        labels,
        datasets: [
            {
                label: "Weekly Sales",
                data: [50, 80, 100, 120, 90, 110, 150],
                backgroundColor: "rgba(173, 216, 230, 0.8)", // Light Blue
                barPercentage: 0.4,
                hoverBackgroundColor: "rgba(59, 130, 246, 1)", // Dark Blue on hover
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
        },
        scales: {
            x: { grid: { display: false } },
            y: { beginAtZero: true },
        },
    };
    return (
        <div>
            <div className="flex items-center gap-2 mb-4 text-blue-500 text-lg font-semibold">
                <FaChartBar className="text-2xl" /> Weekly Sales
            </div>
            <Bar data={data} options={options} />
        </div>
    )
}

export default WeeklySalesBarChart