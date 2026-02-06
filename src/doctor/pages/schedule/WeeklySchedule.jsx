import React, { useEffect, useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import AddSlot from "./AddSlot";
import { useDeleteScheduleMutation, useGetDoctorScheduleQuery } from "../../../redux/apis/patientsApi";
import { useSelector } from "react-redux";

// Slot component (unchanged - already good)
const ScheduleSlot = ({ time, title, color = "blue", onDelete }) => {
    const colors = {
        blue: "bg-blue-600 hover:bg-blue-700",
        yellow: "bg-yellow-500 hover:bg-yellow-600",
    };

    return (
        <div
            className={`w-full rounded-md p-2 text-white shadow-md transition-all h-full flex flex-col justify-between ${colors[color]}`}
        >
            <div>
                <div className="font-semibold text-base">{time}</div>
                <div className="text-xs opacity-90">{title}</div>
            </div>
            <div className="flex space-x-3 text-white/80 text-sm">
                {/* <FiEdit2 className="cursor-pointer hover:text-white" /> */}
                <FiTrash2 className="cursor-pointer hover:text-white" onClick={onDelete} />
            </div>
        </div>
    );
};

const dayMap = {
    monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 5, saturday: 6, sunday: 7,
};

const timeToMinutes = (time) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
};

const formatTime = (start, end) => `${start} - ${end}`;
const formatHour = (hour) => hour.toString().padStart(2, "0") + ":00";

export default function WeeklySchedule() {
    const [deleteSchedule] = useDeleteScheduleMutation();
    console.log("Redux auth slice 👉", useSelector(state => state.auth));

    console.log("Redux auth slice 👉", useSelector(state => state.auth));

    const admin = useSelector((state) => state.auth.admin);
    const doctorId = admin?._id;   // ← आता admin मध्ये थेट _id आहे

    console.log("Redux auth slice →", useSelector(state => state.auth));
    console.log("Current doctor ID →", doctorId);


    const { data } = useGetDoctorScheduleQuery(doctorId, { skip: !doctorId });

    const [openModal, setOpenModal] = useState(false);
    const [mergedSchedule, setMergedSchedule] = useState([]);

    useEffect(() => {
        if (!data?.Doctor?.availabilitySchedule) return;

        const slots = [];

        data.Doctor.availabilitySchedule.forEach((dayObj) => {
            const dayNum = dayMap[dayObj.day.toLowerCase()];

            dayObj.morning?.forEach((slot) => {
                const startMin = timeToMinutes(slot.start);
                slots.push({
                    day: dayNum,
                    dayName: dayObj.day,
                    type: "morning",
                    startTime: slot.start,
                    endTime: slot.end,
                    start: startMin,
                    duration: timeToMinutes(slot.end) - startMin,
                    time: formatTime(slot.start, slot.end),
                    title: "Morning Clinic",
                    color: "blue",
                });
            });

            dayObj.evening?.forEach((slot) => {
                const startMin = timeToMinutes(slot.start);
                slots.push({
                    day: dayNum,
                    dayName: dayObj.day,
                    type: "evening",
                    startTime: slot.start,
                    endTime: slot.end,
                    start: startMin,
                    duration: timeToMinutes(slot.end) - startMin,
                    time: formatTime(slot.start, slot.end),
                    title: "Evening Clinic",
                    color: "blue",
                });
            });
        });

        // Unique slots
        const unique = slots.filter(
            (slot, idx, self) =>
                idx === self.findIndex(s => s.day === slot.day && s.start === slot.start && s.duration === slot.duration)
        );

        setMergedSchedule(unique);
    }, [data]);

    const handleDeleteSlot = async (slot) => {
        if (!window.confirm(`Delete ${slot.time} on ${slot.dayName}?`)) return;
        try {
            await deleteSchedule({
                DoctorId: doctorId,
                day: slot.dayName,
                type: slot.type,
                start: slot.startTime,
                end: slot.endTime,
            }).unwrap();

            setMergedSchedule(prev => prev.filter(s =>
                !(s.day === slot.day && s.start === slot.start && s.duration === slot.duration)
            ));
            alert("Deleted successfully");
        } catch (err) {
            alert("Delete failed");
            console.error(err);
        }
    };

    const days = ["Time", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const startHour = 8;
    const endHour = 23;
    const ROW_PX = 64;
    const MIN_TO_PX = ROW_PX / 60;

    return (
        <>
            <div className="p-4 bg-white border border-gray-200 rounded-lg max-w-6xl mx-auto shadow-xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium text-gray-700">Weekly Schedule</h2>
                    <button
                        onClick={() => setOpenModal(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded text-sm flex items-center hover:bg-blue-600"
                    >
                        <span className="text-xl mr-1">+</span> Add Slot
                    </button>
                </div>

                <div className="text-sm font-medium mb-4 flex space-x-4">
                    <Legend label="Available" color="bg-purple-600" />
                    <Legend label="Break" color="bg-yellow-500" />
                    <Legend label="Day off" color="bg-gray-500" />
                </div>

                <hr className="my-2" />

                <div className="grid grid-cols-[5rem_repeat(7,1fr)] border-t border-l border-gray-200 overflow-visible">
                    {/* Day headers */}
                    {days.map((day, i) => (
                        <div
                            key={i}
                            className={`font-semibold text-gray-700 text-center py-2 text-sm border-r border-b bg-gray-50 ${day === "Time" ? "sticky left-0 bg-white z-20" : ""}`}
                        >
                            {day}
                        </div>
                    ))}

                    {/* Time rows (हे भाग परत आणला - हाच महत्वाचा आहे) */}
                    {Array.from({ length: endHour - startHour + 1 }).map((_, i) => {
                        const hour = startHour + i;
                        const rowStart = hour * 60;

                        return (
                            <React.Fragment key={hour}>
                                {/* Time label */}
                                <div
                                    className="sticky left-0 bg-white border-r border-b border-gray-200 text-right pr-2 pt-1 text-sm text-gray-500 z-10"
                                    style={{ height: ROW_PX }}
                                >
                                    {formatHour(hour)}
                                </div>

                                {/* 7 days cells */}
                                {Array.from({ length: 7 }).map((_, dayIndex) => {
                                    const day = dayIndex + 1;

                                    return (
                                        <div
                                            key={day}
                                            className="relative border-r border-b border-gray-200 overflow-visible"
                                            style={{ height: ROW_PX }}
                                        >
                                            {mergedSchedule
                                                .filter(s => s.day === day && Math.floor(s.start / 60) * 60 === rowStart)
                                                .map((slot, j) => {
                                                    const topPx = (slot.start % 60) * MIN_TO_PX;

                                                    return (
                                                        <div
                                                            key={j}
                                                            className="absolute left-1 right-1 z-10 pointer-events-auto"
                                                            style={{
                                                                top: `${topPx}px`,
                                                                height: `${slot.duration * MIN_TO_PX}px`,
                                                                minHeight: "40px",
                                                            }}
                                                        >
                                                            <ScheduleSlot {...slot} onDelete={() => handleDeleteSlot(slot)} />
                                                        </div>
                                                    );
                                                })}
                                        </div>
                                    );
                                })}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>

            <AddSlot
                open={openModal}
                onClose={() => setOpenModal(false)}
                onSave={(payload) => {
                    console.log("Saved:", payload);
                    // जर AddSlot मधून fresh data येत असेल तर mergedSchedule अपडेट करा
                }}
            />
        </>
    );
}

const Legend = ({ label, color }) => (
    <div className="flex items-center space-x-1">
        <span className={`w-3 h-3 ${color} rounded-full`} />
        <span>{label}</span>
    </div>
);