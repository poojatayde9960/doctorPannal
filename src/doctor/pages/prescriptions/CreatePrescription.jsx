import React, { useState } from "react";
import { useAddPrescriptionMutation, useMyPatientsQuery } from "../../../redux/apis/patientsApi";
import { useSelector } from "react-redux";

export default function CreatePrescription({ open, setOpen }) {
    const admin = useSelector((state) => state.auth?.admin);
    const doctorId = admin?._id;

    const [addPrescription, { isLoading }] = useAddPrescriptionMutation();

    // ✅ Skip the query if there's no doctor ID
    const { data } = useMyPatientsQuery(doctorId, {
        skip: !doctorId
    });

    const [patientId, setPatientId] = useState("");
    const [medicines, setMedicines] = useState([{ name: "", quantity: "", dose: "", duration: "" }]);
    const [tests, setTests] = useState("");
    const [notes, setNotes] = useState("");

    const addMedicine = () => {
        setMedicines([...medicines, { name: "", quantity: "", dose: "", duration: "" }]);
    };

    const handleMedicineChange = (index, field, value) => {
        const arr = [...medicines];
        arr[index][field] = value;
        setMedicines(arr);
    };

    const handleSubmit = async () => {
        if (!patientId) {
            alert("Please select a patient");
            return;
        }

        // ❗ empty medicine filter
        const filteredMedicines = medicines.filter(
            (m) => m.name && m.quantity
        );

        if (filteredMedicines.length === 0) {
            alert("Please add at least one medicine");
            return;
        }

        const payload = {
            PatientId: patientId,

            Medicines: filteredMedicines.map((m) => ({
                name: m.name,
                quantity: Number(m.quantity),
                morning: 1,     // default (backend expects)
                afternoon: 0,
                night: 1,
                price: 0
            })),

            Reports: tests
                ? [{ reportName: tests, price: 0 }]
                : []
        };

        console.log("FINAL PAYLOAD =>", payload);

        try {
            await addPrescription(payload).unwrap();

            alert("Prescription added successfully!");

            setPatientId("");
            setMedicines([{ name: "", quantity: "", dose: "", duration: "" }]);
            setTests("");
            setNotes("");
            setOpen(false);
        } catch (err) {
            console.error("API ERROR =>", err);
            alert("Failed to add prescription");
        }
    };



    if (!open) return null;

    return (
        <>
            {/* <pre className="text-black">{JSON.stringify(data, null, 2)}</pre> */}
            {/* --- OVERLAY --- */}
            <div
                className={`fixed inset-0 bg-black/40 z-40 transition-all duration-300 ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
                onClick={() => setOpen(false)}
            />
            {/* --- RIGHT DRAWER --- */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-white shadow-xl z-50 overflow-y-auto border-l transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-xl font-semibold">Create Prescription</h2>
                    <button onClick={() => setOpen(false)} className="text-gray-600 text-xl hover:text-black">✖</button>
                </div>

                <div className="p-6">
                    {/* Patient Select */}
                    <label className="font-medium">Select Patient</label>
                    <select
                        value={patientId}
                        onChange={(e) => setPatientId(e.target.value)}
                        className="w-full border rounded-md p-2 bg-gray-50 mt-1 mb-4 focus:outline-[#0BA7E8]"
                    >
                        <option value="">Select</option>

                        {data?.Patients?.map((patient) => (
                            <option key={patient._id} value={patient._id}>
                                {patient.patientName}
                            </option>
                        ))}
                    </select>




                    {/* Medicines Section */}
                    <h3 className="font-semibold mb-2">Medicines</h3>
                    {medicines.map((item, index) => (
                        <div key={index} className="border p-2 rounded-lg mb-3 relative">
                            {medicines.length > 1 && (
                                <button
                                    onClick={() => setMedicines(medicines.filter((_, i) => i !== index))}
                                    className="absolute top-0 right-0 text-red-500 hover:text-red-700 text-sm"
                                >
                                    ✖
                                </button>
                            )}

                            <input
                                placeholder="Medicine Name"
                                value={item.name}
                                onChange={(e) => handleMedicineChange(index, "name", e.target.value)}
                                className="w-full border rounded-md p-2 mb-2"
                            />

                            <div className="flex gap-2">
                                <input
                                    placeholder="Qty"
                                    value={item.quantity}
                                    onChange={(e) => handleMedicineChange(index, "quantity", e.target.value)}
                                    className="w-1/3 border rounded-md p-2"
                                />
                                <input
                                    placeholder="Dose"
                                    value={item.dose}
                                    onChange={(e) => handleMedicineChange(index, "dose", e.target.value)}
                                    className="w-1/3 border rounded-md p-2"
                                />
                                <input
                                    placeholder="Duration"
                                    value={item.duration}
                                    onChange={(e) => handleMedicineChange(index, "duration", e.target.value)}
                                    className="w-1/3 border rounded-md p-2"
                                />
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={addMedicine}
                        className="bg-gray-200 w-full p-2 rounded-md mb-4 hover:bg-gray-300"
                    >
                        ➕ Add More Medicine
                    </button>

                    {/* Recommended Tests */}
                    <label className="font-medium">Recommended Tests</label>
                    <input
                        placeholder="Enter test name"
                        value={tests}
                        onChange={(e) => setTests(e.target.value)}
                        className="w-full border rounded-md p-2 mt-1 mb-4"
                    />

                    {/* Notes */}
                    <label className="font-medium">Notes</label>
                    <textarea
                        placeholder="Write notes..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full border rounded-md p-2 mt-1 h-24 mb-4"
                    ></textarea>

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="bg-[#0BA7E8] text-white w-full py-2 rounded-md shadow hover:opacity-90 disabled:opacity-50"
                    >
                        {isLoading ? "Saving..." : "Save Prescription"}
                    </button>
                </div>
            </div>
        </>
    );
}
