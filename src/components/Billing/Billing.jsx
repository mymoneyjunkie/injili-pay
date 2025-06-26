import { Fragment, useEffect, useState, useRef } from 'react';
import { useSelector, connect } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import { FaCheck, FaTimes, FaCreditCard, FaReceipt, FaExchangeAlt, FaCalendarAlt } from 'react-icons/fa';
import useTranslation from "../../hooks/useTranslation";
import { Navbar, LanguageSwitch, Footer } from '../index';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const Billing = () => {
	const [ errMsg, setErrMsg ] = useState('');
	const errRef = useRef();

	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/pricing';

	const axiosPrivate = useAxiosPrivate();

	const currentUser = useSelector((state) => state.user.currentUser);

	const [ isLoading, setIsLoading ] = useState(true);

	const [cancelSuccessMsg, setCancelSuccessMsg] = useState('');

	const [ planStatus, setPlanStatus ] = useState(null);

	const [ subID, setSubID ] = useState(null);

	const [activeTab, setActiveTab] = useState('subscription');

	const [subscription, setSubscription] = useState(null);

	const { t } = useTranslation();

	const handleClick = (id, status) => {
		// currentUser.email ? navigate(from, { replace: true }) : navigate("/login");
		// console.log(id, status);

		id ? setSubID(id) : setSubID(null);

		status === "active" ? setPlanStatus(true) : setPlanStatus(false);

		setIsLoading(true);
	}

	// console.log(currentUser?.email);

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const getPlans = async () => {
		  	try {
			    const response = await axiosPrivate.post(
			      "/api/v1/payments/subscriptions",
			      { email: currentUser?.email },
			      { signal: controller.signal }
			    );

			    // console.log(response.data);
			    
			    if (isMounted && response.data?.isSuccess) {
			      setIsLoading(false);
			      setSubscription(response.data?.plans[0].status === "fulfilled" ? response.data?.plans[0].value : null);
			    }
		  	}

		  	catch (error) {
		  		// console.log(error.response?.data);
			    // Check if this is a canceled request - this is normal during unmounting
			    if (error.name === 'CanceledError' || error.code === 'ERR_CANCELED') {
			      // console.log('Request was canceled', error.message);
			      return; // Don't navigate if it was just canceled
			    }

			    else if (error.response?.data) {
			    	setErrMsg(error.response?.data.message);

			    	setIsLoading(false);

			    	window.scrollTo({ top: 0, behavior: 'smooth' });

			    	const interval = setTimeout(() => {
	                    if (isMounted) setErrMsg('');
	                }, 1000);

	                // Clear the timeout on cleanup
	                return () => {
	                    clearTimeout(interval);
	                };
			    }
			    
			    // Only navigate to login for actual auth errors
			    else if (error.response?.data.statusCode === 401) {
			      navigate("/login", { state: { from: location }, replace: true });
			    }

			    else {
			    	// console.error("Error fetching plans:", error);
			    	return;
			    }
		  	}
		};

		getPlans();

		return () => {
			isMounted = false;
			controller.abort();
		}
	}, []);

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const cancelPlan = async () => {
		  	try {
			    const response = await axiosPrivate.post(
			      "/api/v1/payments/subscription-cancel",
			      { email: currentUser?.email, subscription_id: subID },
			      { signal: controller.signal }
			    );

			    // console.log(response.data);
			    
			    if (isMounted && response.data?.isSuccess) {
			      setIsLoading(false);
			      setSubscription(null);
			      setCancelSuccessMsg('Your subscription has been cancelled');
			    }
		  	}

		  	catch (error) {
			    // Check if this is a canceled request - this is normal during unmounting
			    if (error.name === 'CanceledError' || error.code === 'ERR_CANCELED') {
			      // console.log('Request was canceled', error.message);
			      return; // Don't navigate if it was just canceled
			    }

			    else if (error.response?.data) {
			    	setErrMsg(error.response?.data.message);

			    	window.scrollTo({ top: 0, behavior: 'smooth' });

			    	const interval = setTimeout(() => {
	                    if (isMounted) setErrMsg('');
	                }, 3000);

	                // Clear the timeout on cleanup
	                return () => {
	                    clearTimeout(interval);
	                };
			    }
			    
			    // Only navigate to login for actual auth errors
			    else if (error.response?.data.statusCode === 401) {
			      navigate("/login", { state: { from: location }, replace: true });
			    }

			    else {
			    	// console.error("Error fetching plans:", error);
			    	return;
			    }
		  	}
		};

		planStatus && subID && cancelPlan();

		return () => {
			isMounted = false;
			controller.abort();
		}
	}, [planStatus, subID]);

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const interval = setTimeout(() => {
			if (isMounted) setCancelSuccessMsg('');
		}, 3000);

		return () => {
			clearTimeout(interval);
			isMounted = false;
			controller.abort();
		}
	}, [cancelSuccessMsg]);
	
	return (
		<Fragment>
			<div className="bg-black min-h-screen w-full text-white">
				{/* Background layer */}
				<div className="relative min-h-screen">
					<div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/90 to-black/95"></div>
					
					{/* Fixed Navbar */}
					<Navbar />
					
					{/* Main Content */}
					<div className="relative z-10 container mx-auto px-4 pt-36 pb-16 min-h-screen">
						{isLoading ? (
							<div className="flex justify-center items-center h-64">
								<div className="animate-spin h-12 w-12 border-4 border-[#10cddb] rounded-full border-t-transparent"></div>
							</div>
						) : (
							<div className="max-w-4xl mx-auto mb-16">
								<h1 className="text-3xl font-bold mb-12 text-white">{t('billing')}</h1>

								{cancelSuccessMsg && (
									<div className="mb-6 text-center text-[#10cddb] bg-[#10cddb]/10 border border-[#10cddb]/20 p-4 rounded-lg">
										{cancelSuccessMsg}
									</div>
								)}
								
								{/* Tabs */}
								<div className="mb-8">
									<div className="flex space-x-8">
										<button 
											className={`pb-4 px-2 cursor-pointer text-lg ${activeTab === 'subscription' ? 'text-[#10cddb] border-b-2 border-[#10cddb]' : 'text-gray-400'}`}
											onClick={() => setActiveTab('subscription')}
										>
											{t('subscription')}
										</button>
										<button 
											className={`pb-4 px-2 cursor-pointer text-lg ${activeTab === 'payment' ? 'text-[#10cddb] border-b-2 border-[#10cddb]' : 'text-gray-400'}`}
											onClick={() => setActiveTab('payment')}
										>
											{t('Payment History')}
										</button>
									</div>
								</div>
								
								{/* Subscription Tab */}
								{activeTab === 'subscription' && (
									<div>
										{subscription !== null ? (
											<div>
												<div className="bg-gradient-to-br from-[#2a1659] to-[#1a0d3b] rounded-2xl p-8 mb-6 shadow-xl">
													<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
														<div>
															<h2 className="text-2xl font-semibold mb-4 text-white flex items-center gap-2">
																<span>Current Plan: {subscription?.product_name.toUpperCase()}</span>
																<span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
																	subscription?.subscription_status === 'active' 
																	? 'bg-[#10cddb]/20 text-[#10cddb]' 
																	: 'bg-red-500/20 text-red-400'
																}`}>
																	{subscription?.subscription_status === 'active' ? <FaCheck className="mr-1" /> : <FaTimes className="mr-1" />}
																	{subscription?.product_name}
																</span>
															</h2>
															
															<div className="grid grid-cols-2 gap-8 mt-6">
																<div>
																	<p className="text-gray-400 mb-1">Billing Period Starts</p>
																	<p className="text-white text-lg">{new Date(subscription?.current_period_start * 1000).toLocaleDateString()}</p>
																</div>
																<div>
																	<p className="text-gray-400 mb-1">Plan Duration</p>
																	<p className="text-white text-lg">1 MONTH</p>
																</div>
															</div>
														</div>
														<div className="mt-6 md:mt-0">
															<p className="text-[#10cddb] text-3xl font-bold">
																${subscription?.amount / 100}
																<span className="text-gray-400 text-lg">/month</span>
															</p>
														</div>
													</div>
													
													{subscription?.subscription_status === 'active' && !subscription?.cancel_at_period_end && (
														<button 
															onClick={() => handleClick(subscription?.subscription_id, subscription?.subscription_status)}
															className="w-full mt-6 bg-[#1f1544] hover:bg-[#251a52] text-white py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 border border-gray-700/50"
														>
															<FaTimes className="text-[#10cddb]" />
															<span>Cancel Subscription</span>
														</button>
													)}
												</div>
											</div>
										) : (
											<div className="text-center py-8">
												<p className="text-gray-400 mb-4">{t('No active subscription')}</p>
												<button
													onClick={() => navigate('/pricing')}
													className="bg-gradient-to-r from-[#a923c5] via-[#10cddb] to-[#a923c5] bg-[length:200%] hover:bg-right text-white px-8 py-3 rounded-lg transition-all duration-700"
												>
													{t('Choose a Plan')}
												</button>
											</div>
										)}
									</div>
								)}
								
								{/* Payment History Tab */}
								{activeTab === 'payment' && (
									<div className="bg-gradient-to-br from-[#2a1659] to-[#1a0d3b] rounded-2xl p-8">
										<p className="text-gray-400 text-center">{t('No payment history available')}</p>
									</div>
								)}
							</div>
						)}
					</div>
					
					{/* Footer */}
					<Footer />
				</div>
			</div>
		</Fragment>
	);
};

export default connect(null, null)(Billing);