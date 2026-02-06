import React from "react";
import { FaPhone, FaEnvelope, FaUserMd, FaVenusMars, FaTint, FaWeight, FaHeartbeat, FaUser, FaPhoneAlt, FaRulerVertical } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";
import { GiBodyHeight, GiWeight, GiBlood } from "react-icons/gi";
import { MdCake, MdDescription, MdHealthAndSafety, MdMonitorHeart } from "react-icons/md";
import { useGetPatientByIdQuery, useMyPatientsQuery } from "../../../redux/apis/patientsApi";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PatientDetails() {
    const { patientId } = useParams();
    const admin = useSelector((state) => state.auth?.admin);
    const doctorId = admin?._id;
    const { data, isLoading, error } = useGetPatientByIdQuery(patientId, {
        skip: !patientId
    });

    if (isLoading) return <p>Loading patient...</p>;
    if (error) return <p>Error loading patient</p>;

    // ✅ Properly destructure the API response
    const patient = data?.Patients;
    const visits = data?.Visits || [];

    if (!patient) return <p>Patient not found</p>;

    // Get the most recent visit (visits are already sorted by date)
    const latestVisit = visits.length > 0 ? visits[0] : null;

    // Get the first visit to calculate weight trend
    const firstVisit = visits.length > 0 ? visits[visits.length - 1] : null;

    // Calculate weight change
    const weightChange = latestVisit && firstVisit
        ? latestVisit.weight - firstVisit.weight
        : 0;

    // Format date helper
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return <>

        {/* Remove debug data */}

        <div className="w-full min-h-screen bg-[#F6FAFF]  grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">

            {/* LEFT SIDE */}
            <div className="bg-white rounded-2xl space-y-4">

                <div className="bg-[#0BA7E8] text-white rounded-t-xl p-6 text-center">
                    <div className="w-20 h-20 rounded-full border-2 border-white mx-auto flex items-center justify-center text-4xl">
                        <FaUser />
                    </div>
                    <p className="mt-4 text-xl">{patient.patientName}</p>
                    <p className="opacity-90">Patient ID · {patient.UID}</p>
                </div>

                {/* Basic Info */}
                <div className="grid text-black grid-cols-2 gap-4 text-sm p-2">

                    <div className="border-2 border-[#E8F6FE] p-3 rounded-lg">
                        <div className="flex items-start gap-2 text-gray-700">
                            {/* Icon */}
                            <FaVenusMars className="text-blue-500 mt-1" />

                            {/* Label + Value */}
                            <div className="flex text-black flex-col">
                                <span className="font-semibold">Gender</span>
                                <span className="text-gray-900">{patient.gender}</span>
                            </div>
                        </div>
                    </div>


                    {/* Age */}
                    <div className="border-2 border-[#E8F6FE] p-3 rounded-lg">
                        <div className="flex items-start gap-2 text-gray-700">
                            <MdCake className="text-yellow-500 mt-1" />
                            <div className="flex flex-col">
                                <span className="font-semibold">Age</span>
                                <span className="text-gray-900">{patient.age}</span>
                            </div>
                        </div>
                    </div>

                    {/* Blood Group */}
                    <div className="border-2 border-[#E8F6FE] p-3 rounded-lg">
                        <div className="flex items-start gap-2 text-gray-700">
                            <GiBlood className="text-red-500 mt-1" />
                            <div className="flex flex-col">
                                <span className="font-semibold">Blood Group</span>
                                <span className="text-gray-900">{patient.bloodGroup}</span>
                            </div>
                        </div>
                    </div>

                    {/* Height */}
                    <div className="border-2 border-[#E8F6FE] p-3 rounded-lg">
                        <div className="flex items-start gap-2 text-gray-700">
                            <GiBodyHeight className="text-green-500 mt-1" />
                            <div className="flex flex-col">
                                <span className="font-semibold">Height</span>
                                <span className="text-gray-900">{latestVisit?.height || 'N/A'} cm</span>
                            </div>
                        </div>
                    </div>

                    {/* Weight */}
                    <div className="border-2 border-[#E8F6FE] p-3 rounded-lg">
                        <div className="flex items-start gap-2 text-gray-700">
                            <GiWeight className="text-purple-500 mt-1" />
                            <div className="flex flex-col">
                                <span className="font-semibold">Weight</span>
                                <span className="text-gray-900">{latestVisit?.weight || 'N/A'} kg</span>
                            </div>
                        </div>
                    </div>

                    {/* BP */}
                    <div className="border-2 border-[#E8F6FE] p-3 rounded-lg">
                        <div className="flex items-start gap-2 text-gray-700">
                            <MdMonitorHeart className="text-pink-500 mt-1" />
                            <div className="flex flex-col">
                                <span className="font-semibold">BP</span>
                                <span className="text-gray-900">{latestVisit?.bloodPressure || 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact */}
                <div className="space-y-3 text-black text-sm p-2">

                    {/* Phone */}
                    <div className="border p-3 rounded-xl bg-[#E8F6FE]">
                        <div className="flex items-start gap-2">
                            <FaPhoneAlt className="mt-1" />
                            <div className="flex flex-col">
                                <span className="font-semibold">Phone</span>
                                <span>{patient.contact}</span>
                            </div>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="border p-3 rounded-xl bg-[#E8F6FE]">
                        <div className="flex items-start gap-2">
                            <FaEnvelope className="mt-1" />
                            <div className="flex flex-col">
                                <span className="font-semibold">Email</span>
                                <span>{patient.email}</span>
                            </div>
                        </div>
                    </div>

                    {/* Assigned Doctor */}
                    <div className="border p-3 rounded-xl bg-[#E8F6FE]">
                        <div className="flex items-start gap-2">
                            <FaUserMd className="mt-1" />
                            <div className="flex flex-col">
                                <span className="font-semibold">Assigned Doctor</span>
                                <span>{patient.assignedDoctor}</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Overview */}
                <div className="space-y-3 text-black text-sm p-2">
                    <div className="border p-4 rounded-xl space-y-3">
                        {/* Header with icon */}
                        <div className="flex items-center gap-2">
                            <MdHealthAndSafety className="mt-1" />
                            <span className="font-semibold">Health Overview</span>
                        </div>

                        {/* Values */}
                        <div className="space-y-1">
                            <div className="flex justify-between">
                                <span>Total Visits</span>
                                <span>{visits.length}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Last Visit</span>
                                <span>{formatDate(latestVisit?.visitDate)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Condition</span>
                                <span>{latestVisit?.disease || 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                </div>


            </div>


            {/* RIGHT SIDE */}
            <div className="space-y-6">

                {/* Appointment & Disease */}
                <div className="bg-white rounded-2xl shadow p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-orange-100 p-4 rounded-xl">
                        <p className="text-orange-600 font-semibold">Recent Visit</p>
                        <p className="text-sm">{formatDate(latestVisit?.visitDate)}</p>
                    </div>
                    <div className="bg-green-100 p-4 rounded-xl">
                        <p className="text-green-600 font-semibold">Visit Time</p>
                        <p className="text-sm">{latestVisit?.visitTime || 'N/A'}</p>
                    </div>
                    <div className="bg-pink-100 p-4 rounded-xl">
                        <p className="text-pink-600 font-semibold">Current Condition</p>
                        <p className="text-xl font-semibold">{latestVisit?.disease || 'N/A'}</p>
                    </div>
                </div>

                {/* Current Medications */}
                <div className="bg-white text-black rounded-2xl shadow p-6">
                    <div className="flex gap-4 border-b pb-3 text-sm font-semibold">
                        <span className="text-blue-600 border-b-2 border-blue-600 pb-1 cursor-pointer">Current Treatment</span>
                        <span className="cursor-pointer">Medical History</span>
                    </div>

                    <p className="mt-4 font-semibold">Current Medications</p>
                    <p className="text-xs text-gray-500">Active prescriptions - For 10 Days</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {/* Dynamic Medicine Cards */}
                        {latestVisit?.medicines && latestVisit.medicines.length > 0 ? (
                            latestVisit.medicines.map((medicine, index) => (
                                <div key={index} className="border border-blue-300 p-4 rounded-xl bg-[#E8F6FE]">
                                    <p className="font-semibold">• {medicine.name}</p>
                                    <p className="text-xs text-gray-500">Quantity: {medicine.quantity} | Price: ₹{medicine.price}</p>
                                    <div className="grid grid-cols-3 mt-3 text-center text-sm">
                                        <div>Morning<br />{medicine.morning}</div>
                                        <div>Afternoon<br />{medicine.afternoon}</div>
                                        <div>Night<br />{medicine.night}</div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 col-span-2">No current medications</p>
                        )}
                    </div>
                </div>


                {/* Patient Medical History */}
                <div className="bg-white rounded-2xl shadow p-6 space-y-4">

                    {/* Header */}
                    <div className="flex justify-between items-center mb-5">
                        <h1 className="text-xl font-semibold text-gray-800">
                            Patient Medical History
                        </h1>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700">
                            Export History
                        </button>
                    </div>

                    {/* Weight Trend */}
                    {visits.length > 0 && (
                        <div className="bg-gradient-to-r from-blue-50 to-teal-50 border rounded-xl p-5 flex justify-between items-center shadow-sm mb-6">
                            <div>
                                <p className="text-sm text-gray-600 font-medium">Weight Trend</p>
                                <h2 className="text-xl font-semibold text-gray-900">
                                    {firstVisit?.weight || 'N/A'} Kg → {latestVisit?.weight || 'N/A'} Kg
                                </h2>
                            </div>

                            <div className={`font-semibold text-lg ${weightChange < 0 ? 'text-green-600' : weightChange > 0 ? 'text-red-600' : 'text-gray-600'}`}>
                                {weightChange < 0 ? '↘' : weightChange > 0 ? '↗' : '→'} {weightChange > 0 ? '+' : ''}{weightChange} Kg
                            </div>
                        </div>
                    )}

                    {/* Medical Record Cards - Dynamic Visit History */}
                    {visits.length > 0 ? (
                        visits.map((visit, index) => (
                            <div key={visit._id} className="rounded-2xl bg-gray-50 p-6 border mb-4">

                                {/* Date & Tag */}
                                <div className="flex items-center gap-3 mb-4">
                                    <h2 className="text-lg font-semibold text-gray-800">{formatDate(visit.visitDate)}</h2>
                                    {index === 0 && (
                                        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium">
                                            Latest
                                        </span>
                                    )}
                                </div>

                                {/* Visit Title */}
                                <p className="text-blue-700 font-medium mb-4">
                                    {visit.disease} {visit.subDisease ? `– ${visit.subDisease}` : ''}
                                </p>

                                {/* Vital Cards */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

                                    <div className="border rounded-lg p-1 shadow-sm flex items-center gap-3 bg-white">
                                        <FaWeight className="text-blue-500 text-lg" />
                                        <div>
                                            <p className="text-xs text-gray-500">Weight</p>
                                            <p className="font-semibold text-gray-700">{visit.weight} Kg</p>
                                        </div>
                                    </div>

                                    <div className="border rounded-lg p-1 shadow-sm flex items-center gap-3 bg-white">
                                        <FaHeartbeat className="text-red-500 text-lg" />
                                        <div>
                                            <p className="text-xs text-gray-500">Blood Pressure</p>
                                            <p className="font-semibold text-gray-700">{visit.bloodPressure}</p>
                                        </div>
                                    </div>

                                    <div className="border rounded-lg p-1 shadow-sm flex items-center gap-3 bg-white">
                                        <FaRulerVertical className="text-purple-500 text-lg" />
                                        <div>
                                            <p className="text-xs text-gray-500">Height</p>
                                            <p className="font-semibold text-gray-700">{visit.height} cm</p>
                                        </div>
                                    </div>

                                </div>

                                {/* Reports & Tests */}
                                {visit.reports && visit.reports.length > 0 && (
                                    <div className="mb-5">
                                        <h3 className="flex items-center gap-2 text-gray-800 font-medium mb-2">
                                            <FiFileText className="text-blue-500" /> Reports & Tests
                                        </h3>

                                        <div className="flex gap-3 flex-wrap">
                                            {visit.reports.map((report, idx) => (
                                                <span key={idx} className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                                                    {report.reportName} – ₹{report.price}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Medicines */}
                                {visit.medicines && visit.medicines.length > 0 && (
                                    <div className="mb-5">
                                        <h3 className="text-gray-800 font-medium mb-2">Prescribed Medicines</h3>

                                        <ul className="list-disc ml-5 text-sm text-gray-800 space-y-2">
                                            {visit.medicines.map((medicine, idx) => (
                                                <li key={idx}>
                                                    <p className="font-semibold">{medicine.name} - ₹{medicine.price}</p>
                                                    <p className="text-gray-500 text-xs mt-0.5">
                                                        Morning: {medicine.morning}, Afternoon: {medicine.afternoon}, Night: {medicine.night}
                                                    </p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Notes */}
                                {visit.SpacialNote && (
                                    <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded-md text-sm">
                                        <strong>Notes:</strong> {visit.SpacialNote}
                                    </div>
                                )}

                                {/* Payment Info */}
                                <div className="mt-4 pt-4 border-t flex justify-between text-sm">
                                    <div>
                                        <span className="text-gray-600">Doctor Fees: </span>
                                        <span className="font-semibold">₹{visit.doctorFees}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Total Amount: </span>
                                        <span className="font-semibold">₹{visit.amount}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Payment: </span>
                                        <span className="font-semibold capitalize">{visit.paymentMethod}</span>
                                    </div>
                                </div>

                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">No visit history available</p>
                    )}






                </div>


            </div>

        </div>
    </>
}




