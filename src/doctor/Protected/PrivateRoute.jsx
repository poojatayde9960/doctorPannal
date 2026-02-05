// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import AdminLayout from "../AdminLayout";

// const PrivateRoute = () => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//         return <Navigate to="/login" replace />;
//     }

//     return (
//         <AdminLayout>
//             <Outlet />
//         </AdminLayout>
//     );
// };

// export default PrivateRoute;
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const token = localStorage.getItem("token");
    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
