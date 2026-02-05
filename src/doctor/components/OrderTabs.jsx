import React from "react";

const OrderTabs = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { key: "leads", label: "Order Leads" },
        { key: "ongoing", label: "Ongoing Orders" },
        { key: "completed", label: "Completed Orders" },
        { key: "rejected", label: "Rejected Orders" },
    ];

    return (
        <div className="overflow-x-auto ">
            <div className="flex gap-5 md:gap-4 lg:gap-11 border-b overflow-x-auto whitespace-nowrap">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`p-3 text-sm sm:text-base transition-all duration-300 ${activeTab === tab.key
                            ? "border-b-2 border-blue-500 text-blue-600 font-medium"
                            : "text-gray-600 hover:text-blue-500"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default OrderTabs;
