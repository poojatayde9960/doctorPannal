import { useState } from "react";
import { FaUser, FaUserMd, FaClock, FaCalendarCheck, FaCalendarAlt, FaEye } from "react-icons/fa";
import CreatePrescription from "./CreatePrescription";
import { useGetVisitsQuery } from "../../../redux/apis/patientsApi";


export default function Prescriptions() {
    const doctorId = "6971bbbf2a5e79c47ef2eb9b";
    const { data: visitsData, isLoading, isError } = useGetVisitsQuery(doctorId);
    const [open, setOpen] = useState(false);

    const data = [
        {
            name: "Jimmy Cartier",
            age: "31 Yr.",
            gender: "Female",
            doctor: "Dr. John Doe",
            lastVisit: "20-09-2025",
            nextVisit: "20-09-2025",
        },
        {
            name: "Ravi Kumar",
            age: "28 Yr.",
            gender: "Male",
            doctor: "Dr. Mehta",
            lastVisit: "15-09-2025",
            nextVisit: "30-09-2025",
        },
        {
            name: "Ravi Kumar",
            age: "28 Yr.",
            gender: "Male",
            doctor: "Dr. Mehta",
            lastVisit: "15-09-2025",
            nextVisit: "30-09-2025",
        }
    ];

    return <>
        <pre className="text-black">{JSON.stringify(visitsData, null, 2)}</pre>
        <div className="flex justify-end mb-5">
            <button
                onClick={() => setOpen(true)}
                className="bg-[#0BA7E8] text-white py-2 px-4 rounded-md font-medium shadow hover:opacity-90 transition flex items-center gap-2">
                Create Prescription
            </button>
            <CreatePrescription open={open} setOpen={setOpen} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

            {data.map((item, i) => (
                <div key={i} className="bg-white border border-blue-300 p-4 rounded-xl shadow space-y-3">

                    {/* Name + Icon */}
                    <div className="flex items-start gap-3">
                        {/* Icon */}
                        <div className="w-11 h-11 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-lg">
                            <FaUser />
                        </div>

                        {/* Name + Age/Gender stacked */}
                        <div className="flex flex-col">
                            <p className="font-semibold text-lg">{item.name}</p>
                            <p className="text-sm text-gray-600">{item.age} • {item.gender}</p>
                        </div>
                    </div>


                    {/* Doctor */}
                    <div className="flex items-center gap-2 mt-1">
                        <FaUserMd className="text-green-500 text-lg" />
                        <p className="text-sm">{item.doctor}</p>
                    </div>

                    {/* Last Visit */}
                    <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-red-500 text-lg" />
                        <p className="text-sm">
                            <span className="font-medium">Last Visit:</span> {item.lastVisit}
                        </p>
                    </div>

                    {/* Next Visit */}
                    <div className="flex items-center gap-2">
                        <FaClock className="text-[#CC25B0] text-lg" />
                        <p className="text-sm">
                            <span className="font-medium">Next Visit:</span> {item.nextVisit}
                        </p>
                    </div>

                    <label htmlFor="prescriptionModal" className="w-full bg-[#0BA7E8] text-white py-2 rounded-md font-medium shadow hover:opacity-90 transition flex items-center justify-center gap-2">
                        <FaEye className="text-white text-lg" />
                        View Prescription
                    </label>

                </div>
            ))}

        </div>



        {/* Modal */}
        <input type="checkbox" id="prescriptionModal" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box max-w-xl  rounded-xl w-full  my-auto max-h-[98vh] overflow-y-auto">

                {/* --- HEADER BRAND --- */}
                <div className="p-6 flex justify-between items-start ">
                    <div className="">
                        <img src="/tech_surya_logo-removebg-preview 6.png" alt="logo" className="w-36" />
                        <h1 className="text-2xl font-semibold mb-4">Prescription</h1>

                        <div className="grid grid-cols-2 max-w-xs gap-y-1 text-sm">
                            <p className="text-gray-600">Number</p>
                            <p className="font-medium">8653956</p>

                            <p className="text-gray-600">Date</p>
                            <p className="font-medium">20/10/2025</p>
                        </div>
                    </div>

                    <div className="text-right text-sm">
                        <p className="font-semibold text-green-600">To,</p>
                        <p className="font-semibold">John Doe</p>
                        <p>Golden City Center,<br />chhatrapati 431001</p>
                        <p className="font-semibold mt-1">+91 4444 855 858</p>
                    </div>
                </div>


                <div className="bg-[#D9EBFB] rounded-2xl overflow-hidden">

                    {/* --- MEDICINE TABLE HEADER --- */}
                    <div className="bg-[#2D9AD9] text-white px-6 py-3 font-medium text-sm grid grid-cols-3">
                        <p>Medicine</p>
                        <p>Qty</p>
                        <p>Time</p>
                    </div>

                    {/* --- TABLE BODY WITH ROW BORDERS --- */}
                    <div className="px-6 py-2 text-sm bg-[#D9EBFB] divide-y divide-[#A8CDEA]">

                        {/* Row 1 */}
                        <div className="grid grid-cols-3 items-start py-3">
                            <p>Metformin 500mg</p>
                            <p>30</p>
                            <p>Morning: 0 | Afternoon: 1 | Night: 1</p>
                        </div>

                        {/* Row 2 */}
                        <div className="grid grid-cols-3 items-start py-3">
                            <p>Metformin 500mg</p>
                            <p>10</p>
                            <p>Morning: 0 | Afternoon: 1 | Night: 1</p>
                        </div>

                    </div>

                </div>

                {/* --- RECOMMENDED TESTS --- */}
                <div className="px-6 py-2">
                    <p className="font-semibold mb-2">Recommended Tests</p>
                    <p className="text-sm text-gray-700">Blood report</p>
                    <p className="text-sm text-gray-700 mt-1">Blood report</p>
                </div>

                {/* --- SIGNATURE --- */}
                <div className="px-6 py-6 flex justify-end">
                    <div className="text-center">
                        <div className="border-b border-black w-32 mb-1"></div>
                        <p className="text-sm font-medium">Doctor's Signature</p>
                    </div>
                </div>

                {/* CLOSE BUTTON */}
                <div className="modal-action p-4">
                    <label htmlFor="prescriptionModal" className="btn">Close</label>
                </div>

            </div>
        </div>




    </>

}
