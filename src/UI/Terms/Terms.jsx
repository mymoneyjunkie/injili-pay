import { Layout, Outer } from '../../components';

const Terms = () => {
	return (
		<Layout>
			<Outer className="h-auto">
				<div className="text-black md:col-span-3 border-0"></div>
				<div className="text-black md:col-span-6 bg-white flex flex-col gap-3 lg:gap-5 justify-start border-0 pt-5">
					<p className="text-4xl">Terms of Service</p>

					<p><strong>Effective Date:</strong> [Insert Date]</p>

					<p className="text-lg font-semibold">
						By using our website and Fitness Video App, you agree to the following terms:
					</p>

					<ul className="list-disc list-inside space-y-2 ml-2 text-base">
						<li>You must be at least 18 years old to use our services.</li>

						<li>All purchases are processed through Stripe. Refunds are subject to our policy.</li>

						<li>You are responsible for maintaining the confidentiality of your account.</li>

						<li>Unauthorized use of our services may result in account termination.</li>

						<li>Content is for informational and fitness purposes only and is not medical advice.</li>
					</ul>

					<p className="text-lg font-semibold">
						We reserve the right to update these Terms. Continued use means you accept any changes.
					</p>
				</div>
				<div className="text-black md:col-span-3 border-0"></div>

				<div className="col-span-12 h-30"></div>
			</Outer>
		</Layout>
	)
}

export default Terms;