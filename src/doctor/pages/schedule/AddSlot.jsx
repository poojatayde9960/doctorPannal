import React, { useState, useEffect } from "react";
import { useAddDoctorScheduleMutation, useGetDoctorScheduleQuery } from "../../../redux/apis/patientsApi";
import { useSelector } from "react-redux";

export default function AddSlot({ open, onClose, onSave }) {
    const [addDoctorSchedule] = useAddDoctorScheduleMutation();
    console.log("Redux auth slice 👉", useSelector(state => state.auth));

    console.log("Redux auth slice 👉", useSelector(state => state.auth));

    const admin = useSelector((state) => state.auth.admin);
    const doctorId = admin?._id;   // ← आता admin मध्ये थेट _id आहे

    console.log("Redux auth slice →", useSelector(state => state.auth));
    console.log("Current doctor ID →", doctorId);

    const { data: scheduleData } = useGetDoctorScheduleQuery(doctorId, {
        skip: !doctorId || !open // Only fetch when modal is open
    });
    const initialSchedule = {
        monday: { morning: [], evening: [] },
        tuesday: { morning: [], evening: [] },
        wednesday: { morning: [], evening: [] },
        thursday: { morning: [], evening: [] },
        friday: { morning: [], evening: [] },
        saturday: { morning: [], evening: [] },
        sunday: { morning: [], evening: [] },
    };

    const [schedule, setSchedule] = useState(initialSchedule);

    const [day, setDay] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [type, setType] = useState(""); // morning / evening


    const handleSave = async () => {
        if (!day || !startTime || !endTime || !type) {
            alert("All fields are required");
            return;
        }

        if (!doctorId) {
            alert("Doctor ID सापडलं नाही – पुन्हा login करून बघा");
            return;
        }

        // फक्त नवीन slot चा payload तयार कर
        const newSlot = {
            start: startTime,
            end: endTime
        };

        const payload = {
            DoctorId: doctorId,
            Data: [
                {
                    day: day.toLowerCase(),   // monday, tuesday...
                    morning: type === "morning" ? [newSlot] : [],
                    evening: type === "evening" ? [newSlot] : []
                }
            ]
        };

        console.log("Sending to backend:", JSON.stringify(payload, null, 2));

        try {
            const result = await addDoctorSchedule(payload).unwrap();
            console.log("Backend response:", result);

            alert("Slot successfully added!");

            // Parent component ला refresh सांग (onSave callback)
            if (onSave) onSave();

            // Form reset
            setDay("");
            setStartTime("");
            setEndTime("");
            setType("");
            onClose();
        } catch (err) {
            console.error("Add slot error:", err);
            alert(err?.data?.message || "Slot add करताना एरर आली");
        }
    };




    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/40 transition-opacity z-40 ${open ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                onClick={onClose}
            />

            {/* Right Side Modal */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 
        transition-transform duration-300 
        ${open ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="p-5 border-b flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Add Slot</h2>
                    <button onClick={onClose} className="text-2xl leading-none">×</button>
                </div>

                <div className="p-5 space-y-4">

                    <div>
                        <label className="block text-sm font-medium mb-1">Day</label>
                        <select
                            className="w-full border rounded-lg p-2"
                            value={day}
                            onChange={(e) => setDay(e.target.value)}
                        >
                            <option value="" disabled>-- Select Day --</option>
                            <option value="monday">Monday</option>
                            <option value="tuesday">Tuesday</option>
                            <option value="wednesday">Wednesday</option>
                            <option value="thursday">Thursday</option>
                            <option value="friday">Friday</option>
                            <option value="saturday">Saturday</option>
                            <option value="sunday">Sunday</option>
                        </select>

                    </div>


                    {/* Start + End Time */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium mb-1">Start Time</label>
                            <input
                                type="time"
                                className="w-full border rounded-lg p-2"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">End Time</label>
                            <input
                                type="time"
                                className="w-full border rounded-lg p-2"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                            />                        </div>
                    </div>

                    {/* Type Input */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Type</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full border rounded-lg p-2"
                        >
                            <option value="">-- Select Type --</option>
                            <option value="morning">Morning</option>
                            <option value="evening">Evening</option>
                        </select>


                    </div>

                    {/* Save Btn */}
                    <button
                        onClick={handleSave}
                        className="w-full bg-blue-500 text-white py-2 rounded-lg shadow"
                    >
                        Save Slot
                    </button>

                </div>
            </div>
        </>
    );
}
