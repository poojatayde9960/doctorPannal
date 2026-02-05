import { FaCalendarAlt } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function TodaysAppointments({ appointments }) {
    const getStatusColor = (status) => {
        switch (status) {
            case "approved":
                return "bg-blue-100 text-blue-600";
            case "completed":
                return "bg-green-100 text-green-600";
            case "pending":
                return "bg-orange-100 text-orange-600";
            case "rejected":
                return "bg-red-100 text-red-600";
            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    if (!appointments || appointments.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 px-4">
                <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-full p-6 mb-4">
                    <FaCalendarAlt className="w-16 h-16 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    No Appointments Today
                </h3>
                <p className="text-gray-500 text-sm text-center">
                    You don't have any appointments scheduled for today.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl text-black p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <div>
                    <h2 className="text-lg font-semibold">Today's Appointments</h2>
                    <p className="text-gray-500 text-sm">Manage your schedule for today</p>
                </div>

                <button className="bg-[#1A87D7] text-white px-4 py-1.5 rounded-lg text-sm">
                    View All
                </button>
            </div>

            {/* Appointment List */}
            <div className="space-y-4">
                {appointments.map((item) => (
                    <div
                        key={item._id} // FIXED: use _id from API
                        className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border"
                    >
                        {/* Left Section */}
                        <div className="flex items-center gap-3">
                            {/* Avatar */}
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-400 to-teal-600 flex items-center justify-center text-white font-semibold text-lg">
                                {item.patientId?.patientName?.[0] || "P"} {/* first letter */}
                            </div>

                            <div>
                                <h3 className="font-semibold">
                                    {item.patientId?.patientName || "Unknown"} {/* FIXED: show name */}
                                </h3>
                                <p className="text-gray-500 text-sm">
                                    {item.type || "Regular Checkup"} {/* FIXED: show type */}
                                </p>
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="flex items-center gap-3">
                            <p className="text-gray-600 text-sm">
                                {new Date(item.appointmentTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </p>

                            <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.appointmentStatus)}`}
                            >
                                {item.appointmentStatus || "pending"}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
