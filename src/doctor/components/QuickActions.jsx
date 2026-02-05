import { HiUsers } from "react-icons/hi";
import { MdOutlineInsertPageBreak } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useMyPatientsQuery } from "../../redux/apis/patientsApi";
import { useSelector } from "react-redux";

export default function QuickActions({ dashboard, isLoading }) {
    const totalPatients = dashboard?.totalPatients ?? 0;




    const navigate = useNavigate();
    return <>

        {/* <pre className="text-black">{JSON.stringify(data, null, 2)}</pre> */}
        <div className="bg-white rounded-xl p-4">
            <h2 className="text-lg font-semibold">Quick Actions</h2>
            <p className="text-gray-500 text-sm mb-4">Frequently Used Tools</p>

            <div className="space-y-4 w-full">
                {/* Card 1 */}
                <button onClick={() => navigate("/prescriptions")} className="w-full bg-[#0BA7E8] text-white py-3 px-4 rounded-xl font-medium shadow hover:opacity-90 flex items-center gap-2">
                    <MdOutlineInsertPageBreak className="text-xl" />
                    <span>Create Prescription</span>
                </button>

                {/* Card 2 */}
                <button onClick={() => navigate("/invoice")} className="w-full bg-[#A312C9] text-white py-3 px-4 rounded-xl font-medium shadow hover:opacity-90 flex items-center gap-2">
                    <MdOutlineInsertPageBreak className="text-xl" />
                    <span>Create Invoice</span>
                </button>

                {/* Card 3 */}
                <button onClick={() => navigate("/schedule")} className="w-full bg-gradient-to-r from-yellow-400 to-red-500 text-white py-3 px-4 rounded-xl font-medium shadow hover:opacity-90 flex items-center gap-2">
                    <MdOutlineInsertPageBreak className="text-xl" />
                    <span>Update Schedule</span>
                </button>

                {/* Card 4 (Patients Count) */}
                <div className="bg-slate-50 text-black rounded-xl p-4 border flex justify-around gap-3">
                    <div>
                        <HiUsers className="text-3xl text-[#0BA7E8]" />
                        <p className="text-3xl font-semibold mt-2">
                            {isLoading ? "..." : totalPatients}
                        </p>
                    </div>

                    <div>
                        <p className="font-medium">Total Patients</p>
                        <p className="text-gray-500 text-sm">This month</p>
                        <p className="text-green-600 text-xs mt-1">
                            +{totalPatients} new
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </>
}
