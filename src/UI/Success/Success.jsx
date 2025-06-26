import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FaCheck, FaPlay, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import { useSelector, connect } from 'react-redux';
import { logoutUser } from "../../redux/user/user.actions";
import { persistor } from '../../redux/store';
import { Loader, Navbar, Layout } from '../../components';

const Success = ({ logoutUser }) => {
	const [countdown, setCountdown] = useState(5);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	
	const navigate = useNavigate();
	const location = useLocation();
	const currentUser = useSelector((state) => state.user.currentUser);
	
	// Handle logout
	const handleLogout = () => {
		logoutUser();
		persistor.purge();
		navigate('/');
	};
	
	// Handle navigation
	const handleNavigation = (path) => {
		navigate(path);
	};

	useEffect(() => {
		let isMounted = true;

		setIsLoading(false);

		const interval = setInterval(() => {
			setCountdown((prev) => {
				if (prev <= 1) {
					clearInterval(interval);
					if (isMounted) {
						// Use startTransition to avoid rendering issues
						// React 18+ feature
						window.requestIdleCallback(() => {
							navigate("/billing", { replace: true });
						});
					}
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => {
			isMounted = false;
			clearInterval(interval);
		};
	}, [navigate]);

	return (
		<Layout>
		<div className="bg-black min-h-screen w-full text-white">
			{/* Background layer */}
			<div className="relative min-h-screen">
				<div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/90 to-black/95"></div>
				
				{/* Navigation */}
				<Navbar />

                    {/*<div className="relative z-10 container mx-auto px-4 py-8 sm:py-12">*/}
                    <div className="relative z-10 container mx-auto px-4 py-8 sm:py-12 mt-15 sm:mt-10 md:mt-20 mb-20 p-6 sm:p-8 md:p-10">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin h-12 w-12 border-4 border-emerald-500 rounded-full border-t-transparent"></div>
                            </div>
                        ) : (
							<div className="flex flex-col items-center text-center">
								{/* Success Icon */}
								<div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-8">
									<FaCheck className="text-emerald-600 text-4xl" />
								</div>

								{/* Success Message */}
								<h1 className="text-4xl font-bold mb-4">Transaction Successful!</h1>
								<p className="text-xl text-gray-600 mb-8">
									Your subscription is now active! Enjoy unlimited access to all features and content.
								</p>

								{/* Start Watching Button */}
								<button 
									onClick={() => navigate('/billing')}
									className="cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-8 rounded-lg text-xl flex items-center"
								>
									<FaPlay className="mr-2" /> View Subscription
								</button>
								
								<p className="text-gray-500 mt-4">Auto-redirecting in {countdown} seconds...</p>
							</div>
						)}
                    </div>

                <Footer />
			</div>
		</div>
		</Layout>
	);
};

const mapDispatchToProps = {
	logoutUser
};

export default connect(null, mapDispatchToProps)(Success);