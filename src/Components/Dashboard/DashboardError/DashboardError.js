import React from 'react';
import { Link} from 'react-router-dom'

const DashboardError = () => {
    return (
        <div>
            <section className="flex items-center h-full p-16">
	<div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
		<div className="max-w-md text-center">
		<div className=''>
				<img src='https://i.ibb.co/MVyZ4Ry/404.png' alt=''/>
			<h2 className="mb-8 font-semibold text-9xl dark:text-gray-600">
				<span className="sr-only">Error</span>404
			</h2>
			</div>
			<p className="text-2xl font-semibold md:text-3xl">Sorry, we couldn't find this page.</p>
			<Link to='/dashboard' className="px-8 py-3 font-semibold rounded btn btn-accent">Back to Dashboard</Link>
		</div>
	</div>
</section>
        </div>
    );
};

export default DashboardError;