import { Layout, Outer } from '../../components';

const EULA = () => {
	return (
		<Layout>
			<Outer className="h-auto">
				<div className="text-black md:col-span-3 border-0"></div>
				<div className="text-black md:col-span-6 bg-white flex flex-col gap-3 lg:gap-3 justify-start border-0 pt-5">
					<p className="text-4xl text-center mb-3">End User License Agreement</p>

					<p className="text-md font-semibold">This EULA is a legal agreement between you (the “User”) and [Your Company Name]. 
						By accessing or using the Fitness Video App (“App”), you agree to the following terms:
					</p>

					<ul className="list-disc list-inside space-y-2 ml-2 text-base">
						<li>The App and its content are licensed, not sold, to you.</li>

						<li>You may not reverse-engineer, copy, or redistribute the content without permission.</li>

						<li>You may use the App for personal, non-commercial fitness purposes.</li>

						<li>All payments are processed securely via Stripe.</li>

						<li>Your account may be suspended for abuse, fraud, or violation of this EULA.</li>
					</ul>

					<p className="font-semibold text-base">
						By using this App, you acknowledge that you have read, understood, and agree to be 
						bound by this agreement.
					</p>
				</div>
				<div className="text-black md:col-span-3 border-0"></div>

				<div className="col-span-12 h-30"></div>
			</Outer>
		</Layout>
	)
}

export default EULA;