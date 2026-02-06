import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSearch, FaBell, FaUser } from "react-icons/fa"
import { FcBusinessman } from "react-icons/fc";
import { FaChevronDown } from "react-icons/fa";
import { useLogoutMutation } from "../../redux/apis/authApi";
import { useSelector } from "react-redux";

const Header = ({ toggleSidebar }) => {
    const [logout, { isLoading }] = useLogoutMutation();
    const location = useLocation();
    const navigate = useNavigate();

    // ✅ Get doctor info from Redux
    const admin = useSelector((state) => state.auth?.admin);

    // Extract doctor information with proper fallbacks
    const doctorName = admin?.name || admin?.doctorName || "Doctor";
    const doctorEmail = admin?.email || "";
    const doctorImage = admin?.image || admin?.profileImage || null;
    const doctorSpecialty = admin?.specialty || admin?.specialization || "";
    const doctorId = admin?._id || "";

    // Logout handler
    const handleLogout = async () => {
        try {
            await logout().unwrap(); // Call the API
            // Clear local storage
            localStorage.removeItem('token');
            localStorage.removeItem('admin');

            // Redirect to login
            navigate('/login', { replace: true });
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    // ✅ Enhanced Path to Title Mapping - Covers all routes
    const getPageTitle = () => {
        const path = location.pathname;

        // Exact path matches
        const titleMap = {
            "/": "Dashboard",
            "/appointments": "Appointments",
            "/myPatient": "My Patients",
            "/schedule": "Schedule",
            "/alldoctors": "All Doctors",
            "/prescriptions": "Prescriptions",
            "/addProduct": "Invoice",
            "/settings": "Settings",
        };

        // Check exact match first
        if (titleMap[path]) {
            return titleMap[path];
        }

        // Handle dynamic routes (e.g., /patient/123)
        if (path.startsWith('/patient/')) {
            return "Patient Details";
        }
        if (path.startsWith('/appointment/')) {
            return "Appointment Details";
        }
        if (path.startsWith('/doctor/')) {
            return "Doctor Details";
        }

        // Default fallback
        return "Dashboard";
    };
    return (
        <header className="bg-white shadow-md p-4 flex items-center justify-between">
            {/* Sidebar Toggle Button (Mobile) */}
            <button onClick={toggleSidebar} className="text-gray-900 text-2xl md:hidden">
                <FaBars />
            </button>

            {/* Dynamic Page Title - Using function */}
            <h1 className="text-xl font-bold text-gray-800">{getPageTitle()}</h1>

            <div className="flex items-center gap-8">
                {/* Search Input */}
                <div className=" hidden md:block">

                    <FaSearch className=" left-2 top-2 text-gray-500" />
                </div>

                {/* Notification Icon */}
                <div className="relative cursor-pointer">
                    <FaBell className="text-gray-700 text-2xl" />
                    {/* TODO: Make notification count dynamic from API */}
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                        3
                    </span>
                </div>

                {/* Profile Dropdown */}
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="flex items-center gap-2 cursor-pointer">
                        {/* Profile Image - Dynamic */}
                        {doctorImage ? (
                            <img
                                src={doctorImage}
                                alt={doctorName}
                                className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
                            />
                        ) : (
                            <FcBusinessman className="w-10 h-10 rounded-full bg-gray-200" />
                        )}

                        {/* Doctor Name & Specialty */}
                        <div className="hidden md:block text-left">
                            <p className="text-sm font-medium text-gray-700">{doctorName}</p>
                            {doctorSpecialty && (
                                <p className="text-xs text-gray-500">{doctorSpecialty}</p>
                            )}
                        </div>

                        {/* Dropdown Icon */}
                        <FaChevronDown className="text-gray-500" />
                    </div>

                    {/* Dropdown Menu */}
                    <ul
                        tabIndex={0}
                        className="dropdown-content z-[20] mt-3 menu p-0 shadow bg-white rounded-box w-44"
                    >
                        <li>
                            <button
                                onClick={handleLogout}
                                disabled={isLoading}
                                className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-box"
                            >
                                {isLoading ? "Logging out..." : "Logout"}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;
