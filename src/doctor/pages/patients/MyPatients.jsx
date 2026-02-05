import React from "react";
import { Link } from "react-router-dom";
import { useMyPatientsQuery } from "../../../redux/apis/patientsApi";
import { useSelector } from "react-redux";

export default function MyPatient() {
    // const admin = useSelector((state) => state.auth?.admin);
    // const doctorId = admin?._id;
    console.log("Redux auth slice 👉", useSelector(state => state.auth));

    const admin = useSelector((state) => state.auth.admin);
    const doctorId = admin?._id;   // ← आता admin मध्ये थेट _id आहे

    console.log("Redux auth slice →", useSelector(state => state.auth));
    console.log("Current doctor ID →", doctorId);

    const { data, isLoading, error } = useMyPatientsQuery(doctorId, {
        skip: !doctorId,
    });
    // ✅ Show loading if user info is not available
    if (!admin || !doctorId) {
        return (
            <div className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center animate-pulse">
                    <span className="text-blue-500 text-3xl">⏳</span>
                </div>
                <h2 className="text-lg font-semibold text-gray-800">
                    Loading doctor information...
                </h2>
                <p className="text-gray-500 text-sm max-w-xs">
                    Please wait, we are fetching your account information.
                </p>

            </div>
        );
    }
    const patients = data?.Patients || [];



    if (isLoading) return (

        <div className="w-full bg-white rounded-xl p-4 space-y-4 animate-pulse">
            {/* UID */}
            <div className="w-14 h-5 bg-slate-300 rounded-sm"></div>

            {/* Avatar + Name */}
            <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-slate-300"></div>
                <div className="h-4 w-32 bg-slate-300 rounded"></div>
            </div>

            {/* Stats box */}
            <div className="grid grid-cols-2 rounded-xl border p-2 border-blue-100 gap-2">
                <div className="space-y-2">
                    <div className="h-3 w-20 bg-slate-200 rounded mx-auto"></div>
                    <div className="h-4 w-24 bg-slate-300 rounded mx-auto"></div>
                </div>
                <div className="space-y-2">
                    <div className="h-3 w-24 bg-slate-200 rounded mx-auto"></div>
                    <div className="h-4 w-12 bg-slate-300 rounded mx-auto"></div>
                </div>
            </div>

            {/* Button */}
            <div className="h-10 w-full bg-slate-300 rounded-lg"></div>
        </div>
    )
        ;
    if (error) return (



        <div className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center animate-bounce">
                <span className="text-red-500 text-3xl">!</span>
            </div>

            <h2 className="text-lg font-semibold text-gray-800">
                Something went wrong
            </h2>

            <p className="text-gray-500 text-sm max-w-xs">
                We couldn’t load patients right now. Please check your connection or try again.
            </p>

            <button
                onClick={() => window.location.reload()}
                className="mt-3 px-5 py-2 bg-[#0BA7E8] text-white rounded-lg text-sm hover:opacity-90 transition"
            >
                Retry
            </button>
        </div>
    );



    return <>

        {/* <pre className="text-black">{JSON.stringify(data, null, 2)}</pre> */}
        {patients.length > 0 ? (
            <div className="w-full bg-[#F6FAFF] p-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {patients.map((patient) => (
                    <Link key={patient._id} to={`/patientDetails/${patient._id}`}>
                        <div className="w-full bg-white rounded-xl p-4 space-y-2">
                            <div className="bg-[#2D9AD8] w-10 rounded-sm text-center">
                                <p className="text-white text-sm">#{patient.UID}</p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0BA7E8] to-[#29C58F] flex items-center justify-center text-white text-3xl font-semibold">
                                    {patient.patientName?.slice(0, 1)}
                                </div>
                                <h2 className="mt-4 text-lg  text-[#0E3C5F]">   {patient.patientName}</h2>
                            </div>


                            <div className="grid grid-cols-2 rounded-xl border p-1 border-blue-200 overflow-hidden">
                                <div className="p-2 text-center border-r-2 border-blue-100">
                                    <p className="text-black text-sm">Last Visit</p>
                                    <p className="text-gray-400 font-semibold mt-1"> {new Date(patient.createdAt).toLocaleDateString()}
                                    </p>
                                </div>


                                <div className="p-2 text-center">
                                    <p className="text-black text-sm">Appointments</p>
                                    <p className="text-gray-400 font-semibold text-lg mt-1">{patient.appointmentCount}</p>
                                </div>
                            </div>


                            <button className="w-full bg-[#0BA7E8] text-white py-2 rounded-lg  hover:opacity-90 transition">
                                Create Prescription
                            </button>
                        </div>
                    </Link>
                ))}
            </div>
        ) : (
            !isLoading && (
                <div className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center">
                        <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800">
                        No Patients Found
                    </h2>
                    <p className="text-gray-500 text-sm max-w-md">
                        You don't have any patients assigned yet. Patients will appear here once they are assigned to you.
                    </p>
                </div>
            )
        )}
    </>
}