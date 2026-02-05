import React from "react";
import { FaPhone, FaEnvelope, FaUserMd, FaVenusMars, FaTint, FaWeight, FaHeartbeat, FaUser, FaPhoneAlt, FaRulerVertical } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";
import { GiBodyHeight, GiWeight, GiBlood } from "react-icons/gi";
import { MdCake, MdDescription, MdHealthAndSafety, MdMonitorHeart } from "react-icons/md";
import { useMyPatientsQuery } from "../../../redux/apis/patientsApi";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PatientDetails() {
    const { patientId } = useParams();
    const admin = useSelector((state) => state.auth?.admin);
    const doctorId = admin?._id;

    // ✅ Skip the query if there's no doctor ID
    const { data, isLoading, error } = useMyPatientsQuery(doctorId, {
        skip: !doctorId
    });

    if (isLoading) return <p>Loading patient...</p>;
    if (error) return <p>Error loading patient</p>;

    // 🔥 PARTICULAR PATIENT
    const patient = data?.Patients?.find(
        (p) => p._id === patientId
    );

    if (!patient) return <p>Patient not found</p>;

    return <>

        <pre className="text-black">{JSON.stringify(data, null, 2)}</pre>

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
                                <span className="text-gray-900">{patient.height}</span>
                            </div>
                        </div>
                    </div>

                    {/* Weight */}
                    <div className="border-2 border-[#E8F6FE] p-3 rounded-lg">
                        <div className="flex items-start gap-2 text-gray-700">
                            <GiWeight className="text-purple-500 mt-1" />
                            <div className="flex flex-col">
                                <span className="font-semibold">Weight</span>
                                <span className="text-gray-900">{patient.weight}</span>
                            </div>
                        </div>
                    </div>

                    {/* BP */}
                    <div className="border-2 border-[#E8F6FE] p-3 rounded-lg">
                        <div className="flex items-start gap-2 text-gray-700">
                            <MdMonitorHeart className="text-pink-500 mt-1" />
                            <div className="flex flex-col">
                                <span className="font-semibold">BP</span>
                                <span className="text-gray-900">{patient.bp}</span>
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
                                <span>{patient.visits}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Last Visit</span>
                                <span>{patient.lastVisit}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Condition</span>
                                <span>{patient.condition}</span>
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
                        <p className="text-sm">13/03/2025</p>
                    </div>
                    <div className="bg-green-100 p-4 rounded-xl">
                        <p className="text-green-600 font-semibold">Recent Visit</p>
                        <p className="text-sm">13/03/2025</p>
                    </div>
                    <div className="bg-pink-100 p-4 rounded-xl">
                        <p className="text-pink-600 font-semibold">Current Condition</p>
                        <p className="text-xl font-semibold">Thyroid</p>
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
                        {/* Medicine Card */}
                        <div className="border border-blue-300 p-4 rounded-xl bg-[#E8F6FE]">
                            <p className="font-semibold">• Meftal Spas</p>
                            <p className="text-xs text-gray-500">13/03/2025 - 23/03/2025</p>
                            <div className="grid grid-cols-3 mt-3 text-center text-sm">
                                <div>Morning<br />0</div>
                                <div>Afternoon<br />1</div>
                                <div>Night<br />1</div>
                            </div>
                        </div>

                        <div className="border border-blue-300 p-4 rounded-xl bg-[#E8F6FE]">
                            <p className="font-semibold">• Nicip</p>
                            <p className="text-xs text-gray-500">13/03/2025 - 23/03/2025</p>
                            <div className="grid grid-cols-3 mt-3 text-center text-sm">
                                <div>Morning<br />0</div>
                                <div>Afternoon<br />1</div>
                                <div>Night<br />1</div>
                            </div>
                        </div>
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
                    <div className="bg-gradient-to-r from-blue-50 to-teal-50 border rounded-xl p-5 flex justify-between items-center shadow-sm mb-6">
                        <div>
                            <p className="text-sm text-gray-600 font-medium">Weight Trend</p>
                            <h2 className="text-xl font-semibold text-gray-900">58 Kg → 55 Kg</h2>
                        </div>

                        <div className="text-green-600 font-semibold text-lg">
                            ↘ -3 Kg
                        </div>
                    </div>

                    {/* Medical Record Card */}
                    <div className=" rounded-2xl bg-gray-50 p-6 border">

                        {/* Date & Tag */}
                        <div className="flex items-center gap-3 mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">15/02/2025</h2>
                            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium">
                                Latest
                            </span>
                        </div>

                        {/* Visit Title */}
                        <p className="text-blue-700 font-medium mb-4">Thyroid – Follow up</p>

                        {/* Vital Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

                            <div className="border rounded-lg p-1 shadow-sm flex items-center gap-3 bg-white">
                                <FaWeight className="text-blue-500 text-lg" />
                                <div>
                                    <p className="text-xs text-gray-500">Weight</p>
                                    <p className="font-semibold text-gray-700">56 Kg</p>
                                </div>
                            </div>

                            <div className="border rounded-lg p-1 shadow-sm flex items-center gap-3 bg-white">
                                <FaHeartbeat className="text-red-500 text-lg" />
                                <div>
                                    <p className="text-xs text-gray-500">Blood Pressure</p>
                                    <p className="font-semibold text-gray-700">118/78 mmHg</p>
                                </div>
                            </div>

                            <div className="border rounded-lg p-1 shadow-sm flex items-center gap-3 bg-white">
                                <FaRulerVertical className="text-purple-500 text-lg" />
                                <div>
                                    <p className="text-xs text-gray-500">Height</p>
                                    <p className="font-semibold text-gray-700">5.4 feet</p>
                                </div>
                            </div>

                        </div>

                        {/* Reports & Tests */}
                        <div className="mb-5">
                            <h3 className="flex items-center gap-2 text-gray-800 font-medium mb-2">
                                <FiFileText className="text-blue-500" /> Reports & Tests
                            </h3>

                            <div className="flex gap-3 flex-wrap">
                                <span className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                                    TSH Test – Normal
                                </span>
                                <span className="bg-purple-100 text-purple-700 text-xs font-medium px-3 py-1 rounded-full">
                                    T3/T4 Levels – Within Range
                                </span>
                            </div>
                        </div>

                        {/* Medicines */}
                        <div className="mb-5">
                            <h3 className="text-gray-800 font-medium mb-2">Prescribed Medicines</h3>

                            <ul className="list-disc ml-5 text-sm text-gray-800 space-y-2">

                                {/* Medicine 1 */}
                                <li>
                                    <p className="font-semibold">Thyronorm</p>
                                    <p className="text-gray-500 text-xs mt-0.5">
                                        Morning: 1, Afternoon: 0, Night: 0
                                    </p>
                                </li>

                                {/* Medicine 2 */}
                                <li>
                                    <p className="font-semibold">Vitamin D3</p>
                                    <p className="text-gray-500 text-xs mt-0.5">
                                        Morning: 0, Afternoon: 0, Night: 1
                                    </p>
                                </li>

                            </ul>
                        </div>

                        {/* Notes */}
                        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded-md text-sm">
                            <strong>Notes:</strong> Patient showing improvement. Continue medication.
                        </div>

                    </div>






                </div>


            </div>

        </div>
    </>
}




