import { Layout, Outer } from '../../components';

const DMCA = () => {
	return (
		<Layout>
			<Outer className="h-auto">
				<div className="text-black md:col-span-3 border-0"></div>
				<div className="text-black md:col-span-6 bg-white flex flex-col gap-3 lg:gap-5 justify-start border-0 pt-5">
					<p className="text-4xl text-center mb-3">Digital Millennium Copyright Act</p>
					<p className="text-lg font-semibold">DMCA Takedown Notice</p>
				    <p className="text-base">
				        [Your Fitness App Name] respects the intellectual property rights of others and expects its users to do the same. 
				        It is our policy to respond to clear notices of alleged copyright infringement that comply with the Digital Millennium 
				        Copyright Act (DMCA).
				    </p>

				    <p className="text-lg font-semibold">How to File a DMCA Complaint</p>
				    <p className="text-base">
				        If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement and is accessible 
				        on this site, please notify our designated copyright agent with the following information:
				    </p>
				    <ul className="list-disc list-inside space-y-2 ml-2 text-base">
				        <li>Your name, address, phone number, and email address.</li>
				        <li>A description of the copyrighted work you claim has been infringed.</li>
				        <li>The exact URL or description of where the material you claim is infringing is located.</li>
				        <li>A statement that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law.</li>
				        <li>A statement, made under penalty of perjury, that the above information in your notice is accurate and that you are the copyright owner or authorized to act on the owner's behalf.</li>
				        <li>Your physical or electronic signature.</li>
				    </ul>

				    <p className="text-lg font-semibold">
				        You may send your DMCA takedown request to:
				    </p>
				    <p className="text-base">
				        <strong>Email:</strong> 
				        <a href="mailto:dmca@[yourdomain].com" target="_blank" className="underline text-blue-700 ml-2">
							dmca@[yourdomain].com
						</a><br />
				        <strong>Address:</strong> [Your Business Address]<br />
				        <strong>Phone:</strong> [Your Phone Number]
				    </p>

				    <p className="text-base font-semibold">
				        Please note that under Section 512(f) of the DMCA, any person who knowingly misrepresents that material or activity 
				        is infringing may be subject to liability.
				    </p>
				</div>
				<div className="text-black md:col-span-3 border-0"></div>

				<div className="col-span-12 h-30"></div>
			</Outer>
		</Layout>
	)
}

export default DMCA;