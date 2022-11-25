import React, { useContext } from 'react';
import Navber from '../../Pages/Navber/Navber';
import { AuthContext } from '../../UserContext/AuthProvider';
import { Link, Outlet } from 'react-router-dom';
import useAdmin from '../../Hooks/UseAdmin';
import useSeller from '../../Hooks/UseSeller';


const DashboardLayout = () => {
    const { user } = useContext(AuthContext)
    const [isAdmin] = useAdmin(user?.email)
    const [isSeller] = useSeller(user?.email)


    return (
        <div>
            <Navber></Navber>
            <div className='md:mx-32'>
                <div className='grid md:grid-cols-3 lg:grid-cols-5 gap-3 bg-accent p-4 rounded-lg text-white font-bold'>
                    <li><Link to='/dashboard'>My Order</Link></li>
                    {
                        isSeller && <>
                            <li><Link to='/dashboard/addproduct'>Add Products</Link></li>
                            <li><Link to='/dashboard/myproducts'>My Products</Link></li>
                        </>
                    }

                    {
                        isAdmin && <>
                            <li><Link to='/dashboard/alluser'>All Users</Link></li>
                            <li><Link to='/dashboard/allseller'>All Sellers</Link></li>
                            <li><Link to='/dashboard/allbuyers'>All Buyers</Link></li>
                            <li><Link to='/dashboard/reported'>Repoted Items</Link></li>
                            {/* <li><Link to='/dashboard/managedoctor'>Manage Doctor</Link></li> */}
                        </>
                    }
                </div>
                <Outlet></Outlet>
            </div>



        </div>
    );
};

export default DashboardLayout;