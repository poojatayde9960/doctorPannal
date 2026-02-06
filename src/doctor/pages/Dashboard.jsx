import React from 'react'
import { FaArrowUp, FaChartBar, FaChild, FaClock, FaShoppingBag } from 'react-icons/fa'
import { HiOutlineShoppingCart, HiUsers } from "react-icons/hi"
import TopSellingProducts from '../components/TopSellingProducts'
import { FaArrowTrendUp, FaCalendarDays, FaRegCircleCheck } from 'react-icons/fa6'
import { MdOutlineAttachMoney } from 'react-icons/md'
import TodaysAppointments from '../components/TodaysAppointments'
import QuickActions from '../components/QuickActions'
import { useGetAppointmentsQuery, useGetDashQuery, useMyPatientsQuery } from '../../redux/apis/patientsApi'
import { useSelector } from 'react-redux'


const Dashboard = () => {
    console.log("Redux auth slice 👉", useSelector(state => state.auth));

    console.log("Redux auth slice 👉", useSelector(state => state.auth));
    const admin = useSelector((state) => state.auth.admin);
    const doctorId = admin?._id;

    console.log("Redux auth slice →", useSelector(state => state.auth));
    console.log("Current doctor ID →", doctorId);

    const { data: dashData, isLoading } = useGetDashQuery(doctorId, {
        skip: !doctorId
    });
    const appointments = dashData?.Appoinment || [];
    const dashboard = dashData?.dashboard || {};




    const todayAppointments = appointments.filter(app =>
        new Date(app.appointmentTime).toDateString() ===
        new Date().toDateString()
    );

    const stats = [
        {
            title: "Appointments Today",
            icon: <FaCalendarDays />,
            count: dashboard.todaysAppointments ?? 0,
            subtext: "Today’s Appointments",
        },
        {
            title: "Pending Approvals",
            icon: <FaClock />,
            count: dashboard.pendingApprovals ?? 0,
            subtext: "Waiting for approval",
        },
        {
            title: "Patients In Queue",
            icon: <HiUsers />,
            count: dashboard.patientsInQueue ?? 0,
            subtext: "Patients In Queue",
        },
        {
            title: "Completed",
            icon: <FaRegCircleCheck />,
            count: dashboard.completedThisWeek ?? 0,
            subtext: "Completed Consultation",
        }
    ];


    return <>
        {/* <pre className='text-black'>{JSON.stringify(dashData, null, 2)}</pre> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {stats.map((stat, index) => (
                <div key={index} className="p-4 bg-white shadow rounded-xl">
                    <div className="flex items-center justify-between">
                        <p className="text-xl text-blue-500 bg-[#EAF0FE] rounded-md p-1">
                            {stat.icon}
                        </p>
                        <FaArrowTrendUp className="text-green-500" />
                    </div>

                    <p className="text-2xl mt-2 text-blue-600">{stat.count}</p>
                    <h3 className="text-black text-sm mt-2">{stat.subtext}</h3>
                    <h4 className="text-black text-sm mt-1">+3 From yesterday</h4>
                </div>
            ))}

        </div>

        <div className=" mx-auto mt-5">
            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Bar Chart (Full width on sm, 8 columns on md+) */}
                <div className="md:col-span-8 bg-white  rounded-xl">
                    <TodaysAppointments appointments={todayAppointments} />
                </div>

                {/* Stats Box (Full width on sm, 4 columns on md+) */}
                <div className="md:col-span-4 flex flex-col gap-4">


                    {/* Total Sales Box with Chart */}
                    <div className="bg-white rounded-xl ">
                        <QuickActions
                            dashboard={{ totalPatients: dashData?.PatientCount }}
                            isLoading={isLoading}
                        />

                    </div>
                </div>
            </div>
        </div>

        <div className=" mx-auto mt-5">
            {/* <TopSellingProducts /> */}
        </div>


    </>
}

export default Dashboard