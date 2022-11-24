import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useSeller from '../../Hooks/UseSeller';
import { AuthContext } from '../../UserContext/AuthProvider';

const SellerRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const [isSeller, isSellerLoading] = useSeller(user?.email);   
    const location = useLocation();

    if (loading || isSellerLoading) {
        return <div className="flex items-center justify-center text-3xl h-screen animate-ping">
            <p>Loading...</p>
        </div>
    }

    if (user && isSeller) {
        return children
    }

    return <Navigate to='/login' state={{ from: location }} replace></Navigate>;
};

export default SellerRoute;