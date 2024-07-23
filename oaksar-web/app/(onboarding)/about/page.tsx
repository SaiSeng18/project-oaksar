const AboutPage = () => {
	return (
		<section className="w-full flex justify-center flex-1 pt-10">
			<div className="max-w-3xl w-full flex-col">
				<h1 className="text-[48px] text-dark font-bold leading-[1]">About</h1>
				<p className=" text-gray-1 text-[32px]">
					How we started the idea of Oaksar.
				</p>
				<div className="divider-x"></div>

				<article>
					<div className="mb-10 space-y-2">
						<h2 className="font-bold">
							Efficient Inventory Management for Mid-Sized Businesses
						</h2>
						<p className="text-gray-1">
							Many mid-sized businesses struggle with managing their inventory
							effectively due to the lack of a streamlined, specialized system.
							Traditional inventory systems often come bundled with sales and purchase
							functionalities, which can be overwhelming and unnecessary for businesses
							that need a focused solution. This leads to inefficiencies, stockouts,
							overstocking, and ultimately, lost revenue.{" "}
						</p>
					</div>

					<p className="text-gray-1">
						Develop an inventory management system tailored to the needs of mid-sized
						businesses, focusing solely on inventory control and management. This
						system will provide real-time inventory tracking, alerts for critical
						inventory levels, detailed reporting, and multi-location management. By
						excluding sales and purchase functionalities, the system will be simple to
						use, cost-effective, and highly efficient, enabling businesses to maintain
						optimal inventory levels, reduce waste, and improve overall operational
						efficiency.
					</p>
				</article>
			</div>
		</section>
	);
};
export default AboutPage;
