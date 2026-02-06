import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BsHandbag } from "react-icons/bs"
import { LuClock3, LuUsers } from "react-icons/lu"
import { FaHome, FaUser, FaCog, FaTrophy, FaBell, FaExchangeAlt, FaCalendarAlt, FaUserMd } from "react-icons/fa";
import { CiGrid42 } from 'react-icons/ci';
import { RiPagesLine } from 'react-icons/ri';

const menuItems = [
    { name: "Dashboard", path: "/", icon: <CiGrid42 /> },
    { name: "Appointments", path: "/appointments", icon: <FaCalendarAlt /> },
    { name: "MyPatient", path: "/myPatient", icon: <FaUser /> },
    { name: "Schedule", path: "/schedule", icon: <LuClock3 /> },
    { name: "Doctors", path: "/alldoctors", icon: <FaUserMd /> },
    // { name: "Invoice", path: "/addProduct", icon: <FaBell /> },
    { name: "Prescriptions", path: "/prescriptions", icon: <RiPagesLine /> },

];

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const location = useLocation(); // Get current path

    const handleNavClick = () => {
        if (window.innerWidth < 768) {
            toggleSidebar();
        }
    };

    return (
        <>
            <div className={`fixed text-sm md:relative shadow-lg inset-y-0 left-0 bg-white text-black h-screen p-4 transform transition-transform duration-300 z-40
                ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:w-64 w-60`}>

                {/* Close Button (Mobile) */}
                <button onClick={toggleSidebar} className="text-2xl mb-5 md:hidden">
                    ✖
                </button>

                {/* Logo */}
                <div>
                    <img src="./tech_surya_logo-removebg-preview 6.png" alt="Logo" className='h-16 ' />
                </div>

                {/* Navigation Menu */}
                <nav className="space-y-1 mt-4">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={handleNavClick}
                            className={`block rounded-lg text-[#2D9AD9] transition-colors duration-200 
                ${location.pathname === item.path ? "bg-blue-500 pl-1 text-white" : "hover:bg-gray-200"}`}
                        >
                            {/* Inner Blue Box (Different Color on Active) */}
                            <div className={`flex items-center gap-3 p-3 pl-4 rounded-xl w-[100%] 
                ${location.pathname === item.path ? "bg-[#2D9AD9] text-white" : "bg-transparent"}`}>

                                {/* Icon Color Change */}
                                {React.cloneElement(item.icon, {
                                    className: `text-2xl ${location.pathname === item.path ? "text-white text-lg" : "text-[#2D9AD9] text-lg"
                                        }`
                                })}

                                {item.name}
                            </div>
                        </Link>
                    ))}
                </nav>


            </div>

            {/* Overlay (Click to Close on Mobile) */}
            {isOpen && <div className="fixed inset-0 bg-black opacity-10 md:hidden" onClick={toggleSidebar}></div>}
        </>
    );
};

export default Sidebar;
