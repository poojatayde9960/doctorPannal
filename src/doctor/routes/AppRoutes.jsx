import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLayout from '../AdminLayout'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import PrivateRoute from '../Protected/PrivateRoute'
import Appointments from '../pages/Appointments'
import MyPatient from '../pages/patients/MyPatients'
import PatientDetails from '../pages/patients/PatientDetails'
import Prescriptions from '../pages/prescriptions/Prescriptions'
import AllDoctors from '../pages/doctors/AllDoctors'
import DoctorDetails from '../pages/doctors/DoctorDetails'
import WeeklySchedule from '../pages/schedule/WeeklySchedule'

const AppRoutes = () => {

    return (

        <Routes>
            {/* Public */}
            <Route path="/login" element={<Login />} />

            {/* Protected */}
            <Route element={<PrivateRoute />}>
                <Route element={<AdminLayout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="appointments" element={<Appointments />} />
                    <Route path="myPatient" element={<MyPatient />} />
                    <Route path="patientDetails/:patientId" element={<PatientDetails />} />

                    <Route path="prescriptions" element={<Prescriptions />} />
                    <Route path="alldoctors" element={<AllDoctors />} />
                    <Route path="doctordetails/:id" element={<DoctorDetails />} />

                    <Route path="schedule" element={<WeeklySchedule />} />
                </Route>
            </Route>
        </Routes>


    )
}

export default AppRoutes