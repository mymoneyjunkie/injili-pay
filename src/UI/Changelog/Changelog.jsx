import { connect } from "react-redux";
import { FaCheck, FaTimes } from 'react-icons/fa';
import { Layout } from "../../components";
import useTranslation from "../../hooks/useTranslation";

const Changelog = () => {
	const { t } = useTranslation();

	return (
		<Layout>
			<div className="bg-background-primary min-h-screen w-full text-text-primary">
			{/* Background layer */}
			<div className="relative min-h-screen">
					<div className="absolute inset-0 bg-gradient-to-b from-gradient-from via-background-muted to-gradient-to"></div>

				{/* Main Content */}
				<div className="relative z-10 max-w-4xl mx-auto pt-24 pb-8 px-6 sm:px-8 md:px-10">
					<div className="bg-black/80 rounded-lg border border-gray-800/50 backdrop-blur-sm p-6 sm:p-8 md:p-10">
						<h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-white">{t('changelog')}</h1>

						<div className="space-y-8">
							<div className="border-l-4 border-emerald-500 pl-6 py-2">
								<p className="text-xl font-semibold text-white flex items-center justify-between">
									<span>{t('version')} 1.4.0</span>
									<span className="text-sm text-gray-400">{t('changelog140Date')}</span>
								</p>
								<ul className="mt-4 space-y-3 text-gray-300">
									<li className="flex items-start">
										<span className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
										<span>{t('changelog140Entry1')}</span>
									</li>
									<li className="flex items-start">
										<span className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
										<span>{t('changelog140Entry2')}</span>
									</li>
									<li className="flex items-start">
										<span className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
										<span>{t('changelog140Entry3')}</span>
									</li>
								</ul>
							</div>

							<div className="border-l-4 border-emerald-500 pl-6 py-2">
								<p className="text-xl font-semibold text-white flex items-center justify-between">
									<span>{t('version')} 1.3.2</span>
									<span className="text-sm text-gray-400">{t('changelog132Date')}</span>
								</p>
								<ul className="mt-4 space-y-3 text-gray-300">
									<li className="flex items-start">
										<span className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
										<span>{t('changelog132Entry1')}</span>
									</li>
									<li className="flex items-start">
										<span className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
										<span>{t('changelog132Entry2')}</span>
									</li>
								</ul>
							</div>

							<div className="border-l-4 border-emerald-500 pl-6 py-2">
								<p className="text-xl font-semibold text-white flex items-center justify-between">
									<span>{t('version')} 1.3.0</span>
									<span className="text-sm text-gray-400">{t('changelog130Date')}</span>
								</p>
								<ul className="mt-4 space-y-3 text-gray-300">
									<li className="flex items-start">
										<span className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
										<span>{t('changelog130Entry1')}</span>
									</li>
									<li className="flex items-start">
										<span className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
										<span>{t('changelog130Entry2')}</span>
									</li>
								</ul>
							</div>

							<div className="border-l-4 border-emerald-500 pl-6 py-2">
								<p className="text-xl font-semibold text-white flex items-center justify-between">
									<span>{t('version')} 1.0.0</span>
									<span className="text-sm text-gray-400">{t('changelog100Date')}</span>
								</p>
								<ul className="mt-4 space-y-3 text-gray-300">
									<li className="flex items-start">
										<span className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
										<span>{t('changelog100Entry1')}</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default connect(null, null)(Changelog);