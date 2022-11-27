import React from 'react';
import { Link } from 'react-router-dom';
import laptop from '../../../Components/assets/laptop.gif'

const Header = () => {
    return (
        <div>
            <section className="">
	<div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-around">
		<div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
			<h1 className="text-5xl font-extrabold leading-none text-info">
			Create, make and build something wonderful
			</h1>
			<p className="mt-6 mb-8 text-lg sm:mb-12">Think Fast. Work Smart. Have Fun.Your key to running a business 
				<br className="hidden md:inline lg:hidden"/>Your key to running a business
			</p>
			{/* Think Fast. Work Smart. Have Fun.Your key to running a business */}
			<div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
				<Link to='/allProducts' className="px-8 py-2 text-lg font-semibold rounded bg-info text-white ">Shop</Link>
				{/* <Link rel="noopener noreferrer" href="#" className="px-8 py-3 text-lg font-semibold border rounded dark:border-gray-100">Malesuada</Link> */}
			</div>
		</div>
		<div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
			<img src={laptop} alt="" className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" />
		</div>
	</div>
</section>
        </div>
    );
};

export default Header;