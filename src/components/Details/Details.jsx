import { Fragment, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaUpload, FaUser, FaEnvelope, FaLock, FaEyeSlash, FaEye, FaArrowRight } from "react-icons/fa6";
import { Loader, LanguageSwitch, ThemeSwitcher, Footer, Navbar } from "../index";
import axiosInstance from '../../api/axios';
import axios from 'axios';
import { connect } from "react-redux";
import { useSelector } from 'react-redux';
import useTranslation from "../../hooks/useTranslation";

// Import the background image

const Details = () => {
	const userRef = useRef();
	const errRef = useRef();

	const BASE_IMG_URL = import.meta.env.VITE_IMG_URL;
	const { t } = useTranslation();

	const navigate = useNavigate();

	const currentUser = useSelector((state) => state.user.currentUser);

	const [ userInput, setUserInput ] = useState({
		name: '',
		image: ''
	})

	const [ inputError, setInputError ] = useState({
		name: '',
		image: ''
	})

	const [ errMsg, setErrMsg ] = useState('');
	const [ isLoading, setIsLoading ] = useState(false);

	const NAME_REGEX = /^[A-Za-z ]+$/;
	const IMAGE_REGEX = /^(?!.*\.avif$)(.*\.(jpg|jpeg|png|gif))$/;

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		if (userInput.name.trim() !== '') {
			const result = NAME_REGEX.test(userInput.name);

			setInputError((prevState) => {
				return {
					...prevState,
					name: result
				}
			})
		}
	}, [userInput.name])

	useEffect(() => {
		const result = IMAGE_REGEX.test(userInput.image);

		setInputError((prevState) => {
			return {
				...prevState,
				image: result
			}
		})
	}, [userInput.image])

	useEffect(() => {
		setErrMsg('');

		setInputError({
			name: '',
			image: ''
		})
	}, [userInput.email, userInput.image])

	const handleNameChange = (e) => {
		setUserInput((prevState) => {
			return {
				...prevState,
				name: e.target.value
			}
		})
	}
	
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!userInput.name) {
    		setInputError((prevState) => {
	    		return {
	    			...prevState,
	    			name: userInput.name === '' ? true : false
	    		}
	    	});
    		return;
    	}

    	else {
    		try {
    			setIsLoading(true);

				const response = await axiosInstance.post('/api/v1/users/details',
	    			{
					    name: userInput.name,
						image: userInput.image || null
					},
					{
					    headers: {
					      'Content-Type': 'application/json', // Send data as JSON
					    },
					    withCredentials: true,
					}
	    		);

	    		if (response.data && response.data.isSuccess) {
	    			setUserInput({
	    				name: '',
						image: ''
	    			})

	    			// Always navigate to pricing page after successful registration (Netflix-style)
	    			navigate('/home', { replace: true });
	    		}

	    		else {
	    			setErrMsg("Register Failed...");
	    			window.scrollTo({ top: 0, behavior: 'smooth' });
	    		}
	    	}

	    	catch (err) {
	    		window.scrollTo({ top: 0, behavior: 'smooth' });

	    		if (!err?.response) {
	    			setErrMsg("Failed to add personnel details. Try Again...");
	    		}
	    		else if (err.response.data?.statusCode === 400 && !err.response.data?.isSuccess) {
	    			setErrMsg(err.response?.data.message);
	    		}

	    		else if (err.response.data?.statusCode === 401) {
	    			setErrMsg(err.response?.data.message)
	    		}

	    		else {
	    			setErrMsg("Personnel details Failed...");
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

	const handleImageUpload = async (e) => {
	    const file = e.target.files[0];
	    if (file) {
	    	const reader = new FileReader();
				    reader.onloadend = () => {
				        setUserInput((prevState) => {
				        	return {
				        		...prevState,
				        		image: reader.result
				        	}
				        }); // Store image base64 preview
				        // console.log(reader.result);
				    };
				    reader.readAsDataURL(file); // Convert image to base64
		  	try {
				const data = new FormData();
		  		data.append('fileToUpload', file);

				let config = {
				  method: 'post',
				  maxBodyLength: Infinity,
				  url: BASE_IMG_URL,
				  headers: { },
				  data : data
				};

				const response = await axios.request(config);

	    		// console.log(JSON.stringify(response.data), response.data.image);

	    		if (response.data && response.data.isSuccess) {
	    			setUserInput((prevState) => {
	    				return {
	    					...prevState,
	    					image: response.data.image
	    				}
	    			})
	    		}

	    		else {
	    			setErrMsg("Failed to add image...");
	    			setUserInput((prevState) => {
	    				return {
	    					...prevState,
	    					image: ''
	    				}
	    			})
	    			window.scrollTo({ top: 0, behavior: 'smooth' });
	    		}
			}

			catch {
				setErrMsg("Failed to add image...");
				window.scrollTo({ top: 0, behavior: 'smooth' });
			}
	    }
	};

	const deleteImage = () => {
		setUserInput((prevState) => {
			return {
				...prevState,
				image: ''
			}
		})
	}

	return (
		<Fragment>
			<div className="bg-black min-h-screen w-full text-white">
				{/* Background layer */}
				<div className="relative min-h-screen">
					<div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/90 to-black/95"></div>
					
					{/* Navigation with centered logo */}
					{/*<nav className="relative z-10 flex items-center justify-between px-4 sm:px-6 py-4 sm:py-6 md:px-16 border-b border-gray-800/50">
						<Link to="/" className="text-emerald-50 font-bold text-2xl sm:text-3xl md:text-5xl">
							YENUMAX
						</Link>
						<div className="flex gap-2 sm:gap-4 items-center">
							
							<ThemeSwitcher />
							
							
							<div className="hidden md:block">
								<LanguageSwitch showFullNames={true} />
							</div>
							
							<div className="md:hidden">
								<LanguageSwitch showFullNames={false} />
							</div>
						</div>
					</nav>*/}
					<Navbar />
					
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
										<h1 className="text-2xl sm:text-3xl font-bold mb-2 text-white mb-8">{t('yourDetails')}</h1>
										
										<form onSubmit={handleSubmit} className="space-y-8">
											<div className="space-y-1 border-0 flex flex-col items-center">
											    <div className="relative w-32 h-32 rounded-full border-2 border-emerald-300 flex items-center justify-center cursor-pointer">
											        {/* Upload Icon and Text */}
											        {!userInput.image ? (
											          <>
											            <label
											              htmlFor="image-upload"
											              className="absolute flex items-center justify-center cursor-pointer"
											            >
											              <FaUpload className="text-gray-500 w-6 h-6" />
											              <span className="ml-2 text-gray-400 text-sm">{t('uploadImage')}</span>
											            </label>
											          </>
											        ) : (
											          <img
											            src={userInput.image.startsWith('data:image') 
														  ? userInput.image 
														  : `https://api.edugarciamovimiento.com/fitness/uploads/${userInput.image}`
														}
											            alt="Uploaded preview"
											            className="w-32 h-32 object-cover rounded-full"
											          />
											        )}
											        {/* Hidden File Input */}
											        <input
											          type="file"
											          id="image-upload"
											          accept="image/*"
											          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
											          onChange={handleImageUpload}
											        />
											    </div>
											    {userInput.image && <button className="text-white border-2 border-red-300 cursor-pointer" onClick={deleteImage}>{t('delete')}</button>}
											</div>

											<div className="space-y-1">
												<div className={`relative ${inputError.name === false ? 'border-red-500' : 'border-gray-600'} bg-black/60 border rounded-md focus-within:border-emerald-500 transition duration-300`}>
													<div className="flex items-center">
														<span className="pl-3 text-gray-400">
								      						<FaUser />
								    					</span>
													    <input
													      type="text"
													      ref={userRef}
																className="w-full bg-transparent py-3 px-3 focus:outline-none text-white text-sm sm:text-base"
													      value={userInput.name}
													      onChange={handleNameChange}
																placeholder={t('name')}
																required
													    />
													  </div>
												</div>
												{inputError.name && (
									          		<p className="text-red-500 text-sm mt-2">{t('pleaseEnterValidName')}</p>
									        	)}
											</div>
											
											<button
												type="submit"
												className="w-full cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-md font-medium transition duration-300 flex items-center justify-center mt-4"
											>
												{t('createProfileButton')} <FaArrowRight className="ml-2" />
											</button>
										</form>
									</>
								
							</>
						)}
					</div>

					{/* Footer */}
					<Footer />
				</div>
			</div>
		</Fragment>
	);
};

export default Details;