import React, { useState } from 'react';
import {
    FaEnvelope, FaPhoneAlt, FaCalendarAlt, FaUser,
    FaGraduationCap, FaBriefcase, FaMapMarkerAlt,
    FaStar, FaEdit, FaCertificate, FaAward,
    FaClock, FaLanguage, FaIdCard, FaVenusMars
} from 'react-icons/fa';
import { MdVerified, MdLocationOn, MdLanguage } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useGetDoctorsQuery } from '../../redux/apis/patientsApi';

const DoctorProfile = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const admin = useSelector((state) => state.auth?.admin);
    const doctorId = admin?._id;

    const { data, isLoading, error } = useGetDoctorsQuery();

    if (isLoading) return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading profile...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <p className="text-red-600 font-semibold">Error loading profile</p>
                <p className="text-sm text-gray-600 mt-2">Please try again later</p>
            </div>
        </div>
    );

    // Find current logged-in doctor from the list
    const doctor = data?.Doctors?.find(d => d._id === doctorId);

    if (!doctor) return (
        <div className="flex items-center justify-center h-screen">
            <p className="text-gray-600">Doctor profile not found</p>
        </div>
    );

    const dayColorMap = {
        monday: "bg-purple-100 text-purple-700 border-purple-300",
        tuesday: "bg-green-100 text-green-700 border-green-300",
        wednesday: "bg-blue-100 text-blue-700 border-blue-300",
        thursday: "bg-orange-100 text-orange-700 border-orange-300",
        friday: "bg-pink-100 text-pink-700 border-pink-300",
        saturday: "bg-indigo-100 text-indigo-700 border-indigo-300",
        sunday: "bg-cyan-100 text-cyan-700 border-cyan-300",
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="min-h-screen bg-[#F5FCFF]">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 rounded-t-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10">
                    <div className="w-64 h-64 bg-white rounded-full -mr-32 -mt-32"></div>
                </div>
                <div className="absolute bottom-0 left-0 opacity-10">
                    <div className="w-48 h-48 bg-white rounded-full -ml-24 -mb-24"></div>
                </div>

                <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
                    {/* Profile Image */}
                    <div className="relative group">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-white">
                            {doctor.image ? (
                                <img
                                    src={doctor.image}
                                    alt={doctor.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 text-white text-5xl font-bold">
                                    {doctor.name?.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>
                        <button className="absolute bottom-2 right-2 bg-white text-blue-600 p-2 rounded-full shadow-lg hover:bg-blue-50 transition-all">
                            <FaEdit className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Doctor Info */}
                    <div className="flex-1 text-white">
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl md:text-4xl font-bold">{doctor.name}</h1>
                            <MdVerified className="text-white text-2xl" title="Verified Doctor" />
                        </div>
                        <p className="text-blue-100 text-lg mb-3">{doctor.specialization}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                <FaBriefcase className="text-blue-200" />
                                <span>{doctor.experience}+ Years Experience</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                <FaIdCard className="text-blue-200" />
                                <span>ID: {doctor.UID || doctor._id?.slice(-8).toUpperCase()}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                <FaStar className="text-yellow-300" />
                                <span>4.8 Rating</span>
                            </div>
                        </div>
                    </div>

                    {/* Edit Profile Button */}
                    <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2">
                        <FaEdit />
                        Edit Profile
                    </button>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white shadow-sm border-b sticky top-0 z-10">
                <div className="flex gap-8 px-8">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`py-4 px-2 font-semibold border-b-2 transition-all ${activeTab === 'overview'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Overview
                    </button>
                    {/* <button
                        onClick={() => setActiveTab('schedule')}
                        className={`py-4 px-2 font-semibold border-b-2 transition-all ${activeTab === 'schedule'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Schedule
                    </button> */}
                    {/* <button
                        onClick={() => setActiveTab('qualifications')}
                        className={`py-4 px-2 font-semibold border-b-2 transition-all ${activeTab === 'qualifications'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Qualifications
                    </button> */}
                </div>
            </div>

            {/* Main Content */}
            <div className="p-8">
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column - Personal Information */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* Personal Details Card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                    <FaUser className="text-blue-600" />
                                    Personal Information
                                </h3>

                                <div className="space-y-4">
                                    <InfoRow
                                        icon={<FaVenusMars className="text-blue-500" />}
                                        label="Gender"
                                        value={doctor.gender || 'Not specified'}
                                    />
                                    <InfoRow
                                        icon={<FaCalendarAlt className="text-green-500" />}
                                        label="Date of Birth"
                                        value={formatDate(doctor.dateOfBirth)}
                                    />
                                    <InfoRow
                                        icon={<FaPhoneAlt className="text-purple-500" />}
                                        label="Phone"
                                        value={doctor.contact}
                                    />
                                    <InfoRow
                                        icon={<FaEnvelope className="text-orange-500" />}
                                        label="Email"
                                        value={doctor.email}
                                    />
                                    <InfoRow
                                        icon={<MdLocationOn className="text-red-500" />}
                                        label="Address"
                                        value={doctor.address || 'Not specified'}
                                    />
                                </div>
                            </div>

                            {/* Quick Stats Card */}
                            {/* <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-200 p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Stats</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <StatCard number="500+" label="Patients Treated" color="blue" />
                                    <StatCard number="1,200+" label="Consultations" color="green" />
                                    <StatCard number="4.8" label="Average Rating" color="yellow" />
                                    <StatCard number="98%" label="Success Rate" color="purple" />
                                </div>
                            </div> */}
                        </div>

                        {/* Right Column - Professional Information */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Professional Details */}
                            <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                    <FaBriefcase className="text-blue-600" />
                                    Professional Details
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                        <div className="flex items-start gap-3">
                                            <FaGraduationCap className="text-blue-600 text-xl mt-1" />
                                            <div>
                                                <p className="text-sm text-gray-600 mb-1">Education</p>
                                                <p className="font-semibold text-gray-800">{doctor.education}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                                        <div className="flex items-start gap-3">
                                            <FaBriefcase className="text-green-600 text-xl mt-1" />
                                            <div>
                                                <p className="text-sm text-gray-600 mb-1">Experience</p>
                                                <p className="font-semibold text-gray-800">{doctor.experience}+ Years</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                                        <div className="flex items-start gap-3">
                                            <FaCertificate className="text-purple-600 text-xl mt-1" />
                                            <div>
                                                <p className="text-sm text-gray-600 mb-1">Specialization</p>
                                                <p className="font-semibold text-gray-800">{doctor.specialization}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                                        <div className="flex items-start gap-3">
                                            <FaIdCard className="text-orange-600 text-xl mt-1" />
                                            <div>
                                                <p className="text-sm text-gray-600 mb-1">Registration Number</p>
                                                <p className="font-semibold text-gray-800">{doctor.registrationNumber || 'Not specified'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* About Section */}
                            <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">About</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    {doctor.about || `Dr. ${doctor.name} is a highly experienced ${doctor.specialization} with over ${doctor.experience} years of clinical experience. Dedicated to providing exceptional patient care and utilizing the latest medical advancements to ensure the best outcomes for patients.`}
                                </p>
                            </div>

                            {/* Languages & Skills */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
                                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <MdLanguage className="text-blue-600" />
                                        Languages
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {doctor.languages && doctor.languages.length > 0 ? (
                                            doctor.languages.map((lang, idx) => (
                                                <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium">
                                                    {lang}
                                                </span>
                                            ))
                                        ) : (
                                            <>
                                                <span className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium">English</span>
                                                <span className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium">Hindi</span>
                                            </>
                                        )}
                                    </div>
                                </div> */}

                                {/* <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
                                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <FaAward className="text-blue-600" />
                                        Specialties
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {doctor.specialties && doctor.specialties.length > 0 ? (
                                            doctor.specialties.map((specialty, idx) => (
                                                <span key={idx} className="bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium">
                                                    {specialty}
                                                </span>
                                            ))
                                        ) : (
                                            <>
                                                <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium">{doctor.specialization}</span>
                                                <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium">General Medicine</span>
                                            </>
                                        )}
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'schedule' && (
                    <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <FaClock className="text-blue-600" />
                                Weekly Availability Schedule
                            </h3>
                            <button className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-all flex items-center gap-2">
                                <FaEdit />
                                Edit Schedule
                            </button>
                        </div>

                        {doctor?.availabilitySchedule && doctor.availabilitySchedule.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {doctor.availabilitySchedule.map((dayItem) => (
                                    <div
                                        key={dayItem._id}
                                        className={`border-2 rounded-xl p-5 transition-all hover:shadow-lg ${dayColorMap[dayItem.day.toLowerCase()] || "bg-gray-50 border-gray-300"
                                            }`}
                                    >
                                        <h4 className="font-bold text-lg mb-4 capitalize flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-current"></div>
                                            {dayItem.day}
                                        </h4>

                                        <div className="space-y-3">
                                            {/* Morning Slots */}
                                            <div className="bg-white/50 rounded-lg p-3 border border-current border-opacity-20">
                                                <p className="text-xs font-semibold opacity-70 mb-2">Morning</p>
                                                {dayItem.morning && dayItem.morning.length > 0 ? (
                                                    <div className="space-y-1">
                                                        {dayItem.morning.map((slot) => (
                                                            <p key={slot._id} className="font-semibold text-sm">
                                                                🕐 {slot.start} - {slot.end}
                                                            </p>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="text-sm opacity-50">Not Available</p>
                                                )}
                                            </div>

                                            {/* Evening Slots */}
                                            <div className="bg-white/50 rounded-lg p-3 border border-current border-opacity-20">
                                                <p className="text-xs font-semibold opacity-70 mb-2">Evening</p>
                                                {dayItem.evening && dayItem.evening.length > 0 ? (
                                                    <div className="space-y-1">
                                                        {dayItem.evening.map((slot) => (
                                                            <p key={slot._id} className="font-semibold text-sm">
                                                                🕐 {slot.start} - {slot.end}
                                                            </p>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="text-sm opacity-50">Not Available</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-gray-50 rounded-xl">
                                <FaClock className="text-gray-300 text-5xl mx-auto mb-4" />
                                <p className="text-gray-500 text-lg">No schedule available</p>
                                <button className="mt-4 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-all">
                                    Add Schedule
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'qualifications' && (
                    <div className="space-y-6">
                        {/* Education */}
                        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-8">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <FaGraduationCap className="text-blue-600" />
                                Education & Qualifications
                            </h3>

                            <div className="space-y-4">
                                <div className="border-l-4 border-blue-500 pl-6 py-4 bg-blue-50 rounded-r-lg">
                                    <h4 className="font-bold text-lg text-gray-800">{doctor.education}</h4>
                                    <p className="text-gray-600 text-sm mt-1">Primary Medical Degree</p>
                                </div>

                                {doctor.additionalQualifications && doctor.additionalQualifications.length > 0 ? (
                                    doctor.additionalQualifications.map((qual, idx) => (
                                        <div key={idx} className="border-l-4 border-green-500 pl-6 py-4 bg-green-50 rounded-r-lg">
                                            <h4 className="font-bold text-lg text-gray-800">{qual}</h4>
                                            <p className="text-gray-600 text-sm mt-1">Additional Qualification</p>
                                        </div>
                                    ))
                                ) : null}
                            </div>
                        </div>

                        {/* Certifications */}
                        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-8">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <FaCertificate className="text-blue-600" />
                                Certifications & Awards
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {doctor.certifications && doctor.certifications.length > 0 ? (
                                    doctor.certifications.map((cert, idx) => (
                                        <div key={idx} className="border border-blue-200 rounded-xl p-5 hover:shadow-lg transition-all bg-gradient-to-br from-blue-50 to-white">
                                            <div className="flex items-start gap-3">
                                                <FaAward className="text-blue-600 text-2xl mt-1" />
                                                <div>
                                                    <h4 className="font-bold text-gray-800">{cert}</h4>
                                                    <p className="text-sm text-gray-500 mt-1">Certified Professional</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-2 text-center py-12 bg-gray-50 rounded-xl">
                                        <FaAward className="text-gray-300 text-5xl mx-auto mb-4" />
                                        <p className="text-gray-500">No certifications added yet</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Experience Timeline */}
                        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-8">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <FaBriefcase className="text-blue-600" />
                                Professional Experience
                            </h3>

                            <div className="relative">
                                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-200"></div>

                                <div className="ml-8 space-y-8">
                                    <div className="relative">
                                        <div className="absolute -left-10 top-0 w-4 h-4 bg-blue-600 rounded-full border-4 border-white"></div>
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                                            <h4 className="font-bold text-lg text-gray-800">Senior {doctor.specialization}</h4>
                                            <p className="text-gray-600 text-sm">Current Position</p>
                                            <p className="text-gray-700 mt-2">{doctor.experience}+ years of dedicated service in healthcare</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Helper Components
const InfoRow = ({ icon, label, value }) => (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-blue-50 transition-all">
        <div className="text-xl mt-0.5">{icon}</div>
        <div className="flex-1">
            <p className="text-sm text-gray-600">{label}</p>
            <p className="font-semibold text-gray-800 break-words">{value}</p>
        </div>
    </div>
);

const StatCard = ({ number, label, color }) => {
    const colorClasses = {
        blue: 'bg-blue-100 text-blue-700',
        green: 'bg-green-100 text-green-700',
        yellow: 'bg-yellow-100 text-yellow-700',
        purple: 'bg-purple-100 text-purple-700',
    };

    return (
        <div className={`${colorClasses[color]} rounded-xl p-4 text-center`}>
            <p className="text-2xl font-bold">{number}</p>
            <p className="text-xs mt-1 opacity-80">{label}</p>
        </div>
    );
};

export default DoctorProfile;
