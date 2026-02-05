import React from "react";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetDoctorsQuery } from "../../../redux/apis/patientsApi";

export default function AllDoctors() {
    const { data, isLoading, error } = useGetDoctorsQuery();

    if (isLoading) return <p className="text-center mt-10"><div className="w-full bg-white rounded-xl shadow p-4 space-y-3 animate-pulse">

        {/* ID */}
        <div className="bg-slate-300 w-10 h-5 rounded-sm"></div>

        {/* Avatar */}
        <div className="flex flex-col items-center space-y-3">
            <div className="w-20 h-20 rounded-full bg-slate-300"></div>
            <div className="h-4 w-32 bg-slate-300 rounded"></div>
            <div className="h-3 w-24 bg-slate-200 rounded"></div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 rounded-xl border p-2 border-blue-100">
            <div className="space-y-2 text-center">
                <div className="h-3 bg-slate-300 rounded mx-auto w-16"></div>
                <div className="h-4 bg-slate-200 rounded mx-auto w-12"></div>
            </div>
            <div className="space-y-2 text-center">
                <div className="h-3 bg-slate-300 rounded mx-auto w-20"></div>
                <div className="h-4 bg-slate-200 rounded mx-auto w-10"></div>
            </div>
        </div>

        {/* Email */}
        <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-slate-300 rounded"></div>
            <div className="h-3 w-40 bg-slate-200 rounded"></div>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-slate-300 rounded"></div>
            <div className="h-3 w-32 bg-slate-200 rounded"></div>
        </div>

    </div></p>;
    if (error) return <p className="text-center mt-10 text-red-500">Error loading doctors</p>;

    // Data check
    const doctors = data?.Doctors || [];

    return (
        <div className="p-4 w-full bg-[#F6FAFF] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor, index) => (
                <Link key={doctor._id} to={`/doctordetails/${doctor._id}`}>
                    <div className="w-full bg-white rounded-xl shadow p-4 space-y-2">
                        {/* Doctor ID */}
                        <div className="bg-[#CC25B0] w-10 rounded-sm text-center">
                            <p className="text-white text-sm">#{index + 1}</p>
                        </div>

                        {/* Avatar and Name */}
                        <div className="flex flex-col items-center text-center">
                            {/* Dynamic Doctor Image */}
                            {doctor.image ? (
                                <img
                                    src={doctor.image}
                                    alt={doctor.name}
                                    className="w-20 h-20 rounded-full object-cover border-4 border-gradient-to-br from-[#0BA7E8] to-[#29C58F] shadow-lg"
                                />
                            ) : (
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0BA7E8] to-[#29C58F] flex items-center justify-center text-white text-3xl font-semibold">
                                    {doctor.name?.slice(0, 1)}
                                </div>
                            )}
                            <h2 className="mt-4 text-xl font-semibold text-[#0E3C5F]">{doctor.name}</h2>
                            <p className="text-gray-500 text-sm">{doctor.specialization}</p>
                        </div>

                        {/* Experience & Appointments */}
                        <div className="grid grid-cols-2 rounded-xl border p-2 border-blue-100 overflow-hidden">
                            <div className="p-2 text-center border-r-2 border-blue-100">
                                <p className="text-black text-sm">Experience</p>
                                <p className="text-gray-400 font-semibold mt-1">{doctor.experience}+ yrs</p>
                            </div>

                            <div className="p-2 text-center">
                                <p className="text-black text-sm">Appointments</p>
                                <p className="text-gray-400 font-semibold text-lg mt-1">
                                    {doctor.availabilitySchedule?.length || 0}
                                </p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-center gap-2">
                            <div className="text-blue-600">
                                <FaEnvelope />
                            </div>
                            <p>{doctor.email}</p>
                        </div>

                        {/* Contact */}
                        <div className="flex items-center gap-2">
                            <div className="text-blue-600">
                                <FaPhoneAlt />
                            </div>
                            <p>{doctor.contact}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
