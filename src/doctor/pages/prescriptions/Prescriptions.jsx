import { useState } from "react";
import { FaUser, FaUserMd, FaClock, FaCalendarCheck, FaCalendarAlt, FaEye } from "react-icons/fa";
import CreatePrescription from "./CreatePrescription";
import { useGetVisitsQuery } from "../../../redux/apis/patientsApi";
import { useSelector } from "react-redux";


export default function Prescriptions() {
    const [open, setOpen] = useState(false);
    const [selectedVisit, setSelectedVisit] = useState(null);

    const admin = useSelector((state) => state.auth.admin);
    const doctorId = admin?._id;

    const { data: visitsData, isLoading, isError } =
        useGetVisitsQuery(doctorId, {
            skip: !doctorId
        });

    if (!doctorId) return <p>Loading doctor...</p>;
    if (isLoading) return <p>Loading visits...</p>;
    if (isError) return <p>Error loading visits</p>;

    // ✅ Extract visits array from API response
    const visits = visitsData?.Visits || [];

    // Format date helper
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Get patient info from visit (you might need to fetch full patient data)
    const getPatientInfo = (visit) => {
        const patient = visit?.patient;

        return {
            id: patient?._id,
            name: patient?.patientName || "Patient",
            age: patient?.age ? `${patient.age} Yr.` : "N/A",
            gender: patient?.gender || "N/A"
        };
    };

    return <>
        {/* <pre className="text-black">{JSON.stringify(visitsData, null, 2)}</pre> */}
        <div className="flex justify-end mb-5">
            <button
                onClick={() => setOpen(true)}
                className="bg-[#0BA7E8] text-white py-2 px-4 rounded-md font-medium shadow hover:opacity-90 transition flex items-center gap-2">
                Create Prescription
            </button>
            <CreatePrescription open={open} setOpen={setOpen} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

            {visits.length > 0 ? visits.map((visit) => {
                const patientInfo = getPatientInfo(visit);

                return (
                    <div key={visit._id} className="bg-white border border-blue-300 p-4 rounded-xl shadow space-y-3">

                        {/* Name + Icon */}
                        <div className="flex items-start gap-3">
                            {/* Icon */}
                            <div className="w-11 h-11 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-lg">
                                <FaUser />
                            </div>

                            {/* Name + Age/Gender stacked */}
                            <div className="flex flex-col text-black">
                                <p className="font-semibold text-lg">{patientInfo.name}</p>
                                <p className="text-sm text-gray-600">{patientInfo.age} • {patientInfo.gender}</p>
                            </div>
                        </div>


                        {/* Disease */}
                        <div className="flex items-center gap-2 mt-1 text-black">
                            <FaUserMd className="text-green-500 text-lg" />
                            <p className="text-sm">{visit.disease} {visit.subDisease && `- ${visit.subDisease}`}</p>
                        </div>

                        {/* Visit Date */}
                        <div className="flex items-center gap-2 text-black">
                            <FaCalendarAlt className="text-red-500 text-lg" />
                            <p className="text-sm">
                                <span className="font-medium">Visit Date:</span> {formatDate(visit.visitDate)}
                            </p>
                        </div>

                        {/* Visit Time */}
                        <div className="flex items-center gap-2 text-black">
                            <FaClock className="text-[#CC25B0] text-lg" />
                            <p className="text-sm">
                                <span className="font-medium">Visit Time:</span> {visit.visitTime || 'N/A'}
                            </p>
                        </div>

                        <label
                            htmlFor="prescriptionModal"
                            onClick={() => setSelectedVisit(visit)}
                            className="w-full bg-[#0BA7E8] text-white py-2 rounded-md font-medium shadow hover:opacity-90 transition flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <FaEye className="text-white text-lg" />
                            View Prescription
                        </label>

                    </div>
                );
            }) : (
                <p className="col-span-3 text-center text-gray-500">No visits found</p>
            )}

        </div>



        {/* Modal */}
        <input type="checkbox" id="prescriptionModal" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box max-w-xl  rounded-xl w-full  my-auto max-h-[98vh] overflow-y-auto">

                {selectedVisit && (
                    <>
                        {/* --- HEADER BRAND --- */}
                        <div className="p-6 flex justify-between items-start ">
                            <div className="">
                                <img src="/tech_surya_logo-removebg-preview 6.png" alt="logo" className="w-36" />
                                <h1 className="text-2xl font-semibold mb-4">Prescription</h1>

                                <div className="grid grid-cols-2 max-w-xs gap-y-1 text-sm">
                                    <p className="text-gray-600">Visit ID</p>
                                    <p className="font-medium">{selectedVisit._id.slice(-7)}</p>

                                    <p className="text-gray-600">Date</p>
                                    <p className="font-medium">{formatDate(selectedVisit.visitDate)}</p>
                                </div>
                            </div>

                            <div className="text-right text-sm">
                                <p className="font-semibold text-green-600">Patient Details</p>
                                <p className="font-semibold">{getPatientInfo(selectedVisit).name}</p>
                                <p className="font-semibold mt-1">Patient ID: {selectedVisit.patient.slice(-6)}</p>
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

                                {selectedVisit.medicines && selectedVisit.medicines.length > 0 ? (
                                    selectedVisit.medicines.map((medicine, idx) => (
                                        <div key={idx} className="grid grid-cols-3 items-start py-3">
                                            <p>{medicine.name}</p>
                                            <p>{medicine.quantity}</p>
                                            <p>Morning: {medicine.morning} | Afternoon: {medicine.afternoon} | Night: {medicine.night}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-3 text-center text-gray-600">
                                        No medicines prescribed
                                    </div>
                                )}

                            </div>

                        </div>

                        {/* --- RECOMMENDED TESTS --- */}
                        <div className="px-6 py-2">
                            <p className="font-semibold mb-2">Recommended Tests</p>
                            {selectedVisit.reports && selectedVisit.reports.length > 0 ? (
                                selectedVisit.reports.map((report, idx) => (
                                    <p key={idx} className="text-sm text-gray-700 mt-1">
                                        {report.reportName} - ₹{report.price}
                                    </p>
                                ))
                            ) : (
                                <p className="text-sm text-gray-600">No tests recommended</p>
                            )}
                        </div>

                        {/* --- ADDITIONAL INFO --- */}
                        <div className="px-6 py-2">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                    <p className="text-gray-600">Disease:</p>
                                    <p className="font-medium">{selectedVisit.disease} {selectedVisit.subDisease && `- ${selectedVisit.subDisease}`}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Visit Time:</p>
                                    <p className="font-medium">{selectedVisit.visitTime}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Doctor Fees:</p>
                                    <p className="font-medium">₹{selectedVisit.doctorFees}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Total Amount:</p>
                                    <p className="font-medium">₹{selectedVisit.amount}</p>
                                </div>
                            </div>
                        </div>

                        {/* --- SIGNATURE --- */}
                        <div className="px-6 py-6 flex justify-end">
                            <div className="text-center">
                                <div className="border-b border-black w-32 mb-1"></div>
                                <p className="text-sm font-medium">Doctor's Signature</p>
                            </div>
                        </div>
                    </>
                )}

                {/* CLOSE BUTTON */}
                <div className="modal-action p-4">
                    <label htmlFor="prescriptionModal" className="btn">Close</label>
                </div>

            </div>
        </div>




    </>

}
