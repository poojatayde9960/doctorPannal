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
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // ✅ Get doctor info from Redux
    const admin = useSelector((state) => state.auth.admin);
    const doctor = admin?.doctor;
    const doctorImage = doctor?.image || null;
    const doctorName = doctor?.name || "Doctor";

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

    // Path to Title Mapping
    const titles = {
        "/": "Dashboard",
        "/appointments": "Appointments",
        "/products": "Products",
        "/orders": "Orders",
        "/pendingApprovals": "PendingApprovals",
        "/addProduct": "AddProduct",
        "/leads": "Leads",
        "/transactions": "Transactions",
        "/partnerManagement": "Partner Management",
        "/settings": "Settings",
    };
    return (
        <header className="bg-white shadow-md p-4 flex items-center justify-between">
            {/* Sidebar Toggle Button (Mobile) */}
            <button onClick={toggleSidebar} className="text-gray-900 text-2xl md:hidden">
                <FaBars />
            </button>

            {/* Dynamic Page Title */}
            <h1 className="text-xl font-bold">{titles[location.pathname] || "Admin Panel"}</h1>

            <div className="flex items-center gap-8">
                {/* Search Input */}
                <div className=" hidden md:block">

                    <FaSearch className=" left-2 top-2 text-gray-500" />
                </div>

                {/* Notification Icon */}
                <div className="relative cursor-pointer">
                    <FaBell className="text-gray-700 text-2xl" />
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                        3
                    </span>
                </div>

                {/* Profile Dropdown (No State Needed) */}
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

                        {/* Doctor Name */}
                        <span className="hidden md:block text-sm font-medium text-gray-700">
                            {doctorName}
                        </span>

                        {/* Dropdown Icon */}
                        <FaChevronDown className="text-gray-500" />
                    </div>

                    {/* Dropdown Menu */}
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40">
                        <li>
                            <button
                                className="text-red-600 w-full text-left"
                                onClick={handleLogout}
                                disabled={isLoading}
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
