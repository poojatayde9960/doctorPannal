import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const doctorProtected = ({ compo }) => {
    const { admin } = useSelector(state => state.auth);

    if (!admin) {
        // Redirect to login if admin is not logged in.
        // using replace to prevent back navigation loop
        return <Navigate to="/login" replace />;
    }

    return <>{compo}</>;
};

export default doctorProtected;
