import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { FaCheck } from "react-icons/fa";
import { LanguageSwitch, Layout } from "../../components";
import useTranslation from "../../hooks/useTranslation";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

// Import the background image for consistency with landing page
// import netflixBg from '../../assets/netflix_bg_new.jpg';

const Home = () => {
	const navigate = useNavigate();
	const currentUser = useSelector((state) => state.user.currentUser);
	const [isLoading, setIsLoading] = useState(true);
	const { t } = useTranslation();

	const axiosPrivate = useAxiosPrivate();

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 1000);
		
		return () => clearTimeout(timer);
	}, []);

	const handleClick = () => {
		currentUser?.email ? navigate('/pricing', { replace: true }) : navigate("/login");
	}

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const getPlans = async () => {
		  	try {
				await axiosPrivate.get(
			      `/api/v1/payments/home/${currentUser?.email}`,
			      { signal: controller.signal }
			    );
			    
			    if (isMounted) {
			      setIsLoading(false);
			    }
			} catch (error) {
			    if (error.name === 'CanceledError' || error.code === 'ERR_CANCELED') {
					return;
				} else if (error.response?.data.statusCode === 401) {
			      navigate("/login", { state: { from: location }, replace: true });
			    }
		  	}
		};

		getPlans();

		return () => {
			isMounted = false;
			controller.abort();
		}
	}, []);

	return (
		<Layout>
			<div className="w-full text-white pt-20">
				<div className="relative">
				<div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/90 to-black/95"></div>

				{isLoading ? (
						<div className="relative z-10 flex justify-center items-center h-[60vh]">
						<div className="animate-spin h-12 w-12 border-4 border-emerald-500 rounded-full border-t-transparent"></div>
					</div>
				) : (
						<div className="relative z-10 container mx-auto px-4 py-16">
						<div className="flex flex-col items-center">
							{/* Circle with checkmark */}
							<div className="border-2 border-emerald-500 rounded-full p-3 flex items-center justify-center w-16 h-16 mb-6">
								<FaCheck className="text-emerald-500" size={24} />
							</div>

							<div className="mb-2">
								<p className="uppercase text-base font-medium text-gray-300">{t('step3of4')}</p>
							</div>

							<div className="mb-8">
								<p className="text-2xl lg:text-4xl">{t('chooseYourPlan')}</p>
							</div>

							<div className="border-0 flex justify-center items-center mb-8">
								<table className="table-auto border-0 xs:pl-12 xs:pr-10 xd:pl-20 xm:pl-25 xm:pr-15 sm:px-4 border-separate border-spacing-y-2">
								  <tbody>
								    <tr>
								      <td><FaCheck className="text-emerald-500" fontSize={20} fontWeight={0} /></td>
								      <td className="text-lg subpixel-antialiased xm:line-clamp-0 sm:line-clamp-2">
								      	{t('noCommitments')}
								      </td>
								    </tr>
								    <tr>
								      <td><FaCheck className="text-emerald-500" fontSize={20} fontWeight={0} /></td>
								      <td className="text-lg subpixel-antialiased xm:line-clamp-0 sm:line-clamp-2">
								      	{t('allFitness')}
								      </td>
								    </tr>
								    <tr>
								      <td><FaCheck className="text-emerald-500" fontSize={20} fontWeight={0} /></td>
								      <td className="text-lg subpixel-antialiased xm:line-clamp-0 sm:line-clamp-2">
								      	{t('noAds')}
								      </td>
								    </tr>
								  </tbody>
								</table>
							</div>
							
							<div className="w-60 md:w-90">
								<button 
									type="button"
									onClick={handleClick} 
										className="w-full font-bold py-3 bg-gradient-to-r from-[#a923c5] via-[#10cddb] to-[#a923c5] bg-[length:200%] hover:bg-right text-lg text-white tracking-wide cursor-pointer transition-all duration-700 rounded-md relative overflow-hidden transform hover:scale-[1.02]"
								>
									{t('next')}
								</button>
							</div>
						</div>
					</div>
				)}
				</div>
			</div>
		</Layout>
	);
};

export default Home;