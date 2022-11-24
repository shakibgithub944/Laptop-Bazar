import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../../Hooks/UseAdmin';
import { AuthContext } from '../../UserContext/AuthProvider';

const AdminRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin(user?.email);   
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <div className="flex items-center justify-center text-3xl h-screen animate-ping">
            <p>Loading...</p>
        </div>
    }

    if (user && isAdmin) {
        return children
    }

    return <Navigate to='/login' state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;