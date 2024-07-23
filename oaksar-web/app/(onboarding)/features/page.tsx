const FeaturesPage = () => {
	const features = [
		{
			image: "/icons/nextjs.svg",
			title: "Next.js 14",
			description:
				"Next js is used for app dir, Routing, Layouts, Loading UI and API routes.",
		},
		{
			image: "/icons/nextjs.svg",
			title: "Next.js 14",
			description:
				"Next js is used for app dir, Routing, Layouts, Loading UI and API routes.",
		},
		{
			image: "/icons/nextjs.svg",
			title: "Next.js 14",
			description:
				"Next js is used for app dir, Routing, Layouts, Loading UI and API routes.",
		},
		{
			image: "/icons/nextjs.svg",
			title: "Next.js 14",
			description:
				"Next js is used for app dir, Routing, Layouts, Loading UI and API routes.",
		},
		{
			image: "/icons/nextjs.svg",
			title: "Next.js 14",
			description:
				"Next js is used for app dir, Routing, Layouts, Loading UI and API routes.",
		},
		{
			image: "/icons/nextjs.svg",
			title: "Next.js 14",
			description:
				"Next js is used for app dir, Routing, Layouts, Loading UI and API routes.",
		},
	];

	return (
		<section className="w-full flex justify-center items-center py-10">
			<div className="max-w-[1440px] p-5 rounded-md bg-gray-1/5 w-full flex justify-center flex-col items-center">
				<div className="flex flex-col items-center mb-10">
					<h2 className="text-[48px] font-bold">Features</h2>
					<p className="max-w-[600px] text-center text-sm text-gray-1">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit dolorum
						ratione amet asperiores voluptates consectetur debitis obcaecati,{" "}
					</p>
				</div>
				<div className="grid grid-cols-3 gap-5 lg:grid-cols-2 sm:grid-cols-1 max-w-[1040px]">
					{features.map((feature) => (
						<div
							className="rounded-lg bg-white border border-gray-300 p-8 flex flex-col gap-2 justify-start sm:p-5"
							key={feature.title}>
							<div className="size-[75px] shrink-0 bg-gray-300"></div>
							<h3 className="text-dark font-bold text-sm">{feature.title}</h3>
							<div className="text-gray-1 text-sm">{feature.description}</div>
						</div>
					))}
				</div>

				<div className="text-gray-1 text-md max-w-[600px] text-center mt-10">
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus hic
				</div>
			</div>
		</section>
	);
};
export default FeaturesPage;
