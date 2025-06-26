import { Layout, Outer } from '../../components';

const Privacy = () => {
	return (
		<Layout>
			<Outer className="h-auto">
				<div className="text-black md:col-span-3 border-0"></div>
				<div className="text-black md:col-span-6 bg-white flex flex-col gap-3 lg:gap-5 justify-start border-0 pt-5">
  					<p className="text-4xl text-center">Privacy Policy</p>
  					<p><strong>Effective Date:</strong> [Insert Date]</p>

  					<p>We value your privacy. This policy explains how we handle your data.</p>

  					<p className="text-2xl font-semibold">Data We Collect</p>
					<ul className="list-disc list-inside space-y-2 ml-2 text-base">
					    <li>
					      <strong>Personal info:</strong> name, email, payment info (via Stripe)
					    </li>
					    <li>
					      <strong>Usage data:</strong> app features used, session length, IP address
					    </li>
					</ul>

  					<p className="text-2xl font-semibold">How We Use Your Data</p>
  					<ul className="list-disc list-inside space-y-2 ml-2 text-base">
  					  <li>To provide and improve our services</li>
  					  <li>To process payments via Stripe</li>
  					  <li>To communicate with you (e.g., support, updates)</li>
  					</ul>

  					<p className="text-2xl font-semibold">Your Rights</p>
  					<ul className="list-disc list-inside space-y-2 ml-2 text-base">
  					  <li>Request access to your data</li>
  					  <li>Request deletion of your account</li>
  					  <li>Opt out of marketing emails</li>
  					</ul>

  					<p className="text-base space-y-2">
  						<strong className="text-lg mr-1">Third-Party Services </strong>
  						We use Stripe for secure payment processing. Your payment details are handled by Stripe and not stored on our servers.
  					</p>

  					<p className="text-lg font-semibold">For questions, contact: <a href="mailto:privacy@[yourdomain].com" target="_blank" className="underline text-blue-700">privacy@[yourdomain].com</a></p>
				</div>
				<div className="text-black md:col-span-3 border-0"></div>

				<div className="col-span-12 h-30"></div>
			</Outer>
		</Layout>
	)
}

export default Privacy;