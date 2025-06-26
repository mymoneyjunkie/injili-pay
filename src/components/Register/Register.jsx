import { Fragment, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaGlobe, FaUser, FaEnvelope, FaLock, FaEyeSlash, FaEye, FaArrowRight } from "react-icons/fa6";
import { Loader, LanguageSwitch, ThemeSwitcher } from "../index";
import axiosInstance from '../../api/axios';
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/user/user.actions";
import useTranslation from "../../hooks/useTranslation";
import { getDeviceId } from "../../DeviceId/deviceId";
// Import the background image

const Register = ({setCurrentUser}) => {
	const userRef = useRef();
	const errRef = useRef();

	const BASE_IMG_URL = import.meta.env.VITE_IMG_URL;
	const { t } = useTranslation();

	const navigate = useNavigate();

	const [ userInput, setUserInput ] = useState({
		email: '',
		password: '',
		confirmPassword: '',
		countryCode: 'CA'
	})

	const [ showPassword, setShowPassword ] = useState({
		password: false,
		confirmPassword: false
	});

	const [ inputError, setInputError ] = useState({
		email: '',
		password: '',
		confirmPassword: '',
		countryCode: ''
	})

	const [ errMsg, setErrMsg ] = useState('');
	const [ isLoading, setIsLoading ] = useState(false);

	const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	const PASSWORD_REGEX = /^[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{6,}$/;

	const handleEmailChange = (e) => {
		setUserInput((prevState) => {
			return {
				...prevState,
				email: e.target.value
			}
		})
	}

	const handlePasswordChange = (e) => {
		setUserInput((prevState) => {
			return {
				...prevState,
				password: e.target.value
			}
		})
	}

	const handleConfirmPasswordChange = (e) => {
		setUserInput((prevState) => {
			return {
				...prevState, 
				confirmPassword: e.target.value
			}
		})
	}

	const handleCountryChange = (e) => {
	 	setUserInput((prevState) => {
			return {
				...prevState, 
				countryCode: e.target.value
			}
		})
 	};

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		const result = EMAIL_REGEX.test(userInput.email);

		setInputError((prevState) => {
			return {
				...prevState,
				email: result
			}
		})
	}, [userInput.email])

	useEffect(() => {
		const passwordValid = PASSWORD_REGEX.test(userInput.password);
		const passwordsMatch = userInput.password === userInput.confirmPassword;

		// console.log(passwordsMatch);

		setInputError((prevState) => ({
			...prevState,
			password: userInput.password ? passwordValid : '',
			confirmPassword: userInput.confirmPassword ? passwordsMatch : ''
		}));
	}, [userInput.password, userInput.confirmPassword]);

	useEffect(() => {
		setErrMsg('');

		setInputError({
			email: '',
			password: '',
			confirmPassword: '',
			countryCode: ''
		})
	}, [userInput.email, userInput.password, userInput.countryCode, userInput.confirmPassword])
	
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!userInput.email || !userInput.password || !userInput.confirmPassword || !userInput.countryCode) {
    		setInputError((prevState) => {
	    		return {
	    			...prevState,
	    			email: userInput.email === '' ? true : false,
	    			password: userInput.password === '' ? true : false,
	    			countryCode: userInput.countryCode === '' ? true : false,
	    			confirmPassword: userInput.confirmPassword === '' ? true : false,
	    		}
	    	});
    		return;
    	}

    	else {
    		try {
    			setIsLoading(true);

				const response = await axiosInstance.post('/api/v1/auth/sign-up',
	    			{
							email: userInput.email,
							password: userInput.password,
							cpassword: userInput.confirmPassword,
							device_id: getDeviceId(),
							country: userInput.countryCode
					},
					{
						    headers: {
						      'Content-Type': 'application/json', // Send data as JSON
						    },
						    withCredentials: true,
					}
	    		);

				// console.log(response);

	    		if (response.data && response.data.isSuccess) {
	    			setUserInput({
							email: '',
							password: '',
							confirmPassword: ''
	    			})

	    			setCurrentUser({
						  email: userInput.email,
						  token: response.data.token
						});

	    			// Always navigate to pricing page after successful registration (Netflix-style)
	    			navigate('/pricing', { replace: true });
	    		}

	    		else {
	    			setErrMsg(response.data?.message);
	    			window.scrollTo({ top: 0, behavior: 'smooth' });
	    		}
	    	}

	    	catch (err) {
	    		// console.log(err, err.response?.status === 400, err.response?.status === 400 && !err.response.data?.isSuccess);

	    		window.scrollTo({ top: 0, behavior: 'smooth' });

	    		if (!err?.response) {
	    			setErrMsg("Failed to Register. Try Again...");
	    		}
	    		else if (err.response?.status === 400 && !err.response.data?.isSuccess) {
	    			setErrMsg(err.response?.data.message);
	    		}

	    		else if (err.response?.status === 401 || err.response?.status === 404) {
	    			setErrMsg(err.response?.data.message)
	    		}

	    		else {
	    			setErrMsg("Register Failed...");
	    		}
	    	}
	    	
	    	finally {
		      setIsLoading(false); // Stop loading after request completes
		    }
    	}
	}

	const togglePasswordVisibility = (field) => {
		setShowPassword(prevState => ({
	    	...prevState,
			[field]: !prevState[field]
	  	}));
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
							<Link to="/" className="text-emerald-50 font-bold text-2xl sm:text-3xl md:text-5xl">
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
					
					{/* Registration Form Container */}
					<div className="relative z-10 max-w-md mx-auto mt-20 sm:mt-24 md:mt-32 mb-8 p-6 sm:p-8 md:p-10 bg-black/80 rounded-lg border border-gray-800/50 backdrop-blur-sm">
						{isLoading ? (
							<div className="flex justify-center items-center h-64">
								<div className="animate-spin h-12 w-12 border-4 border-emerald-500 rounded-full border-t-transparent"></div>
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
								
								
									<>
										<h1 className="text-2xl sm:text-3xl font-bold mb-2 text-[#d4af37]">{t('createAccount')}</h1>
										<p className="text-gray-400 text-sm sm:text-base mb-6">{t('startyourstreamingjourney')}</p>
										
										<form onSubmit={handleSubmit} className="space-y-5">
											{/* Country Dropdown */}
								            <div className="space-y-1">
								              <div className={`relative ${inputError.countryCode === false ? 'border-red-500' : 'border-gray-600'} bg-purple-900/20 border rounded-md focus-within:border-purple-500 transition duration-300`}>
								                <div className="flex items-center">
								                  <span className="pl-3 pr-3 text-gray-300">
								                    <FaGlobe />
								                  </span>
								                  <select
								                    className="w-full bg-transparent py-3 px-3 focus:outline-none text-white placeholder-gray-300 text-sm sm:text-base cursor-pointer"
								                    value={userInput.countryCode}
								                    onChange={handleCountryChange}
								                    required
								                  >
								                    			<option value="AF" className="bg-gray-800 text-white">Afghanistan (AF)</option>
														        <option value="AL" className="bg-gray-800 text-white">Albania (AL)</option>
														        <option value="DZ" className="bg-gray-800 text-white">Algeria (DZ)</option>
														        <option value="AD" className="bg-gray-800 text-white">Andorra (AD)</option>
														        <option value="AO" className="bg-gray-800 text-white">Angola (AO)</option>
														        <option value="AR" className="bg-gray-800 text-white">Argentina (AR)</option>
														        <option value="AM" className="bg-gray-800 text-white">Armenia (AM)</option>
														        <option value="AU" className="bg-gray-800 text-white">Australia (AU)</option>
														        <option value="AT" className="bg-gray-800 text-white">Austria (AT)</option>
														        <option value="AZ" className="bg-gray-800 text-white">Azerbaijan (AZ)</option>
														        <option value="BS" className="bg-gray-800 text-white">Bahamas (BS)</option>
														        <option value="BH" className="bg-gray-800 text-white">Bahrain (BH)</option>
														        <option value="BD" className="bg-gray-800 text-white">Bangladesh (BD)</option>
														        <option value="BB" className="bg-gray-800 text-white">Barbados (BB)</option>
														        <option value="BY" className="bg-gray-800 text-white">Belarus (BY)</option>
														        <option value="BE" className="bg-gray-800 text-white">Belgium (BE)</option>
														        <option value="BZ" className="bg-gray-800 text-white">Belize (BZ)</option>
														        <option value="BJ" className="bg-gray-800 text-white">Benin (BJ)</option>
														        <option value="BT" className="bg-gray-800 text-white">Bhutan (BT)</option>
														        <option value="BO" className="bg-gray-800 text-white">Bolivia (BO)</option>
														        <option value="BA" className="bg-gray-800 text-white">Bosnia and Herzegovina (BA)</option>
														        <option value="BW" className="bg-gray-800 text-white">Botswana (BW)</option>
														        <option value="BR" className="bg-gray-800 text-white">Brazil (BR)</option>
														        <option value="BN" className="bg-gray-800 text-white">Brunei (BN)</option>
														        <option value="BG" className="bg-gray-800 text-white">Bulgaria (BG)</option>
														        <option value="BF" className="bg-gray-800 text-white">Burkina Faso (BF)</option>
														        <option value="BI" className="bg-gray-800 text-white">Burundi (BI)</option>
														        <option value="KH" className="bg-gray-800 text-white">Cambodia (KH)</option>
														        <option value="CM" className="bg-gray-800 text-white">Cameroon (CM)</option>
														        <option value="CA" className="bg-gray-800 text-white">Canada (CA)</option>
														        <option value="CV" className="bg-gray-800 text-white">Cape Verde (CV)</option>
														        <option value="KY" className="bg-gray-800 text-white">Cayman Islands (KY)</option>
														        <option value="CF" className="bg-gray-800 text-white">Central African Republic (CF)</option>
														        <option value="TD" className="bg-gray-800 text-white">Chad (TD)</option>
														        <option value="CL" className="bg-gray-800 text-white">Chile (CL)</option>
														        <option value="CN" className="bg-gray-800 text-white">China (CN)</option>
														        <option value="CO" className="bg-gray-800 text-white">Colombia (CO)</option>
														        <option value="KM" className="bg-gray-800 text-white">Comoros (KM)</option>
														        <option value="CG" className="bg-gray-800 text-white">Congo (CG)</option>
														        <option value="CD" className="bg-gray-800 text-white">Congo, Democratic Republic of the (CD)</option>
														        <option value="CR" className="bg-gray-800 text-white">Costa Rica (CR)</option>
														        <option value="CI" className="bg-gray-800 text-white">Côte d'Ivoire (CI)</option>
														        <option value="HR" className="bg-gray-800 text-white">Croatia (HR)</option>
														        <option value="CU" className="bg-gray-800 text-white">Cuba (CU)</option>
														        <option value="CY" className="bg-gray-800 text-white">Cyprus (CY)</option>
														        <option value="CZ" className="bg-gray-800 text-white">Czech Republic (CZ)</option>
														        <option value="DK" className="bg-gray-800 text-white">Denmark (DK)</option>
														        <option value="DJ" className="bg-gray-800 text-white">Djibouti (DJ)</option>
														        <option value="DM" className="bg-gray-800 text-white">Dominica (DM)</option>
														        <option value="DO" className="bg-gray-800 text-white">Dominican Republic (DO)</option>
														        <option value="EC" className="bg-gray-800 text-white">Ecuador (EC)</option>
														        <option value="EG" className="bg-gray-800 text-white">Egypt (EG)</option>
														        <option value="SV" className="bg-gray-800 text-white">El Salvador (SV)</option>
														        <option value="GQ" className="bg-gray-800 text-white">Equatorial Guinea (GQ)</option>
														        <option value="ER" className="bg-gray-800 text-white">Eritrea (ER)</option>
														        <option value="EE" className="bg-gray-800 text-white">Estonia (EE)</option>
														        <option value="ET" className="bg-gray-800 text-white">Ethiopia (ET)</option>
														        <option value="FJ" className="bg-gray-800 text-white">Fiji (FJ)</option>
														        <option value="FI" className="bg-gray-800 text-white">Finland (FI)</option>
														        <option value="FR" className="bg-gray-800 text-white">France (FR)</option>
														        <option value="GA" className="bg-gray-800 text-white">Gabon (GA)</option>
														        <option value="GM" className="bg-gray-800 text-white">Gambia (GM)</option>
														        <option value="GE" className="bg-gray-800 text-white">Georgia (GE)</option>
														        <option value="DE" className="bg-gray-800 text-white">Germany (DE)</option>
														        <option value="GH" className="bg-gray-800 text-white">Ghana (GH)</option>
														        <option value="GR" className="bg-gray-800 text-white">Greece (GR)</option>
														        <option value="GD" className="bg-gray-800 text-white">Grenada (GD)</option>
														        <option value="GT" className="bg-gray-800 text-white">Guatemala (GT)</option>
														        <option value="GN" className="bg-gray-800 text-white">Guinea (GN)</option>
														        <option value="GW" className="bg-gray-800 text-white">Guinea-Bissau (GW)</option>
														        <option value="GY" className="bg-gray-800 text-white">Guyana (GY)</option>
														        <option value="HT" className="bg-gray-800 text-white">Haiti (HT)</option>
														        <option value="HN" className="bg-gray-800 text-white">Honduras (HN)</option>
														        <option value="HU" className="bg-gray-800 text-white">Hungary (HU)</option>
														        <option value="IS" className="bg-gray-800 text-white">Iceland (IS)</option>
														        <option value="IN" className="bg-gray-800 text-white">India (IN)</option>
														        <option value="ID" className="bg-gray-800 text-white">Indonesia (ID)</option>
														        <option value="IR" className="bg-gray-800 text-white">Iran (IR)</option>
														        <option value="IQ" className="bg-gray-800 text-white">Iraq (IQ)</option>
														        <option value="IE" className="bg-gray-800 text-white">Ireland (IE)</option>
														        <option value="IL" className="bg-gray-800 text-white">Israel (IL)</option>
														        <option value="IT" className="bg-gray-800 text-white">Italy (IT)</option>
														        <option value="JM" className="bg-gray-800 text-white">Jamaica (JM)</option>
														        <option value="JP" className="bg-gray-800 text-white">Japan (JP)</option>
														        <option value="JO" className="bg-gray-800 text-white">Jordan (JO)</option>
														        <option value="KZ" className="bg-gray-800 text-white">Kazakhstan (KZ)</option>
														        <option value="KE" className="bg-gray-800 text-white">Kenya (KE)</option>
																		<option value="KI" className="bg-gray-800 text-white">Kiribati (KI)</option>
																		<option value="KP" className="bg-gray-800 text-white">North Korea (KP)</option>
																		<option value="KR" className="bg-gray-800 text-white">South Korea (KR)</option>
																		<option value="KW" className="bg-gray-800 text-white">Kuwait (KW)</option>
																		<option value="KG" className="bg-gray-800 text-white">Kyrgyzstan (KG)</option>
																		<option value="LA" className="bg-gray-800 text-white">Laos (LA)</option>
																		<option value="LV" className="bg-gray-800 text-white">Latvia (LV)</option>
																		<option value="LB" className="bg-gray-800 text-white">Lebanon (LB)</option>
																		<option value="LS" className="bg-gray-800 text-white">Lesotho (LS)</option>
																		<option value="LR" className="bg-gray-800 text-white">Liberia (LR)</option>
																		<option value="LY" className="bg-gray-800 text-white">Libya (LY)</option>
																		<option value="LI" className="bg-gray-800 text-white">Liechtenstein (LI)</option>
																		<option value="LT" className="bg-gray-800 text-white">Lithuania (LT)</option>
																		<option value="LU" className="bg-gray-800 text-white">Luxembourg (LU)</option>
																		<option value="MG" className="bg-gray-800 text-white">Madagascar (MG)</option>
																		<option value="MW" className="bg-gray-800 text-white">Malawi (MW)</option>
																		<option value="MY" className="bg-gray-800 text-white">Malaysia (MY)</option>
																		<option value="MV" className="bg-gray-800 text-white">Maldives (MV)</option>
																		<option value="ML" className="bg-gray-800 text-white">Mali (ML)</option>
																		<option value="MT" className="bg-gray-800 text-white">Malta (MT)</option>
																		<option value="MH" className="bg-gray-800 text-white">Marshall Islands (MH)</option>
																		<option value="MR" className="bg-gray-800 text-white">Mauritania (MR)</option>
																		<option value="MU" className="bg-gray-800 text-white">Mauritius (MU)</option>
																		<option value="MX" className="bg-gray-800 text-white">Mexico (MX)</option>
																		<option value="FM" className="bg-gray-800 text-white">Micronesia (FM)</option>
																		<option value="MD" className="bg-gray-800 text-white">Moldova (MD)</option>
																		<option value="MC" className="bg-gray-800 text-white">Monaco (MC)</option>
																		<option value="MN" className="bg-gray-800 text-white">Mongolia (MN)</option>
																		<option value="ME" className="bg-gray-800 text-white">Montenegro (ME)</option>
																		<option value="MA" className="bg-gray-800 text-white">Morocco (MA)</option>
																		<option value="MZ" className="bg-gray-800 text-white">Mozambique (MZ)</option>
																		<option value="MM" className="bg-gray-800 text-white">Myanmar (MM)</option>
																		<option value="NA" className="bg-gray-800 text-white">Namibia (NA)</option>
																		<option value="NR" className="bg-gray-800 text-white">Nauru (NR)</option>
																		<option value="NP" className="bg-gray-800 text-white">Nepal (NP)</option>
																		<option value="NL" className="bg-gray-800 text-white">Netherlands (NL)</option>
																		<option value="NZ" className="bg-gray-800 text-white">New Zealand (NZ)</option>
																		<option value="NI" className="bg-gray-800 text-white">Nicaragua (NI)</option>
																		<option value="NE" className="bg-gray-800 text-white">Niger (NE)</option>
																		<option value="NG" className="bg-gray-800 text-white">Nigeria (NG)</option>
																		<option value="NO" className="bg-gray-800 text-white">Norway (NO)</option>
																		<option value="OM" className="bg-gray-800 text-white">Oman (OM)</option>
																		<option value="PK" className="bg-gray-800 text-white">Pakistan (PK)</option>
																		<option value="PW" className="bg-gray-800 text-white">Palau (PW)</option>
																		<option value="PS" className="bg-gray-800 text-white">Palestine (PS)</option>
																		<option value="PA" className="bg-gray-800 text-white">Panama (PA)</option>
																		<option value="PG" className="bg-gray-800 text-white">Papua New Guinea (PG)</option>
																		<option value="PY" className="bg-gray-800 text-white">Paraguay (PY)</option>
																		<option value="PE" className="bg-gray-800 text-white">Peru (PE)</option>
																		<option value="PH" className="bg-gray-800 text-white">Philippines (PH)</option>
																		<option value="PL" className="bg-gray-800 text-white">Poland (PL)</option>
																		<option value="PT" className="bg-gray-800 text-white">Portugal (PT)</option>
																		<option value="QA" className="bg-gray-800 text-white">Qatar (QA)</option>
																		<option value="RO" className="bg-gray-800 text-white">Romania (RO)</option>
																		<option value="RU" className="bg-gray-800 text-white">Russia (RU)</option>
																		<option value="RW" className="bg-gray-800 text-white">Rwanda (RW)</option>
																		<option value="KN" className="bg-gray-800 text-white">Saint Kitts and Nevis (KN)</option>
																		<option value="LC" className="bg-gray-800 text-white">Saint Lucia (LC)</option>
																		<option value="VC" className="bg-gray-800 text-white">Saint Vincent and the Grenadines (VC)</option>
																		<option value="WS" className="bg-gray-800 text-white">Samoa (WS)</option>
																		<option value="SM" className="bg-gray-800 text-white">San Marino (SM)</option>
																		<option value="ST" className="bg-gray-800 text-white">Sao Tome and Principe (ST)</option>
																		<option value="SA" className="bg-gray-800 text-white">Saudi Arabia (SA)</option>
																		<option value="SN" className="bg-gray-800 text-white">Senegal (SN)</option>
																		<option value="RS" className="bg-gray-800 text-white">Serbia (RS)</option>
																		<option value="SC" className="bg-gray-800 text-white">Seychelles (SC)</option>
																		<option value="SL" className="bg-gray-800 text-white">Sierra Leone (SL)</option>
																		<option value="SG" className="bg-gray-800 text-white">Singapore (SG)</option>
																		<option value="SK" className="bg-gray-800 text-white">Slovakia (SK)</option>
																		<option value="SI" className="bg-gray-800 text-white">Slovenia (SI)</option>
																		<option value="SB" className="bg-gray-800 text-white">Solomon Islands (SB)</option>
																		<option value="SO" className="bg-gray-800 text-white">Somalia (SO)</option>
																		<option value="ZA" className="bg-gray-800 text-white">South Africa (ZA)</option>
																		<option value="SS" className="bg-gray-800 text-white">South Sudan (SS)</option>
																		<option value="ES" className="bg-gray-800 text-white">Spain (ES)</option>
																		<option value="LK" className="bg-gray-800 text-white">Sri Lanka (LK)</option>
																		<option value="SD" className="bg-gray-800 text-white">Sudan (SD)</option>
																		<option value="SR" className="bg-gray-800 text-white">Suriname (SR)</option>
																		<option value="SE" className="bg-gray-800 text-white">Sweden (SE)</option>
																		<option value="CH" className="bg-gray-800 text-white">Switzerland (CH)</option>
																		<option value="SY" className="bg-gray-800 text-white">Syria (SY)</option>
																		<option value="TJ" className="bg-gray-800 text-white">Tajikistan (TJ)</option>
																		<option value="TZ" className="bg-gray-800 text-white">Tanzania (TZ)</option>
																		<option value="TH" className="bg-gray-800 text-white">Thailand (TH)</option>
																		<option value="TL" className="bg-gray-800 text-white">Timor-Leste (TL)</option>
																		<option value="TG" className="bg-gray-800 text-white">Togo (TG)</option>
																		<option value="TO" className="bg-gray-800 text-white">Tonga (TO)</option>
																		<option value="TT" className="bg-gray-800 text-white">Trinidad and Tobago (TT)</option>
																		<option value="TN" className="bg-gray-800 text-white">Tunisia (TN)</option>
																		<option value="TR" className="bg-gray-800 text-white">Turkey (TR)</option>
																		<option value="TM" className="bg-gray-800 text-white">Turkmenistan (TM)</option>
																		<option value="TV" className="bg-gray-800 text-white">Tuvalu (TV)</option>
																		<option value="UG" className="bg-gray-800 text-white">Uganda (UG)</option>
																		<option value="UA" className="bg-gray-800 text-white">Ukraine (UA)</option>
																		<option value="AE" className="bg-gray-800 text-white">United Arab Emirates (AE)</option>
																		<option value="GB" className="bg-gray-800 text-white">United Kingdom (GB)</option>
																		<option value="US" className="bg-gray-800 text-white">United States (US)</option>
																		<option value="UY" className="bg-gray-800 text-white">Uruguay (UY)</option>
																		<option value="UZ" className="bg-gray-800 text-white">Uzbekistan (UZ)</option>
																		<option value="VU" className="bg-gray-800 text-white">Vanuatu (VU)</option>
																		<option value="VE" className="bg-gray-800 text-white">Venezuela (VE)</option>
																		<option value="VN" className="bg-gray-800 text-white">Vietnam (VN)</option>
																		<option value="YE" className="bg-gray-800 text-white">Yemen (YE)</option>
																		<option value="ZM" className="bg-gray-800 text-white">Zambia (ZM)</option>
																		<option value="ZW" className="bg-gray-800 text-white">Zimbabwe (ZW)</option>
								                  </select>
								                </div>
								              </div>
								              {inputError.countryCode === false && (
								                <p className="text-red-500 text-sm mt-2">{t('pleaseSelectCountry')}</p>
								              )}
								            </div>

											<div className="space-y-1">
												<div className={`relative ${inputError.email === false ? 'border-red-500' : 'border-gray-600'} bg-purple-900/20 border rounded-md focus-within:border-purple-500 transition duration-300`}>
													<div className="flex items-center">
														<span className="pl-3 pr-3 text-gray-300">
													      <FaEnvelope />
													    </span>
													    <input
													     	type="email"
													     	ref={userRef}
															className="w-full bg-transparent py-3 px-3 focus:outline-none text-white placeholder-gray-300 text-sm sm:text-base"
													      	placeholder={t('email')}
													      	value={userInput.email}
													      	onChange={handleEmailChange}
															required
													    />
													</div>
												</div>
													{inputError.email && (
								          				<p className="text-red-500 text-sm mt-2">{t('pleaseEnterValidEmail')}</p>
								        			)}
											</div>

											<div className="space-y-1">
												<div className={`relative ${inputError.password === false ? 'border-red-500' : 'border-gray-600'} bg-purple-900/20 border rounded-md focus-within:border-purple-500 transition duration-300`}>
													<div className="flex items-center">
														<span className="pl-3 pr-3 text-gray-300">
													      <FaLock />
													    </span>
													    <input
															type={showPassword.password ? "text" : "password"}
															className="w-full bg-transparent py-3 px-3 focus:outline-none text-white placeholder-gray-300 text-sm sm:text-base"
														      value={userInput.password}
														      onChange={handlePasswordChange}
																placeholder={t('passowrd')}
																required
														/>
														<button
															type="button"
													        onClick={() => togglePasswordVisibility('password')}
															className="cursor-pointer text-gray-300 pr-3 hover:text-purple-500 transition duration-300"
													  >
															{showPassword.password ? <FaEyeSlash /> : <FaEye />}
														</button>
													</div>
												</div>
												{inputError.password && (
										          	<p className="text-red-500 text-sm mt-2">{t('passwordValid')}</p>
										        )}
											</div>

											<div className="space-y-1">
												<div className={`relative ${userInput.confirmPassword && inputError.confirmPassword === false ? 'border-red-500' : 'border-gray-600'} bg-purple-900/20 border rounded-md focus-within:border-purple-500 transition duration-300`}>
													<div className="flex items-center">
														<span className="pl-3 pr-3 text-gray-300">
								      						<FaLock />
								    					</span>
								    					<input
																type={showPassword.confirmPassword ? "text" : "password"}
																className="w-full bg-transparent py-3 px-3 focus:outline-none text-white placeholder-gray-300 text-sm sm:text-base"
								      						value={userInput.confirmPassword}
								      						onChange={handleConfirmPasswordChange}
																placeholder={t('confirmPassword')}
																required
								    					/>
														<button
															type="button"
							          						onClick={() => togglePasswordVisibility('confirmPassword')}
															className="cursor-pointer text-gray-300 pr-3 hover:text-purple-500 transition duration-300"
							        					>
															{showPassword.confirmPassword ? <FaEyeSlash /> : <FaEye />}
														</button>
													</div>
												</div>
													{inputError.confirmPassword === false && (
								          	<p className="text-red-500 text-sm mt-2">{t('passwordMustMatch')}</p>
								        	)}
								  		</div>
											
											<button
												type="submit"
												className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#a923c5] via-[#10cddb] to-[#a923c5] bg-[length:200%] hover:bg-right transition-all duration-700 text-white font-bold py-2 px-4 rounded-md relative overflow-hidden transform hover:scale-[1.02] cursor-pointer"
												disabled={isLoading}
											>
												{isLoading ? <Loader /> : (
													<>
												{t('createAccount')}
												<FaArrowRight />
													</>
												)}
											</button>
											
											<p className="text-gray-500 text-xs mt-4">
												{t('agreeToTerms')} <Link to="/terms" className="text-purple-500 hover:text-purple-400">{t('termsOfUse')}</Link> {t('acknowledgePrivacy')} <Link to="/privacy" className="text-purple-500 hover:text-purple-400">{t('privacyPolicy')}</Link>.
											</p>

											<p className="text-center mb-2 text-md sm:mt-5 text-gray-400 font-medium">{t('alreadyHaveAccount')} 
												<Link to="/login" className="text-white font-medium hover:text-purple-500"> {t('signIn')}</Link>
											</p>
										</form>
									</>
								
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

export default connect(null, mapDispatchToProps)(Register);