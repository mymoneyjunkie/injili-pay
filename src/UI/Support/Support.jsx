import { Layout, Outer } from '../../components';

const Support = () => {
	return (
		<Layout>
			<Outer className="h-auto">
				<div className="text-black md:col-span-3 border-0"></div>
				<div className="text-black md:col-span-6 bg-white flex flex-col gap-3 lg:gap-3 justify-start border-0 pt-5">
					<p className="text-4xl text-center mb-3">Customer Support</p>

					<p className="text-md">We're here to help!</p>
					<p className="text-md"><strong>Email:</strong> 
						<a href="mailto:support@[yourdomain].com" target="_blank" className="underline text-blue-700 ml-2">
							support@[yourdomain].com
						</a>
					</p>
					<p className="text-md"><strong>Support Hours:</strong> Monday to Friday, 9 AM – 5 PM (Your Timezone)</p>

					<p className="text-md font-semibold">Common issues we assist with:</p>

					<ul className="list-disc list-inside space-y-2 ml-2 text-base">
						<li>Payment problems</li>

						<li>Access issues</li>

						<li>Technical errors</li>

						<li>Feedback and feature requests</li>
					</ul>
				</div>
				<div className="text-black md:col-span-3 border-0"></div>

				<div className="col-span-12 h-30"></div>
			</Outer>
		</Layout>
	)
}

export default Support;