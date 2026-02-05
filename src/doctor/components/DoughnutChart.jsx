import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
    const data = {
        datasets: [
            {
                data: [80, 75, 60, 35], // Values
                backgroundColor: ["#1976D2", "#FFD700", "#FF9800", "#4CAF50"], // Colors
                borderWidth: 0,
            },
        ],
    };

    const labels = [
        { name: "Total Orders", color: "#1976D2" },
        { name: "Total Users", color: "#FFD700" },
        { name: "Total Sales", color: "#FF9800" },
        { name: "Total Revenue", color: "#4CAF50" },
    ];

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false, // Hide default legend
            },
        },
    };

    return (
        <div className="flex flex-col items-center gap-4 w-full">
            {/* Labels - 2 on Left, 2 on Right */}
            <div className="flex flex-wrap md:flex-nowrap justify-between w-full max-w-md text-sm">
                <div className="flex flex-col gap-2 items-start ">
                    {labels.slice(0, 2).map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                            {item.name}
                        </div>
                    ))}
                </div>
                <div className="flex flex-col gap-2 items-end">
                    {labels.slice(2, 4).map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                            {item.name}
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Doughnut Chart */}
            <div className="w-40 h-40 md:w-36 md:h-36 lg:w-44 lg:h-44 flex justify-center items-center">
                <Doughnut data={data} options={options} />
            </div>
        </div>
    );
};

export default DoughnutChart;
