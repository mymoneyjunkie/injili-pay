import { Link } from 'react-router-dom';
import useTranslation from "../../hooks/useTranslation";

const Footer = () => {
	const { t } = useTranslation();

	return (
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
	);
};

export default Footer;