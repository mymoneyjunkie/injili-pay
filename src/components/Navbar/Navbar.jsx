import { useState } from 'react';
import { FaBars, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import { persistor } from '../../redux/store';
import { logoutUser } from "../../redux/user/user.actions";
import { LanguageSwitch } from '../index';
import useTranslation from "../../hooks/useTranslation";

const Navbar = ({ currentUser, logoutUser }) => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const navigate = useNavigate();
	const { t } = useTranslation();

	// Handle navigation
	const handleNavigation = (path) => {
		navigate(path);
		setMobileMenuOpen(false);
	};

	// Handle logout
	const handleLogout = () => {
		try {
			logoutUser();
			persistor.purge();
			navigate('/', { replace: true });
		} catch (error) {
			console.error("Error during logout:", error);
		}
	};

	return (
		<nav className="w-full fixed top-0 left-0 z-50 bg-black py-4 px-3 md:px-2 lg:px-4 md:px-12 border-b border-gray-800/50">
			<div className="flex items-center justify-evenly lg:justify-between border-0">
				{/* Mobile hamburger button - left side */}
				<button 
					className="md:hidden text-white p-1 cursor-pointer"
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
				>
					<FaBars size={20} />
				</button>

				{/* Brand name */}
				<Link to="/" className="text-emerald-50 font-bold text-xl sm:text-xl lg:text-3xl cursor-pointer flex-1 md:flex-none text-center md:text-left">
					<img src="/im.png" alt="Ijinili" border="0" className="main_img" />
				</Link>
				
				{/* Desktop Navigation - center */}
				<div className="hidden md:flex sm:space-x-1 md:space-x-4 lg:space-x-8 items-center flex-1 justify-center">
					<button 
						onClick={() => handleNavigation('/home')}
						className="text-[#d4af37] hover:text-white transition duration-300 text-lg font-medium cursor-pointer"
					>
						{t('home')}
					</button>
					<button 
						onClick={() => handleNavigation('/pricing')}
						className="text-[#d4af37] hover:text-white transition duration-300 text-lg font-medium cursor-pointer"
					>
						{t('pricing')}
					</button>
					<button 
						onClick={() => handleNavigation('/changelog')}
						className="text-[#d4af37] hover:text-white transition duration-300 text-lg font-medium cursor-pointer"
					>
						{t('changelog')}
					</button>
					<button 
						onClick={() => handleNavigation('/billing')}
						className="text-[#d4af37] hover:text-white transition duration-300 text-lg font-medium cursor-pointer"
					>
						{t('billing')}
					</button>
				</div>
				
				{/* Language Switch and Logout - right side */}
				<div className="flex items-center gap-5">
					{/* Desktop Language Switch - shows full names */}
					<div className="hidden md:block">
						<LanguageSwitch showFullNames={true} />
					</div>
					{/* Mobile Language Switch - shows abbreviations */}
					<div className="md:hidden">
						<LanguageSwitch showFullNames={false} />
					</div>
					{currentUser && (
						<button
							onClick={handleLogout}
							className="text-gray-300 hover:text-emerald-500 transition duration-300 flex items-center gap-2 cursor-pointer"
						>
							<FaSignOutAlt size={20} className="md:hidden" />
							<span className="hidden md:inline text-md font-bold">{t('logout')}</span>
						</button>
					)}
					{!currentUser && (
						<Link to="/login" className="text-white hover:text-gray-300 transition duration-300 text-lg font-medium cursor-pointer">
							{t('signIn')}
						</Link>
					)}
				</div>
			</div>
			
			{/* Mobile Menu Dropdown */}
			{mobileMenuOpen && (
				<div className="md:hidden bg-black/95 absolute left-0 right-0 top-full z-50 border-b border-gray-800">
					<div className="flex flex-col space-y-4 p-6">
						<button 
							onClick={() => handleNavigation('/home')}
							className="text-left text-[#d4af37] hover:text-white transition duration-300 text-lg font-medium cursor-pointer"
						>
							{t('home')}
						</button>
						<button 
							onClick={() => handleNavigation('/pricing')}
							className="text-left text-[#d4af37] hover:text-white transition duration-300 text-lg font-medium cursor-pointer"
						>
							{t('pricing')}
						</button>
						<button 
							onClick={() => handleNavigation('/changelog')}
							className="text-left text-[#d4af37] hover:text-white transition duration-300 text-lg font-medium cursor-pointer"
						>
							{t('changelog')}
						</button>
						<button 
							onClick={() => handleNavigation('/billing')}
							className="text-left text-[#d4af37] hover:text-white transition duration-300 text-lg font-medium cursor-pointer"
						>
							{t('billing')}
						</button>
					</div>
				</div>
			)}
		</nav>
	);
};

const mapStateToProps = state => ({
	currentUser: state.user.currentUser
});

export default connect(mapStateToProps, { logoutUser })(Navbar);