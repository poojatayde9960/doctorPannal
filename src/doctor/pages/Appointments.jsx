import { FaCalendarAlt } from "react-icons/fa";
import { MdAccessTimeFilled, MdLocationOn } from "react-icons/md";
import { IoCheckmarkCircle } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";
import { LuUsers } from "react-icons/lu";
import { useChangeStatusMutation, useGetAppointmentsQuery, useGetDoctorsQuery, useResheduleAppointmentMutation, useTransferAppointmentMutation } from "../../redux/apis/patientsApi";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";

export default function Appointments() {
    console.log("Redux auth slice 👉", useSelector(state => state.auth));

    console.log("Redux auth slice 👉", useSelector(state => state.auth));

    const admin = useSelector((state) => state.auth.admin);
    const doctorId = admin?._id;

    console.log("Redux auth slice →", useSelector(state => state.auth));
    console.log("Current doctor ID →", doctorId);


    const { data, isLoading, refetch } = useGetAppointmentsQuery(doctorId, {
        skip: !doctorId
    });
    const { data: doctorsData } = useGetDoctorsQuery(undefined, {
        skip: !doctorId
    });
    console.log("doctorId", doctorId);
    const [transferAppointment] = useTransferAppointmentMutation();

    const [changeStatus] = useChangeStatusMutation();
    const [activeTab, setActiveTab] = useState("All");
    const appointments = data?.Appoinment || [];
    const [updating, setUpdating] = useState({});

    const [showTransferModal, setShowTransferModal] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState("");



    // Handle opening modal
    const handleOpenTransferModal = (appointment) => {
        setSelectedAppointment(appointment);
        setShowTransferModal(true);
    };


    // Handle doctor selection & transfer
    const handleTransfer = async () => {
        if (!selectedDoctor) return alert("Please select a doctor!");

        try {
            await transferAppointment({
                appointmentId: selectedAppointment._id,
                doctorId: selectedDoctor   // ✅ KEY FIX
            }).unwrap();

            alert("Appointment transferred successfully!");

            setShowTransferModal(false);
            setSelectedDoctor("");
            setSelectedAppointment(null);

            refetch();
        } catch (error) {
            console.error("Transfer failed:", error);
            alert("Failed to transfer appointment. Please try again.");
        }
    };


    const handleStatusChange = async (appointmentId, newStatus) => {
        try {
            await changeStatus({ appointmentId, status: newStatus }).unwrap();
            refetch();

            if (newStatus === "approved") setActiveTab("Upcoming");
            if (newStatus === "rejected") setActiveTab("Rejected");
            if (newStatus === "completed") setActiveTab("Completed");

        } catch (err) {
            console.error(err);
        }
    };


    const today = new Date().toDateString();

    const filteredAppointments = appointments.filter((item) => {
        const appointmentDate = new Date(item.appointmentTime).toDateString();

        if (String(item.doctorId) !== String(doctorId)) return false;

        switch (activeTab) {
            case "Today":
                return appointmentDate === today && item.appointmentStatus === "pending";
            case "Upcoming":
                return item.appointmentStatus === "confirmed";
            case "Completed":
                return item.appointmentStatus === "completed";
            case "Rejected":
                return item.appointmentStatus === "cancelled";
            case "Pending":
                return item.appointmentStatus === "pending";
            case "All":
                return item.appointmentStatus === "pending"; // ✅ फक्त pending
            default:
                return true;
        }
    });
    // state for reschedule
    const [showRescheduleModal, setShowRescheduleModal] = useState(false);
    const [rescheduleDate, setRescheduleDate] = useState(null);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const [resheduleAppointment] = useResheduleAppointmentMutation();

    // handle open modal
    const handleOpenRescheduleModal = (appointment) => {
        setSelectedAppointment(appointment);
        setRescheduleDate(new Date(appointment.appointmentTime)); // default date
        setShowRescheduleModal(true);
    };

    // handle reschedule submit
    const handleRescheduleSubmit = async () => {
        if (!rescheduleDate) return alert("Please select a date!");

        try {
            await resheduleAppointment({
                AppoinmentId: selectedAppointment._id,
                Date: rescheduleDate.toISOString().split("T")[0] // YYYY-MM-DD format
            }).unwrap();

            alert("Appointment rescheduled successfully!");
            setShowRescheduleModal(false);
            setSelectedAppointment(null);
            refetch();
        } catch (err) {
            console.error(err);
            alert("Failed to reschedule. Try again!");
        }
    };


    if (isLoading) return <p className="text-center mt-10">  <div className="bg-white rounded-xl p-4 border shadow-sm animate-pulse">
        {/* Header */}
        <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-slate-300"></div>

                <div className="space-y-2">
                    <div className="h-3 w-32 bg-slate-300 rounded"></div>
                    <div className="h-3 w-24 bg-slate-200 rounded"></div>
                </div>
            </div>

            <div className="h-6 w-20 bg-slate-200 rounded-lg"></div>
        </div>

        {/* Date / Time */}
        <div className="mt-4 bg-blue-50 p-4 rounded-xl space-y-3">
            <div className="flex justify-between">
                <div className="h-3 w-28 bg-slate-300 rounded"></div>
                <div className="h-3 w-24 bg-slate-300 rounded"></div>
            </div>

            <div className="h-3 w-40 bg-slate-300 rounded"></div>
        </div>

        {/* Reason */}
        <div className="mt-4 space-y-2">
            <div className="h-3 w-24 bg-slate-200 rounded"></div>
            <div className="h-4 w-48 bg-slate-300 rounded"></div>
        </div>

        {/* Buttons */}
        <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="h-11 bg-slate-300 rounded-xl"></div>
            <div className="h-11 bg-slate-300 rounded-xl"></div>
            <div className="h-11 bg-slate-300 rounded-xl"></div>
            <div className="h-11 bg-slate-300 rounded-xl"></div>
        </div>
    </div>

    </p>;
    return (
        <>
            {/* <pre className="text-black">{JSON.stringify(doctorsData, null, 2)}</pre> */}
            {/* <pre className="text-black">{JSON.stringify(data, null, 2)}</pre> */}
            <div className="p-0 min-h-screen">

                {/* --- Top Tabs --- */}
                <div className="flex gap-3 mb-5">
                    {["All", "Today", "Upcoming", "Completed", "Rejected", "Pending"].map((tab, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveTab(tab)}   // 👈 ADD THIS
                            className={`px-6 py-2 rounded-lg text-sm font-medium border 
            ${activeTab === tab
                                    ? "bg-[#0BA7E8] text-white border-[#0BA7E8]"
                                    : "bg-white text-gray-700"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>



                {/* --- Appointment Cards --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredAppointments.map((item) => (

                        <div key={item._id} className="bg-white rounded-xl p-4 border shadow-sm">
                            {/* Header Section */}
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-4">
                                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-green-400 to-blue-500 
                                        flex items-center justify-center text-white text-xl font-semibold">
                                        {item.patientId?.patientName?.slice(0, 1)}
                                    </div>

                                    <div>
                                        <p className="text-md text-gray-900">{item.patientId?.patientName}</p>
                                        <p className="text-gray-500 text-sm">{item.patientId?.contact}</p>
                                    </div>
                                </div>

                                <span className="bg-orange-100 text-orange-600 px-4 py-1 rounded-lg font-medium">
                                    {item.appointmentStatus}
                                </span>
                            </div>

                            {/* Date - Time - Location */}
                            <div className="mt-4 bg-blue-50 p-4 rounded-xl">
                                <div className="flex justify-between text-sm text-gray-700">
                                    <div className="flex items-center gap-2">
                                        <FaCalendarAlt className="text-blue-600" />
                                        {new Date(item.appointmentTime).toLocaleDateString()}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <MdAccessTimeFilled className="text-blue-600" />
                                        {new Date(item.appointmentTime).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        })}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 mt-3 text-gray-700">
                                    <MdLocationOn className="text-blue-600" />
                                    {item.patientId?.address || "Address not available"}
                                </div>
                            </div>

                            {/* Reason */}
                            <div className="mt-4">
                                <p className="text-gray-600 text-sm">Reason For Visit</p>
                                <p className="font-semibold">{item.reason}</p>
                            </div>

                            {/* Buttons */}
                            <div className="mt-5 grid grid-cols-2 gap-3">
                                {item.appointmentStatus === "pending" ? (
                                    <>
                                        <button
                                            onClick={() => handleStatusChange(item._id, "confirmed")}
                                            disabled={updating[item._id]}
                                            className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl text-sm font-medium"
                                        >
                                            <IoCheckmarkCircle size={20} /> Approve
                                        </button>

                                        <button
                                            onClick={() => handleStatusChange(item._id, "cancelled")}
                                            disabled={updating[item._id]}
                                            className="flex items-center justify-center gap-2 bg-red-500 text-white py-3 rounded-xl text-sm font-medium"
                                        >
                                            <RxCrossCircled size={20} /> Reject
                                        </button>

                                        <button
                                            onClick={() => handleOpenRescheduleModal(item)}
                                            className="flex items-center justify-center gap-2 bg-orange-500 text-white py-3 rounded-xl text-sm font-medium col-span-1"
                                        >
                                            <MdAccessTimeFilled size={20} /> Reschedule
                                        </button>

                                        <button
                                            onClick={() => handleOpenTransferModal(item)}
                                            className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl text-sm font-medium col-span-1"
                                        >
                                            <LuUsers size={20} /> Transfer
                                        </button>

                                    </>
                                ) : (
                                    // For non-pending statuses, just show the status
                                    <div className="col-span-2 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium text-gray-700 bg-gray-100">
                                        Status: <span className="font-semibold capitalize">{item.appointmentStatus}</span>
                                    </div>
                                )}
                            </div>

                        </div>

                    ))}
                </div>
                {showRescheduleModal && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 transition-opacity duration-300"
                        onClick={() => setShowRescheduleModal(false)}
                    >
                        <div
                            className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 md:p-10 relative transform scale-95 transition-transform duration-300 hover:scale-100"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="flex justify-between items-center mb-6 border-b pb-4">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    Reschedule Appointment
                                </h2>
                                <button
                                    onClick={() => setShowRescheduleModal(false)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors text-2xl font-bold"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Patient Info */}
                            <p className="text-gray-700 mb-6 text-sm md:text-sm">
                                Reschedule appointment for{" "}
                                <span className="font-semibold text-gray-900">
                                    {selectedAppointment?.patientId?.patientName}
                                </span>
                            </p>

                            {/* Date Picker */}
                            <div className="mb-8">
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                    Select New Date
                                </label>
                                <DatePicker
                                    selected={rescheduleDate}
                                    onChange={(date) => setRescheduleDate(date)}
                                    dateFormat="yyyy-MM-dd"
                                    className="w-full md:w-[350px] p-2 h-10 border border-gray-300  bg-gray-50 text-gray-900 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition shadow-sm hover:shadow-md"
                                    minDate={new Date()} // past dates disabled
                                />
                            </div>


                            {/* Action Buttons */}
                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={() => setShowRescheduleModal(false)}
                                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleRescheduleSubmit}
                                    className="px-6 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition font-medium shadow-lg hover:shadow-xl"
                                >
                                    Reschedule
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- Empty State --- */}
                {filteredAppointments.length === 0 && !isLoading && (
                    <div className="flex flex-col items-center justify-center py-16 px-4">
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full p-8 mb-6">
                            <FaCalendarAlt className="text-6xl text-blue-400" />
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                            {activeTab === "Today" && "No Appointments Today"}
                            {activeTab === "Upcoming" && "No Upcoming Appointments"}
                            {activeTab === "Completed" && "No Completed Appointments"}
                            {activeTab === "Rejected" && "No Rejected Appointments"}
                            {activeTab === "Pending" && "No Pending Appointments"}
                            {activeTab === "All" && "No Appointments Found"}
                        </h3>
                        <p className="text-gray-500 text-center max-w-md">
                            {activeTab === "Today" && "You don't have any appointments scheduled for today. Enjoy your free time!"}
                            {activeTab === "Upcoming" && "There are no approved appointments at the moment. Check back later or review pending requests."}
                            {activeTab === "Completed" && "No appointments have been marked as completed yet."}
                            {activeTab === "Rejected" && "You haven't rejected any appointments."}
                            {activeTab === "Pending" && "All caught up! No pending appointments to review."}
                            {activeTab === "All" && "You don't have any pending appointments at the moment."}
                        </p>
                    </div>
                )}
                {showTransferModal && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4"
                        onClick={() => setShowTransferModal(false)} // Click outside closes modal
                    >
                        <div
                            className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 md:p-8"
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
                        >
                            {/* Header */}
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                                    Transfer Appointment
                                </h2>
                                <button
                                    onClick={() => setShowTransferModal(false)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Info */}
                            <p className="text-gray-600 mb-4">
                                Transfer the appointment for{" "}
                                <span className="font-medium text-gray-800">{selectedAppointment?.patientId?.patientName}</span> to another doctor.
                            </p>

                            {/* Doctor Select */}
                            {/* Doctor Select */}
                            <div className="mb-6">

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Select Doctor
                                </label>
                                <select
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                    value={selectedDoctor}
                                    onChange={(e) => setSelectedDoctor(e.target.value)}
                                >
                                    <option value="">-- Choose Doctor --</option>
                                    {doctorsData?.Doctors?.length > 0 ? (
                                        doctorsData.Doctors.map((doc) => (
                                            <option key={doc._id} value={doc._id}>
                                                {doc.name}
                                            </option>
                                        ))
                                    ) : (
                                        <option disabled>No doctors available</option>
                                    )}
                                </select>

                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setShowTransferModal(false)}
                                    className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleTransfer}
                                    className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                >
                                    Transfer
                                </button>
                            </div>
                        </div>
                    </div>
                )}



            </div>
        </>
    );
}
