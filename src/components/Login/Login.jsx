import { Fragment, useRef, useState, useEffect } from 'react';

import { Link, useNavigate } from "react-router-dom";

import { FaEnvelope, FaLock, FaArrowRight, FaEyeSlash, FaEye } from "react-icons/fa6";

import { Outer, Loader, LanguageSwitch, ThemeSwitcher } from "../index";

import axiosInstance from '../../api/axios';

import { connect } from "react-redux";

import { setCurrentUser } from "../../redux/user/user.actions";

import useTranslation from "../../hooks/useTranslation";

import { getDeviceId } from "../../DeviceId/deviceId";

// Import the background image
// import netflixBg from '../../assets/netflix_bg_new.jpg';

const Login = ({setCurrentUser}) => {
	const userRef = useRef();
	const errRef = useRef();

	const navigate = useNavigate();

	const { t } = useTranslation();

	// console.log(getDeviceId());

	const [ userInput, setUserInput ] = useState({
		email: '',
		password: ''
	})

	const [ inputError, setInputError ] = useState({
		email: '',
		password: ''
	})

	const [ showPassword, setShowPassword ] = useState(false);
	const [ errMsg, setErrMsg ] = useState('');
	const [ isLoading, setIsLoading ] = useState(false);
	const [ rememberMe, setRememberMe ] = useState(false);

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		setErrMsg('');
		setInputError({
			email: '',
			password: ''
		})
	}, [ userInput.email, userInput.password ])

	const handleEmailChange = (e) => {
		setUserInput((prevState) => {
			return {...prevState,
			email: e.target.value}
		})
	}

	const handlePasswordChange = (e) => {
		setUserInput((prevState) => {
			return {...prevState,
			password: e.target.value}
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

    	if (!userInput.email || !userInput.password) {
    		setInputError((prevState) => {
	    		return {
	    			...prevState,
	    			email: userInput.email === '' ? true : false,
	    			password: userInput.password === '' ? true : false
	    		}
	    	});
    		return;
    	}

	    	try {
	    		setIsLoading(true);

				const response = await axiosInstance.post('/api/v1/auth/sign-in',
	    			{
					    email: userInput.email,
					    password: userInput.password,
					    device_id: getDeviceId(),
					    country: "CA"
					},
					{
					    headers: {
							'Content-Type': 'application/json',
					    },
					    withCredentials: true,
					}
	    		);

	    		// console.log(response);

	    		if (response.data && response.data.isSuccess) {
	    			setUserInput({
	    				email: '',
	    				password: ''
	    			})

	    			setCurrentUser({
					  email: userInput.email,
					  token: response.data.token
					});

	    			// After login, navigate to the home page (Netflix-style)
	    			navigate('/home', { replace: true });
	    		}

	    		else {
	    			setErrMsg(response.data?.message);
	    			window.scrollTo({ top: 0, behavior: 'smooth' });
	    		}
	    	}

	    	catch (error) {
	    		window.scrollTo({ top: 0, behavior: 'smooth' });

	    		// console.log(error);
	    		if (!error?.response) {
	    			setErrMsg("Failed to Login In. Try Again...");
	    		}
	    		else if (error.response?.status === 400 && !error.response.data?.isSuccess) {
	    			setErrMsg(error.response?.data.message);
	    		}

	    		else if (error.response?.status === 401 || error.response?.status === 404) {
	    			setErrMsg(error.response?.data.message);
	    		}

	    		else {
	    			setErrMsg("Login Failed...");
	    		}
	    	}

	    	finally {
				setIsLoading(false);
		    }
	}

	const togglePasswordVisibility = () => {
		setShowPassword((prevState) => !prevState);
	}

	return (
		<Fragment>
			<div className="bg-black min-h-screen w-full text-white flex flex-col">
				{/* Background layer */}
				<div className="relative flex-1">
					<div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/90 to-black/95"></div>
					
					{/* Navigation with centered logo */}
					<nav className="w-full fixed top-0 left-0 z-50 bg-black py-4 px-4 sm:px-6 md:px-16 border-b border-gray-800/50">
						<div className="flex justify-between items-center">
							<Link to="/" className="text-purple-500 font-bold text-2xl sm:text-3xl md:text-5xl">
								<img src="/im.png" alt="Ijinili" border="0" className="main_img" />
							</Link>
							<div className="flex gap-2 sm:gap-4 items-center">
								{/* Theme Switcher */}
								{/*<ThemeSwitcher />*/}
								
								{/* Desktop Language Switch - shows full names */}
								<div className="hidden md:block">
									<LanguageSwitch showFullNames={true} />
								</div>
								{/* Mobile Language Switch - shows abbreviations */}
								<div className="md:hidden">
									<LanguageSwitch showFullNames={false} />
								</div>
							</div>
						</div>
					</nav>
					
					{/* Login Form Container */}
					<div className="relative z-10 max-w-md mx-auto mt-20 sm:mt-24 md:mt-32 mb-8 p-6 sm:p-8 md:p-10 bg-black/80 rounded-lg border border-gray-800/50 backdrop-blur-sm">
						{isLoading ? (
							<div className="flex justify-center items-center h-64">
								<div className="animate-spin h-12 w-12 border-4 border-purple-500 rounded-full border-t-transparent"></div>
							</div>
						) : (
							<>
								{errMsg && (
									<div 
								ref={errRef} 
										className="bg-red-900/20 border border-red-800/50 text-red-200 p-3 rounded-md mb-6 text-center text-sm"
								aria-live="assertive"
								>
									{errMsg}
									</div>
								)}
								
								<h1 className="text-2xl sm:text-3xl font-bold mb-2 text-[#d4af37] capitalize">{t('login')}</h1>
								<p className="text-gray-400 text-sm sm:text-base mb-6">{t('welcomebacktoYenuMax')}</p>

								<form onSubmit={handleSubmit} className="space-y-5">
									<div className="space-y-1">
										<div className={`relative ${inputError.email === true ? 'border-red-500' : 'border-gray-600'} bg-purple-900/20 border rounded-md focus-within:border-purple-500 transition duration-300`}>
											<div className="flex items-center">
												<span className="pl-3 pr-3 text-gray-300">
								      <FaEnvelope />
								    </span>
								    <input
								      type="email"
								      ref={userRef}
													className="w-full bg-transparent py-3 px-3 focus:outline-none text-white placeholder-gray-300 text-sm sm:text-base"
								      value={userInput.email}
								      onChange={handleEmailChange}
													placeholder={t('email')}
													required
								    />
								  </div>
										</div>
										{inputError.email === true && <p className="text-red-500 text-xs">{t('pleaseenteravalidemailaddress')}</p>}
								</div>

									<div className="space-y-1">
										<div className={`relative ${inputError.password === true ? 'border-red-500' : 'border-gray-600'} bg-purple-900/20 border rounded-md focus-within:border-purple-500 transition duration-300`}>
											<div className="flex items-center">
												<span className="pl-3 pr-3 text-gray-300">
								      <FaLock />
								    </span>
								    <input
													type={showPassword ? "text" : "password"}
													className="w-full bg-transparent py-3 px-3 focus:outline-none text-white placeholder-gray-300 text-sm sm:text-base"
								      value={userInput.password}
								      onChange={handlePasswordChange}
													placeholder={t('password')}
													required
								    />
												<button
													type="button"
							          onClick={togglePasswordVisibility}
													className="cursor-pointer text-gray-300 pr-3 hover:text-purple-500 transition duration-300"
							        >
													{showPassword ? <FaEyeSlash /> : <FaEye />}
												</button>
											</div>
										</div>
										{inputError.password === true && <p className="text-red-500 text-xs">{t('pleaseenteryourpassword')}</p>}
									</div>
									
									<div className="flex items-center justify-between text-sm text-gray-400">
										<div className="flex items-center">
											<input
												type="checkbox"
												id="remember-me"
												className="mr-2 h-4 w-4 accent-purple-500 cursor-pointer"
												checked={rememberMe}
												onChange={() => setRememberMe(!rememberMe)}
											/>
											<label htmlFor="remember-me" className="cursor-pointer select-none">{t('rememberme')}</label>
								  </div>
										<a href="#" className="text-gray-400 hover:text-purple-500 transition duration-300">{t('doyouneedhelp')}</a>
								</div>

									<button
										type="submit"
										className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#a923c5] via-[#10cddb] to-[#a923c5] bg-[length:200%] hover:bg-right transition-all duration-700 text-white font-bold py-2 px-4 rounded-md relative overflow-hidden transform hover:scale-[1.02] cursor-pointer"
										disabled={isLoading}
									>
										{isLoading ? <Loader /> : (
											<>
												{t('login')}
										<FaArrowRight />
											</>
										)}
									</button>
								</form>

								<div className="mt-8 pt-6 border-t border-gray-800/50">
									<p className="text-gray-300 text-center text-sm sm:text-base">
										{t('newtoYenumax')} 
										<Link to="/register" className="capitalize ps-2 text-purple-500 hover:text-purple-400 transition duration-300">
											{t('registernow')}
										</Link>
									</p>
									
									<p className="text-gray-500 text-xs sm:text-sm mt-4 hidden">
										Esta página está protegida por Google reCAPTCHA para garantizar que no eres un robot.
									</p>
						</div>
					</>
				)}
					</div>
					</div>
					
					{/* Footer */}
				<footer className="relative z-10 w-full py-12 bg-black">
					<div className="max-w-6xl mx-auto px-4">
						<div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-8">
							<div>
								<Link to="/faq" className="block text-gray-400 hover:text-white mb-4">{t('faq')}</Link>
								<Link to="/investor-relations" className="block text-gray-400 hover:text-white mb-4">{t('investorRelations')}</Link>
								<Link to="/privacy" className="block text-gray-400 hover:text-white mb-4">{t('privacy')}</Link>
								<Link to="/speed-test" className="block text-gray-400 hover:text-white mb-4">{t('speedTest')}</Link>
							</div>
							<div>
								<Link to="/help" className="block text-gray-400 hover:text-white mb-4">{t('helpCenter')}</Link>
								<Link to="/jobs" className="block text-gray-400 hover:text-white mb-4">{t('jobs')}</Link>
								<Link to="/cookie-preferences" className="block text-gray-400 hover:text-white mb-4">{t('cookiePreferences')}</Link>
								<Link to="/legal-notices" className="block text-gray-400 hover:text-white mb-4">{t('legalNotices')}</Link>
							</div>
							<div>
								<Link to="/account" className="block text-gray-400 hover:text-white mb-4">{t('account')}</Link>
								<Link to="/ways-to-watch" className="block text-gray-400 hover:text-white mb-4">{t('waysToWatch')}</Link>
								<Link to="/corporate-information" className="block text-gray-400 hover:text-white mb-4">{t('corporateInformation')}</Link>
								<Link to="/only-on-ijinili" className="block text-gray-400 hover:text-white mb-4">{t('onlyOnIJINILI')}</Link>
							</div>
							<div>
								<Link to="/media-center" className="block text-gray-400 hover:text-white mb-4">{t('mediaCenter')}</Link>
								<Link to="/terms" className="block text-gray-400 hover:text-white mb-4">{t('termsOfUse')}</Link>
								<Link to="/contact-us" className="block text-gray-400 hover:text-white mb-4">{t('contactUs')}</Link>
							</div>
						</div>

						<div className="mt-8">
							<p className="text-gray-400 mb-2">{t('questions')} <a href="tel:1-800-123-4567" className="text-gray-400 hover:text-white">1-800-123-4567</a></p>
							<p className="text-gray-400">{t('ijiniliIntermediaCanada')}</p>
						</div>
				</div>
				</footer>
			</div>
			<style jsx="true">{`
				@media (max-width: 499px) {
						.main_img {
							width: 140px;
							height: 50px;
						}
					}
			`}</style>
		</Fragment>
	);
};

const mapDispatchToProps = dispatch => ({
	setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(Login);
