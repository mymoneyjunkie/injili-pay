import { Fragment, useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FaCheck, FaTimes, FaInfoCircle, FaQuestionCircle, FaSignOutAlt, FaCreditCard, FaCaretDown, FaHistory, FaReceipt, FaCcVisa, FaCcMastercard, FaCcAmex, FaCcPaypal, FaMobileAlt, FaDownload, FaWifi, FaTablet, FaBell, FaBars, FaHeart, FaCrown } from 'react-icons/fa';
// eslint-disable-next-line
import { motion, AnimatePresence } from 'framer-motion';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Loader, LanguageSwitch, ThemeSwitcher, Navbar, Layout } from '../index';
import { connect } from "react-redux";
import useTranslation from "../../hooks/useTranslation";

// Import the background image for consistent styling
// import netflixBg from '../../assets/netflix_bg_new.jpg';

const Pricing = () => {
	const [plans, setPlans] = useState([]);
	const [activeTab, setActiveTab] = useState(null);
	const [planName, setPlanName ] = useState(null);
	const [errMsg, setErrMsg] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const { t } = useTranslation();
	
	const errRef = useRef();

	const axiosPrivate = useAxiosPrivate();

	const currentUser = useSelector((state) => state.user.currentUser);

	const navigate = useNavigate();
	const location = useLocation();

	const [ singlePlan, setSinglePlan ] = useState({
		amount: '',
		name: '',
		duration: '',
		resolution: "FULL HD", 
		quality: t('best'),
		devices: t('supportedDevices'),
		resolutionFull: "4K (Ultra HD) + HDR",
		simultaneousScreens: 4,
		downloads: 6
	});

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const getPlans = async () => {
		  	try {
			    const response = await axiosPrivate.post(
			      "/api/v1/payments/plans",
			      { email: currentUser?.email },
			      { signal: controller.signal }
			    );

			    // console.log(response);
			    
			    if (isMounted && response.data?.isSuccess) {
			      // const fetchedPlans = response.data.plans;
			      	const fetchedPlans = response.data?.plans && response.data.plans.map((plan, index) => ({
					    amount: plan?.amount,
			            name: plan?.name,
			            duration: plan?.interval_count+" "+plan?.interval,
					    // optionally vary these based on plan index
					    ...(index === 0 && { resolution: "HD", quality: t('great'), devices: t('supportedDevices'), resolutionFull: "720p", simultaneousScreens: 1, downloads: 1 }),
					    ...(index === 1 && { resolution: "FULL HD", quality: t('great'), devices: t('supportedDevices'), resolutionFull: "1080p", simultaneousScreens: 2, downloads: 2 }),
					    ...(index === 2 && { resolution: "4K + HDR", quality: t('great'), devices: t('supportedDevices'), resolutionFull: "4K + HDR", simultaneousScreens: 4, downloads: 6 }),
					}))
			      setPlans(fetchedPlans);
			      setIsLoading(false);

			      // console.log(fetchedPlans);
			      
			      if (fetchedPlans.length > 1) {
			        setSinglePlan((prevState) => {
			          return {
			            ...prevState,
			            amount: fetchedPlans[0].amount,
			            name: fetchedPlans[0].name,
			            duration: fetchedPlans[0].interval_count+" "+fetchedPlans[0].interval
			          };
			        });
			      }
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

			    	const interval = setTimeout(() => {
	                    if (isMounted) setErrMsg('');
	                }, 3000);

	                window.scrollTo({ top: 0, behavior: 'smooth' });

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
			    	console.log("Error fetching plans:", error.response.data);
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

	const handleClick = (index, name, amount, duration, resolution) => {
		setActiveTab(index);
		// console.log(price, type, description);
		setSinglePlan((prevState) => {
			return {
				...prevState,
				amount: amount,
				name: name,
				duration: duration,
				resolution: resolution
			}
		})
	}

	const handlePlanClick = (index = 0, name = 'basic') => {
		// console.log(name, index);

		setActiveTab(index);
		setPlanName(name);
		setIsLoading(true);
	};

	// console.log(plans);

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController(); 

		const checkout = async() => {
			// console.log(planName);
			try {
			    const response = await axiosPrivate.post(
			      "/api/v1/payments/subscribe",
			      { email: currentUser?.email, plan: planName },
			      { signal: controller.signal }
			    );

			    const newTab = window.open('', '_blank');

			    // console.log(response.data);
			    
			    if (isMounted && response.data?.isSuccess) {
			    	if (response.data?.message) {
					  setErrMsg(response.data.message);
					} else if (response.data?.url) {
					  newTab.location.href = response.data.url;
					}

			    	// response.data?.message ? 
			    	// setErrMsg(response.data?.message) : 
			    	// newTab.location.href = response.data.url;
			    	// // window.open(response.data?.url, '_blank');
			    	
			      	setIsLoading(false);
			      	const interval = setTimeout(() => {
	                    if (isMounted) setErrMsg('');
	                }, 3000);

	                window.scrollTo({ top: 0, behavior: 'smooth' });

	                // Clear the timeout on cleanup
	                return () => {
	                    clearTimeout(interval);
	                };
			    }
			    // if (isMounted && response.data?.isSuccess) {
				//   if (response.data?.message) {
				//     setErrMsg(response.data?.message); // Show the message in case of an error
				//   } else {
				//     window.location.href = response.data?.url; // Open the URL in the same page
				//   }
				//   setIsLoading(false);
				// }
		  	}

		  	catch (error) {
		  		console.log(error.response, error.response?.data);
			    // Check if this is a canceled request - this is normal during unmounting
			    if (error.name === 'CanceledError' || error.code === 'ERR_CANCELED') {
			      // console.log('Request was canceled', error.message);
			      return; // Don't navigate if it was just canceled
			    }

			    else if (error.response?.data) {
			    	setErrMsg(error.response?.data.message);

			    	const interval = setTimeout(() => {
	                    if (isMounted) setErrMsg('');
	                }, 3000);

	                window.scrollTo({ top: 0, behavior: 'smooth' });

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
			    	console.log("Error in processing checkout:", error.response.data);
			    	return;
			    }
		  	}
		}

		planName && checkout();

		return () => {
			isMounted = false;
			controller.abort();
		}
	}, [planName]);

	return (
		<Layout>
			<div className="bg-background-primary min-h-screen w-full text-text-primary">
				{/* Background layer */}
				<div className="relative min-h-screen">
					<div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80">
					</div>
					<div className="absolute inset-0 bg-gradient-to-b from-gradient-from via-background-muted to-gradient-to"></div>
					
					{/* Desktop-only Navigation */}
					<Navbar />

					<div className="relative z-10 container mx-auto px-4 pt-24 pb-8 sm:pt-28 sm:pb-12">
						{isLoading ? (
							<div className="relative z-10 flex justify-center items-center h-[70vh] pt-20">
								<div className="animate-spin h-12 w-12 border-4 border-emerald-500 rounded-full border-t-transparent"></div>
							</div>
						) : (
							<div className="max-w-6xl mx-auto">
								{errMsg && (
									<motion.div 
										ref={errRef} 
										className="bg-red-900/30 border border-red-500/50 text-red-200 p-4 rounded-md mb-8 text-center"
										aria-live="assertive"
										initial={{ opacity: 0, y: -20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.3 }}
									>
										{errMsg}
									</motion.div>
								)}

								{plans && plans.length > 0 && (
									<div className="mb-12 max-w-5xl mx-auto">
										<p className="text-sm text-[#d4af37] mb-2">{t('step4of4')}</p>
										<h2 className="text-3xl font-bold mb-8 text-white">{t('chooseRightPlanForYou')}</h2>
										
										{/* Plan cards in a horizontal row - desktop view */}
										<div className="hidden sm:grid grid-cols-1 md:grid-cols-4 gap-6">
											{plans.map((plan, index) => {
												const isPopular = index === 1;
												
												const isActive = activeTab === index;
												
												return (
													<div 
								          				key={plan.id || index}
														className={`relative rounded-xl overflow-hidden backdrop-blur-sm border shadow-xl transition-all hover:scale-[1.02] cursor-pointer ${isActive ? 'bg-black/80 border-[#d4af37] shadow-[#d4af37]/20' : 'bg-black/60 border-gray-800 hover:border-[#d4af37]/50'}`}
														onClick={() => handlePlanClick(index, plan?.name)}
													>
														{isPopular && (
															<div className="absolute top-0 left-0 right-0 bg-[#d4af37] text-black text-center text-sm py-2 font-semibold">
																{t('mostPopular')}
															</div>
														)}
														
														<div className={`p-4 bg-gradient-to-r from-[#d4af37]/10 via-[#d4af37]/5 to-transparent ${isPopular ? 'pt-12' : ''}`}>
															<h3 className="text-[#d4af37] font-bold text-3xl tracking-normal">{plan.name.toUpperCase()}</h3>
															<p className="text-[#d4af37]/70 text-sm mt-1 font-medium">{plan?.duration}</p>
														</div>
														
														<div className="divide-y divide-gray-700">
															<div className="p-6">
																<p className="text-sm text-[#d4af37] mb-1">{t('monthlyPrice')}</p>
																<p className="font-bold text-xl text-white">€{(plan.amount/100).toFixed(2)}</p>
															</div>

															<div className="p-6">
																<p className="text-sm text-[#d4af37] mb-1">{t('videoQuality')}</p>
																<p className="font-medium text-white">{plan?.quality}</p>
															</div>
															
															<div className="p-6">
																<p className="text-sm text-[#d4af37] mb-1">{t('resolution')}</p>
																<p className="font-medium text-white">{plan?.resolutionFull}</p>
															</div>
															
															{/*{index === 0 && (
																<div className="p-6">
																	<p className="text-sm text-gray-400 mb-1">Spatial audio (immersive sound)</p>
																	<p className="font-medium text-white">Included</p>
																</div>
															)}*/}
															
															<div className="p-6">
																<p className="text-sm text-[#d4af37] mb-1">{t('supportedDevices')}</p>
																<p className="font-medium text-white">{index === 3 ? "Mobile phone, tablet" : "TV, computer, mobile phone, tablet"}</p>
															</div>

															<div className="p-6">
																<p className="text-sm text-[#d4af37] mb-1">{t('watchDevices')}</p>
																<p className="font-medium text-white">{plan?.simultaneousScreens}</p>
															</div>
															
															{/*<div className="p-6">
																<p className="text-sm text-gray-400 mb-1">{t('downloadDevices')}</p>
																<p className="font-medium text-white">{plan?.downloads}</p>
															</div>*/}
														</div>
														
														{isActive && (
															<div className="absolute top-4 right-4 bg-emerald-500 rounded-full p-2 shadow-lg">
																<FaCheck className="text-white text-sm" />
															</div>
														)}
													</div>
												);
											})}
										</div>

										{/* Mobile-optimized plan cards - horizontal layout like Netflix */}
										<div className="sm:hidden">
											{/* Plan selection tiles - horizontal scroll */}
											<div className="bg-black/60 backdrop-blur-sm border border-gray-800 text-white rounded-lg mb-6 p-3">
												<div className="flex space-x-2 overflow-x-auto pb-2">
													{plans.map((plan, index) => {
														// const planDetails = [
														// 	{ name: "Premium", resolution: "4K + HDR", isCrown: true },
														// 	{ name: "Standard", resolution: "1080p", isCrown: false },
														// 	{ name: "Basic", resolution: "720p", popular: true, isCrown: false },
														// 	{ name: "Mobile", resolution: "480p", isCrown: false }
														// ];
														
														const isActive = activeTab === index;
														
														return (
															<div 
																key={plan.id || index}
																className={`relative flex-shrink-0 w-20 flex flex-col items-center py-3 px-2 rounded-lg cursor-pointer transition-all ${isActive ? 'bg-[#d4af37] text-black shadow-lg' : 'bg-black hover:bg-black/80 text-[#d4af37] border border-[#d4af37]/30'}`}
																onClick={() => handleClick(index, plan.name, plan.amount, plan.duration, plan.resolution)}
															>
																{/* Crown icon for Premium */}
																{plan.name.toLowerCase() === "premium" && (
																	<div className={`mb-1 ${isActive ? 'text-[#d4af37]' : 'text-[#d4af37]'}`}>
																		<FaCrown className="text-lg" />
																	</div>
																)}
																
																{/* Most Popular badge for Basic */}
																{plan.name.toLowerCase() === "starter" && (
																	<div className="absolute -top-1 left-0 right-0 bg-emerald-600 text-white text-center text-[10px] py-0.5 rounded-t-lg font-medium">
																		Popular
																	</div>
																)}
																
																<p className={`font-bold text-xs text-center leading-tight ${plan.name === "starter" ? 'mt-3' : plan.name === "premium" ? '' : 'mt-1'}`}>
																	{plan.name}
																</p>
																<p className={`text-[10px] text-center mt-1 leading-tight ${isActive ? 'text-white/90' : 'text-gray-400'}`}>
																	{plan.resolution}
																</p>
																<p className={`text-xs font-bold mt-1 ${isActive ? 'text-white' : 'text-emerald-400'}`}>
																	€{(plan.amount/100).toFixed(2)}
																</p>
																<p className={`text-[9px] ${isActive ? 'text-white/70' : 'text-gray-500'}`}>
																	{plan.duration}
																</p>
																{isActive && (
																	<div className="absolute top-1 right-1">
																		<FaCheck className="text-white text-xs" />
																	</div>
																)}
															</div>
								      					);
													})}
												</div>
											</div>
											
											{/* Selected plan details */}
											<div className="bg-black/60 backdrop-blur-sm border border-gray-800 text-white rounded-lg mb-6">
												{/*if (activeTab !== index) return null; */}
								
													
												<div className="divide-y divide-gray-700">
													<div className="py-4 px-5 flex justify-between items-center">
														<p className="text-[#d4af37]">{t('monthlyPrice')}</p>
														<p className="font-bold text-white">€{(singlePlan.amount/100).toFixed(2)}</p>
													</div>
															
													<div className="py-4 px-5 flex justify-between items-center">
														<p className="text-[#d4af37]">{t('videoQuality')}</p>
														<p className="font-medium text-white">{singlePlan.quality}</p>
													</div>
															
													<div className="py-4 px-5 flex justify-between items-center">
														<p className="text-[#d4af37]">{t('resolution')}</p>
														<p className="font-medium text-white">{singlePlan.resolutionFull}</p>
													</div>
															
													<div className="py-4 px-5 flex justify-between items-center">
														<p className="text-[#d4af37]">{t('supportedDevices')}</p>
														<p className="font-medium text-right text-white">TV, computer, mobile phone, tablet</p>
													</div>

													<div className="py-4 px-5 flex justify-between items-center">
														<p className="text-[#d4af37]">{t('watchDevices')}</p>
														<p className="font-medium text-white">{singlePlan.simultaneousScreens}</p>
													</div>
															
													<div className="py-4 px-5 flex justify-between items-center">
														<p className="text-[#d4af37]">{t('downloadDevices')}</p>
														<p className="font-medium text-white">{singlePlan.downloads}</p>
										    		</div>
									  			</div>
											</div>

											{/* Legal text */}
											<div className="text-xs text-[#d4af37] mb-8 px-2">
												<p>HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability subject to your internet service and device capabilities. Not all content is available in all resolutions. See our <span className="text-white hover:text-[#d4af37] transition-colors">{t('termsOfUse')}</span> for more details.</p>
												{/*<p className="mt-2">Only people who live with you may use your account. Watch on 4 different devices at the same time with Premium, 2 with Standard, and 1 with Basic and Mobile.</p>*/}
												{/*<p className="mt-2">Live events are included with any Netflix plan and contain ads.</p>*/}
											</div>
											
											{/* Next button */}
											{/*<div className="mb-8">
												<button
													onClick={() => handlePlanClick(plans[activeTab].name.toLowerCase())}
													className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md font-bold text-center text-xl transition duration-300 cursor-pointer shadow-lg"
												>
													{t('next')}
												</button>
											</div>*/}
										</div>

										{/* Legal text - for desktop view */}
										<div className="hidden sm:block text-xs text-[#d4af37] mt-8 mb-8">
											<p>HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability subject to your internet service and device capabilities. Not all content is available in all resolutions. See our <span className="text-white hover:text-[#d4af37] transition-colors">{t('termsOfUse')}</span> for more details.</p>
											{/*<p className="mt-2">Only people who live with you may use your account. Watch on 4 different devices at the same time with Premium, 2 with Standard, and 1 with Basic and Mobile.</p>*/}
										</div>

										{/* Next button - desktop */}
										<div className="flex md:hidden justify-center">
											<motion.button
												onClick={() => handlePlanClick(activeTab, plans[activeTab]?.name.toLowerCase())}
												className="w-full max-w-xl py-4 px-6 bg-gradient-to-r from-[#d4af37] via-[#b8960b] to-[#d4af37] bg-[length:200%] hover:bg-right text-black font-bold text-center text-xl transition-all duration-700 rounded-md relative overflow-hidden transform hover:scale-[1.02] cursor-pointer"
												whileHover={{ scale: 1.02 }}
												whileTap={{ scale: 0.98 }}
											>
												{t('next')}
											</motion.button>
										</div>
									</div>
								)}

								{/* New Mobile Features Section */}
								<motion.div 
									className="mb-12 rounded-xl overflow-hidden bg-gradient-to-r from-black/80 to-[#d4af37]/10 border border-[#d4af37]/30"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.7, delay: 0.3 }}
								>
									<div className="p-8">
										<h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-[#d4af37]">
											<FaMobileAlt className="text-[#d4af37]" />
											<span>{t('streamAnywhere')}</span>
										</h2>
										
										<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
											<motion.div 
												className="flex flex-col items-center text-center p-6 bg-black/60 rounded-lg border border-[#d4af37]/20 hover:border-[#d4af37]/40 transition-all duration-300"
												whileHover={{ y: -5, transition: { duration: 0.2 } }}
											>
												<div className="bg-[#d4af37]/10 p-4 rounded-full mb-4">
													<FaDownload className="text-3xl text-[#d4af37]" />
												</div>
												<h3 className="text-lg font-medium mb-2 text-white">{t('downloadWatchOffline')}</h3>
												<p className="text-gray-300">{t('downloadWatchOfflineDesc')}</p>
											</motion.div>
											
											<motion.div 
												className="flex flex-col items-center text-center p-6 bg-black/60 rounded-lg border border-[#d4af37]/20 hover:border-[#d4af37]/40 transition-all duration-300"
												whileHover={{ y: -5, transition: { duration: 0.2 } }}
											>
												<div className="bg-[#d4af37]/10 p-4 rounded-full mb-4">
													<FaWifi className="text-3xl text-[#d4af37]" />
												</div>
												<h3 className="text-lg font-medium mb-2 text-white">{t('dataSaverMode')}</h3>
												<p className="text-gray-300">{t('dataSaverModeDesc')}</p>
											</motion.div>
											
											<motion.div 
												className="flex flex-col items-center text-center p-6 bg-black/60 rounded-lg border border-[#d4af37]/20 hover:border-[#d4af37]/40 transition-all duration-300"
												whileHover={{ y: -5, transition: { duration: 0.2 } }}
											>
												<div className="bg-[#d4af37]/10 p-4 rounded-full mb-4">
													<FaBell className="text-3xl text-[#d4af37]" />
												</div>
												<h3 className="text-lg font-medium mb-2 text-white">{t('newReleaseNotifications')}</h3>
												<p className="text-gray-300">{t('newReleaseNotificationsDesc')}</p>
											</motion.div>
										</div>
										
										<div className="mt-8 flex flex-col md:flex-row items-center justify-between bg-[#d4af37]/10 p-6 rounded-lg border border-[#d4af37]/20">
											<div className="flex items-center mb-4 md:mb-0">
												<FaTablet className="text-3xl text-[#d4af37] mr-4" />
												<div>
													<h3 className="text-lg font-medium text-white">{t('compatibleAllDevices')}</h3>
													<p className="text-gray-300">{t('availableAllPlatforms')}</p>
												</div>
											</div>
											<p className="text-[#d4af37] hover:text-white transition duration-300 font-medium cursor-pointer">
												{t('viewAllDevices')}
											</p>
										</div>
									</div>
								</motion.div>
							</div>
						)}
					</div>
				</div>
			</div>
			<style jsx="true">{`
				@media (max-width: 499px) {
						.main_img {
							width: 140px;
							height: 50px;
						}
					}
			`}</style>
		</Layout>
	);
};

export default connect(null, null)(Pricing);
