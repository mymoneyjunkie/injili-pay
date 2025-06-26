import { Fragment, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { LanguageSwitch } from "../../components";
import useTranslation from "../../hooks/useTranslation";

// Import the background image
import netflixBg from '/bunmi-bg.png';

const Index = () => {
	const errRef = useRef();
  	const navigate = useNavigate();
	const [errMsg, setErrMsg] = useState(null);
	const [openFaq, setOpenFaq] = useState(null);

	// Section refs for scrolling
	const heroRef = useRef(null);
	const featuresRef = useRef(null);
	const faqRef = useRef(null);

	const { t } = useTranslation();

	const handleGetStarted = (e) => {
		e.preventDefault();
		navigate("/register", { state: { from: "/pricing" }, replace: true });
	};

	// Handle FAQ toggle
	const toggleFaq = (index) => {
		setOpenFaq(openFaq === index ? null : index);
	};

	return (
		<Fragment>
			<div className="bg-black min-h-screen w-full text-white">
				{/* Side-by-side Hero Section */}
				<div ref={heroRef} className="relative min-h-screen flex flex-col">
					{/* Background layer */}
					<div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80" style={{ backgroundImage: `url(${netflixBg})` }}></div>
					<div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/50 to-black/95"></div>
					
					{/* Navigation with centered logo */}
					<nav className="relative z-10 flex items-center justify-between px-4 sm:px-6 py-4 sm:py-6 md:px-16 border-b border-gray-800/50">
						<div className="text-emerald-50 font-bold">
							<img src="/im.png" className="main_img" />
			  			</div>
						<div className="flex gap-2 sm:gap-4 items-center">
							{/* Desktop Language Switch - shows full names */}
							<div className="hidden md:block">
								<LanguageSwitch showFullNames={true} />
							</div>
							{/* Mobile Language Switch - shows abbreviations */}
							<div className="md:hidden">
								<LanguageSwitch showFullNames={false} />
							</div>
			  				<button 
								className="relative bg-gradient-to-r from-[#a923c5] via-[#10cddb] to-[#a923c5] bg-[length:200%_100%] hover:bg-[length:200%_100%] bg-left hover:bg-right cursor-pointer transition-all duration-700 ease-in-out py-1 px-3 sm:py-2 sm:px-6 rounded-md font-medium text-sm sm:text-base transform hover:scale-[1.02]"
								onClick={() => navigate("/login", { replace: true })}
							>
								{t('signIn')}
							</button>
			  			</div>
			  		</nav>

					{/* Split hero content */}
					<div className="relative z-10 flex-grow flex flex-col md:flex-row items-center">
						<div className="w-full md:w-1/2 p-4 sm:p-8 md:p-16 lg:p-20 flex flex-col justify-center">
							<h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-3 sm:mb-4 tracking-tight leading-tight text-[#d4af37]">
								{t('premiumEntertainment')}
							</h1>
							<h2 className="text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6 font-light text-gray-300">
								{t('watchAnywhere')}
							</h2>
							<p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8">
								{t('readyToStart')}
							</p>
							
							<form className="w-full" onSubmit={handleGetStarted}>
								<button
									type="submit"
									className="w-full py-4 px-8 cursor-pointer relative bg-gradient-to-r from-[#a923c5] via-[#10cddb] to-[#a923c5] bg-[length:200%_100%] hover:bg-[length:200%_100%] bg-left hover:bg-right rounded-md flex items-center justify-center font-bold text-xl transition-all duration-700 ease-in-out transform hover:scale-[1.02]"
								>
									{t('finishSignUp')}
								</button>
							</form>
						</div>
						<div className="w-full md:w-1/2 p-4 sm:p-8 flex items-center justify-center">
							{/* Spline 3D Model */}
							<div className="relative w-full h-[250px] xs:h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px]">
								{/* Adding subtle glow effect behind the 3D model */}
								<div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 via-emerald-900/20 to-emerald-900/20 blur-xl opacity-40 rounded-3xl -z-10"></div>
								
								{/* Overlay to hide the Spline credit text */}
								{/*<div className="absolute bottom-0 left-0 right-0 h-6 bg-black z-10"></div>*/}
							</div>
						</div>
					</div>
			  	</div>
				
				{/* Choose Your Plan Section - Added to landing page */}
				<div className="relative border-t-8 border-gray-800 py-16 hidden">
					<div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40" style={{ backgroundImage: `url(${netflixBg})` }}></div>
					<div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/80 to-black/95"></div>
					
					<div className="relative z-10 max-w-4xl mx-auto px-4">
						<div className="flex flex-col items-center">
							{/* Circle with checkmark */}
							<div className="border-2 border-emerald-500 rounded-full p-3 flex items-center justify-center w-16 h-16 mb-6">
								<FaCheck className="text-emerald-500" size={24} />
							</div>

							<div className="mb-8">
								<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center">{t('chooseYourPlan')}</h1>
							</div>

							<div className="max-w-md w-full mb-8">
								<ul className="space-y-6">
									<li className="flex items-start gap-4">
										<FaCheck className="text-emerald-500 mt-1 flex-shrink-0" size={24} />
										<span className="text-lg text-gray-200">{t('noCommitments')}</span>
									</li>
									<li className="flex items-start gap-4">
										<FaCheck className="text-emerald-500 mt-1 flex-shrink-0" size={24} />
										<span className="text-lg text-gray-200">{t('allFitness')}</span>
									</li>
									<li className="flex items-start gap-4">
										<FaCheck className="text-emerald-500 mt-1 flex-shrink-0" size={24} />
										<span className="text-lg text-gray-200">{t('noAds')}</span>
									</li>
								</ul>
							</div>

							<div className="w-full max-w-md">
			  			<button 
									type="button"
									onClick={handleGetStarted} 
									className="w-full font-medium py-4 bg-emerald-600 hover:bg-emerald-700 text-lg text-white tracking-wide cursor-pointer transition duration-300 ease-in-out rounded-md"
								>
									{t('getStarted')}
						</button>
							</div>
						</div>
					</div>
				</div>
				
				{/* Feature Grid (3 columns) instead of alternating rows */}
				<div ref={featuresRef} className="border-t-8 border-gray-800">
					<div className="max-w-6xl mx-auto py-12 sm:py-16 px-4 sm:px-8">
						<div className="text-center mb-8 sm:mb-12">
							<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-[#d4af37]">{t('everythingYouLove')}</h2>
							<p className="text-base sm:text-xl text-gray-400 max-w-2xl mx-auto">{t('unlimitedAccess')}</p>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 border-0">
							{/* Feature 1 */}
							<div className="bg-gray-900/50 border border-gray-800 p-4 sm:p-8 rounded-md">
								<div className="text-emerald-500 mb-3 sm:mb-4">
									<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
									</svg>
								</div>
								<h3 className="text-xl sm:text-2xl font-semibold mb-2 text-[#d4af37]">{t('enjoyOnTV')}</h3>
								<p className="text-sm sm:text-base text-gray-400">
									{t('enjoyOnTVDesc')}
								</p>
							</div>
							
							{/* Feature 2 */}
							<div className="bg-gray-900/50 border border-gray-800 p-4 sm:p-8 rounded-md">
								<div className="text-emerald-500 mb-3 sm:mb-4">
									<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
									</svg>
								</div>
								<h3 className="text-xl sm:text-2xl font-semibold mb-2 text-[#d4af37]">{t('downloadAndWatch')}</h3>
								<p className="text-sm sm:text-base text-gray-400">
									{t('downloadAndWatchDesc')}
								</p>
							</div>
							
							{/* Feature 3 */}
							<div className="bg-gray-900/50 border border-gray-800 p-4 sm:p-8 rounded-md">
								<div className="text-emerald-500 mb-3 sm:mb-4">
									<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
									</svg>
								</div>
								<h3 className="text-xl sm:text-2xl font-semibold mb-2 text-[#d4af37]">{t('watchEverywhere')}</h3>
								<p className="text-sm sm:text-base text-gray-400">
									{t('watchEverywhereDesc')}
								</p>
							</div>
						</div>
					</div>
				</div>
				
				{/* 
				=====================================================
				PREVIEW CONTENT SECTION - COMMENTED OUT FOR LATER USE
				=====================================================
				*/}
				
				{/* FAQ in two columns */}
				<div ref={faqRef} className="border-t-8 border-gray-800 bg-black">
					<div className="max-w-6xl mx-auto py-12 sm:py-16 md:py-24 px-4 sm:px-6">
						<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-[#d4af37]">
							{t('frequentlyAskedQuestions')}
						</h2>
						
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-x-12 sm:gap-y-4 mb-8 sm:mb-12">
							{/* FAQ left column */}
							<div>
								<div className="bg-gray-800 hover:bg-gray-700 transition-colors duration-300 cursor-pointer mb-4">
									<div 
										className="flex justify-between items-center p-3 sm:p-5"
										onClick={() => toggleFaq(0)}
									>
										<h3 className="text-base sm:text-lg md:text-xl font-medium">{t('whatIsYenumax')}</h3>
										<span className="text-xl sm:text-2xl">{openFaq === 0 ? '−' : '+'}</span>
									</div>
									{openFaq === 0 && (
										<div className="p-3 sm:p-5 pt-0 sm:pt-0 text-sm sm:text-base text-gray-300 border-t border-gray-700 faq-content-enter">
											<p>{t('whatIsYenumaxAnswer1')}</p>
											<p className="mt-2">{t('whatIsYenumaxAnswer2')}</p>
										</div>
									)}
								</div>
								
								<div className="bg-gray-800 hover:bg-gray-700 transition-colors duration-300 cursor-pointer mb-4">
									<div 
										className="flex justify-between items-center p-3 sm:p-5"
										onClick={() => toggleFaq(1)}
									>
										<h3 className="text-base sm:text-lg md:text-xl font-medium">{t('howMuchCost')}</h3>
										<span className="text-xl sm:text-2xl">{openFaq === 1 ? '−' : '+'}</span>
									</div>
									{openFaq === 1 && (
										<div className="p-3 sm:p-5 pt-0 sm:pt-0 text-sm sm:text-base text-gray-300 border-t border-gray-700 faq-content-enter">
											<p>{t('howMuchCostAnswer')}</p>
										</div>
									)}
								</div>
							</div>
							
							{/* FAQ right column */}
							<div>
								<div className="bg-gray-800 hover:bg-gray-700 transition-colors duration-300 cursor-pointer mb-4">
									<div 
										className="flex justify-between items-center p-3 sm:p-5"
										onClick={() => toggleFaq(2)}
									>
										<h3 className="text-base sm:text-lg md:text-xl font-medium">{t('whereCanIWatch')}</h3>
										<span className="text-xl sm:text-2xl">{openFaq === 2 ? '−' : '+'}</span>
									</div>
									{openFaq === 2 && (
										<div className="p-3 sm:p-5 pt-0 sm:pt-0 text-sm sm:text-base text-gray-300 border-t border-gray-700 faq-content-enter">
											<p>{t('whereCanIWatchAnswer1')}</p>
											<p className="mt-2">{t('whereCanIWatchAnswer2')}</p>
										</div>
									)}
								</div>
								
								<div className="bg-gray-800 hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
									<div 
										className="flex justify-between items-center p-3 sm:p-5"
										onClick={() => toggleFaq(3)}
									>
										<h3 className="text-base sm:text-lg md:text-xl font-medium">{t('howToCancel')}</h3>
										<span className="text-xl sm:text-2xl">{openFaq === 3 ? '−' : '+'}</span>
									</div>
									{openFaq === 3 && (
										<div className="p-3 sm:p-5 pt-0 sm:pt-0 text-sm sm:text-base text-gray-300 border-t border-gray-700 faq-content-enter">
											<p>{t('howToCancelAnswer')}</p>
										</div>
									)}
								</div>
							</div>
						</div>
						
						{/* Sign up section with icon */}
						<div className="bg-gray-900/50 border border-gray-800 rounded-lg p-5 sm:p-8 text-center">
							<div className="flex justify-center mb-3 sm:mb-4">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-12 sm:w-12 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
									<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
								</svg>
							</div>
							<p className="text-lg sm:text-xl mb-4 sm:mb-6">{t('readyToWatch')}</p>
							
							<form className="w-full max-w-md mx-auto" onSubmit={handleGetStarted}>
								<button 
									type="submit"
									className="w-full py-4 px-8 cursor-pointer relative bg-gradient-to-r from-[#a923c5] via-[#10cddb] to-[#a923c5] bg-[length:200%_100%] hover:bg-[length:200%_100%] bg-left hover:bg-right rounded-md flex items-center justify-center font-bold text-xl transition-all duration-700 ease-in-out transform hover:scale-[1.02]"
								>
									{t('finishSignUp')}
								</button>
							</form>
						</div>
					</div>
				</div>
				
				{/* Footer */}
				<div className="border-t border-gray-800 py-8 sm:py-12 px-4 sm:px-6 bg-black">					
					<div className="max-w-6xl mx-auto">
						<div className="flex flex-col md:flex-row justify-between items-center mb-6 sm:mb-8">
							<div className="text-emerald-50 font-bold text-xl sm:text-2xl mb-4 md:mb-0">
								<img src="/im.png" className="main_img" />
							</div>
							<LanguageSwitch showFullNames={true} />
						</div>
						
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500">
							<div>
								<ul className="space-y-2 sm:space-y-3">
									<li><a href="#" className="hover:underline">{t('faq')}</a></li>
									<li><a href="#" className="hover:underline">{t('investorRelations')}</a></li>
									<li><a href="#" className="hover:underline">{t('privacy')}</a></li>
									<li><a href="#" className="hover:underline">{t('speedTest')}</a></li>
								</ul>
							</div>
							<div>
								<ul className="space-y-2 sm:space-y-3">
									<li><a href="#" className="hover:underline">{t('helpCenter')}</a></li>
									<li><a href="#" className="hover:underline">{t('jobs')}</a></li>
									<li><a href="#" className="hover:underline">{t('cookiePreferences')}</a></li>
									<li><a href="#" className="hover:underline">{t('legalNotices')}</a></li>
								</ul>
							</div>
							<div>
								<ul className="space-y-2 sm:space-y-3">
									<li><a href="#" className="hover:underline">{t('account')}</a></li>
									<li><a href="#" className="hover:underline">{t('waysToWatch')}</a></li>
									<li><a href="#" className="hover:underline">{t('corporateInfo')}</a></li>
									<li><a href="#" className="hover:underline">{t('onlyOn')}</a></li>
								</ul>
							</div>
							<div>
								<ul className="space-y-2 sm:space-y-3">
									<li><a href="#" className="hover:underline">{t('mediaCenter')}</a></li>
									<li><a href="#" className="hover:underline">{t('termsOfUse')}</a></li>
									<li><a href="#" className="hover:underline">{t('contactUs')}</a></li>
								</ul>
							</div>
					  </div>

						<p className="text-gray-600 mt-6 text-xs sm:text-sm">
							{t('questions')}
						</p>
						<p className="text-gray-600 mt-1 text-xs sm:text-sm">
							{t('country')}
						</p>
					</div>
					  </div>

				{/* Error Messages */}
				{errMsg && (
					<div 
						ref={errRef} 
						className="fixed top-4 left-4 right-4 sm:left-auto sm:right-auto sm:mx-auto sm:max-w-md p-3 sm:p-4 text-center text-sm sm:text-base border border-emerald-800 text-emerald-200 bg-black/90 rounded-md shadow-lg z-50"
						aria-live="assertive"
					>
						{errMsg}
					  </div>
				)}
			</div>

				{/* Add CSS for the scrolling animation and responsiveness in JSX */}
				<style jsx="true">{`
					@keyframes scroll {
						0% {
							transform: translateX(0);
						}
						100% {
							transform: translateX(calc(-200px * 6 - 16px * 6)); /* Width of items plus margin */
						}
					}
					
					@keyframes scrollSlow {
						0% {
							transform: translateX(0);
						}
						100% {
							transform: translateX(calc(-200px * 6 - 16px * 6)); /* Width of items plus margin */
						}
					}
					
					.animate-scroll {
						animation: scroll 60s linear infinite;
					}
					
					.animate-scroll-slow {
						animation: scrollSlow 80s linear infinite;
					}
					
					.animate-scroll-medium {
						animation: scroll 40s linear infinite;
					}
					
					.carousel-track:hover {
						animation-play-state: paused;
					}
					
					@media (max-width: 639px) {
						@keyframes scroll {
							0% {
								transform: translateX(0);
							}
							100% {
								transform: translateX(calc(-120px * 6 - 8px * 6)); /* Mobile width */
							}
						}
						
						@keyframes scrollSlow {
							0% {
								transform: translateX(0);
							}
							100% {
								transform: translateX(calc(-120px * 6 - 8px * 6)); /* Mobile width */
							}
						}
					}
					
					@media (min-width: 640px) and (max-width: 767px) {
						@keyframes scroll {
							0% {
								transform: translateX(0);
							}
							100% {
								transform: translateX(calc(-150px * 6 - 12px * 6)); /* Small tablet width */
							}
						}
						
						@keyframes scrollSlow {
							0% {
								transform: translateX(0);
							}
							100% {
								transform: translateX(calc(-150px * 6 - 12px * 6)); /* Small tablet width */
							}
						}
					}
					
					@media (min-width: 768px) and (max-width: 1023px) {
						@keyframes scroll {
							0% {
								transform: translateX(0);
							}
							100% {
								transform: translateX(calc(-180px * 6 - 16px * 6)); /* Tablet width */
							}
						}
						
						@keyframes scrollSlow {
							0% {
								transform: translateX(0);
							}
							100% {
								transform: translateX(calc(-180px * 6 - 16px * 6)); /* Tablet width */
							}
						}
					}

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

export default Index;
