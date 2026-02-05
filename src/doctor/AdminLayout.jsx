import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import { Outlet } from "react-router-dom";


const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <div className="flex h-screen w-full">
            {/* Sidebar (Fixed) */}
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Main Content Area */}
            <div className="flex flex-col flex-1 h-screen w-full transition-all duration-300">
                {/* Header (Fixed) */}
                <Header toggleSidebar={toggleSidebar} />

                {/* Main Content (Scroll Only Outlet) */}
                <main className="flex-1 p-4 bg-[#F5FCFF] overflow-y-auto w-full">
                    <Outlet />
                </main>
            </div>
        </div>

    )
}

export default AdminLayout