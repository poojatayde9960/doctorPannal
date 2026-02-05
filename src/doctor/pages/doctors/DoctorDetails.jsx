import React from 'react';
import {
    FaEnvelope, FaPhoneAlt, FaCalendarAlt, FaUser,
    FaGraduationCap, FaBriefcase, FaChevronDown
} from 'react-icons/fa';
import { useGetDoctorsQuery } from '../../../redux/apis/patientsApi';
import { useParams } from 'react-router-dom';

const DoctorDetails = ({ doctorId }) => {

    const { id } = useParams();
    const { data, isLoading, error } = useGetDoctorsQuery();
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading doctors</p>;

    // particular doctor filter
    const doctor = data?.Doctors?.find(d => d._id === id); // use id here
    if (!doctor) return <p>Doctor not found</p>;

    const dayColorMap = {
        monday: "bg-purple-100 text-purple-600",
        tuesday: "bg-green-100 text-green-600",
        wednesday: "bg-blue-100 text-blue-600",
        thursday: "bg-orange-100 text-orange-600",
        friday: "bg-pink-100 text-pink-600",
        saturday: "bg-indigo-100 text-indigo-600",
        sunday: "bg-cyan-100 text-cyan-600",
    };


    return <>
        {/* <pre className='text-black'>{JSON.stringify(data, null, 2)}</pre> */}
        <div className="bg-white rounded-xl p-6 mb-8 border border-blue-200 shadow-sm">

            {/* GRID LAYOUT */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                {/* LEFT PANEL */}
                <div className="border border-blue-200  rounded-md p-2 ">

                    {/* Profile */}
                    <div className="flex gap-4 mb-6 border p-4 rounded-md">
                        <img
                            src={doctor.image || "https://img.freepik.com/free-photo/portrait-smiling-handsome-male-doctor-man_171337-5055.jpg"}
                            alt={doctor.name}
                            className="w-24 h-24 rounded-lg object-cover"
                        />
                        <div>
                            <span className="bg-blue-100 text-blue-500 text-xs px-2 py-0.5 rounded inline-block mb-1">
                                #{doctor._id?.slice(-4)}
                            </span>
                            <h3 className="text-lg font-bold text-gray-800">{doctor.name}</h3>
                            <p className="text-sm text-gray-500">{doctor.specialization}</p>
                        </div>
                    </div>

                    <hr className="border-gray-200 mb-5" />

                    {/* INFO LIST WITHOUT SMALL COMPONENT */}
                    <div className="space-y-5 text-sm">

                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3 text-black">
                                <FaPhoneAlt className="text-gray-400" />
                                <span className=" font-medium">Contact No</span>
                                {/* <span className=" font-medium">{doctor?.contact}</span> */}

                            </div>
                            <span className=" text-gray-800">{doctor?.contact}</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3 text-black">
                                <FaEnvelope className="text-gray-400" />
                                <span className="font-medium">Email ID</span>
                            </div>
                            <span className="text-gray-800">{doctor?.email}</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3 text-black">
                                <FaCalendarAlt className="text-gray-400" />
                                <span className="font-medium">Date of Birth</span>
                            </div>
                            <span className="text-gray-800">  {new Date(doctor?.dateOfBirth).toLocaleDateString()}</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3 text-black">
                                <FaUser className="text-gray-400" />
                                <span className="font-medium">Gender</span>
                            </div>
                            <span className="text-gray-800">{doctor?.gender}</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3 text-black">
                                <FaGraduationCap className="text-gray-400" />
                                <span className="font-medium">Education</span>
                            </div>
                            <span className="text-gray-800 ml-[22%]">{doctor?.education}</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3 text-black">
                                <FaBriefcase className="text-gray-400" />
                                <span className="font-medium">Experience</span>
                            </div>
                            <span className="text-gray-800">{doctor?.experience}+ Years</span>
                        </div>
                    </div>

                </div>

                {/* RIGHT PANEL */}
                <div className="lg:col-span-2 space-y-8">

                    {/* About */}
                    <div className="rounded-lg border border-blue-200 p-4">
                        <div className="flex justify-between items-center cursor-pointer">
                            <h3 className="text-lg font-bold text-gray-800">About</h3>
                            <FaChevronDown className="text-gray-400" />
                        </div>
                    </div>

                    {/* Schedule */}
                    <div className="rounded-lg border border-blue-200 p-4">
                        <h3 className="text-lg font-bold text-gray-800 mb-3">Availability Schedule</h3>
                        <hr className="border-gray-200 mb-4" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {doctor?.availabilitySchedule?.map((dayItem) => (
                                <div key={dayItem._id}
                                    className="border border-gray-100 rounded-xl py-4 bg-white grid grid-cols-4 gap-2"
                                >
                                    {/* <div
                                        className="
    col-span-1
    text-xs font-semibold
    px-1 py-2
    bg-blue-100 text-blue-600
    rounded
    h-fit
    self-start
    inline-flex
    items-center
    justify-center
  "
                                    >
                                        {dayItem.day}
                                    </div> */}
                                    <div
                                        className={`
    col-span-1
    text-xs font-semibold
   px-1 py-2
    rounded
    h-fit
    self-start
    inline-flex
    items-center
    justify-center
    ${dayColorMap[dayItem.day.toLowerCase()] || "bg-gray-100 text-gray-500"}
  `}
                                    >
                                        {dayItem.day}
                                    </div>



                                    <div className="col-span-3 grid grid-cols-2 gap-4 text-xs">
                                        <div>
                                            <p className="text-gray-400">Morning</p>
                                            {/* <p className="font-semibold text-gray-700">slot.morning</p> */}
                                            {dayItem.morning?.length > 0 ? (
                                                dayItem.morning.map((slot) => (
                                                    <p key={slot._id} className="font-semibold text-gray-700">
                                                        {slot.start} - {slot.end}
                                                    </p>
                                                ))
                                            ) : (
                                                <p className="text-gray-300">Not Available</p>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-gray-400">Evening</p>
                                            {dayItem.evening?.length > 0 ? (
                                                dayItem.evening.map((slot) => (
                                                    <p key={slot._id} className="font-semibold text-gray-700">
                                                        {slot.start} - {slot.end}
                                                    </p>
                                                ))
                                            ) : (
                                                <p className="text-gray-300">Not Available</p>
                                            )}
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>

                    </div>

                </div>

            </div>
        </div>

    </>
};

export default DoctorDetails;
