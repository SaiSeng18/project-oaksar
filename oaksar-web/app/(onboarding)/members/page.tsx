const MembersPage = () => {
	return (
		<section className="w-full max-w-3xl flex-1 pt-10">
			<div className="flex justify-center items-center flex-col mb-10">
				<h1 className="text-[48px] text-dark font-bold leading-[1]">Members</h1>
				<p className=" text-gray-1">Honorable mentions.</p>
			</div>

			<div className="w-full grid gap-10 grid-cols-2">
				<div className="w-full flex flex-col gap-2">
					<div className="rounded-lg bg-white border border-gray-300 justify-start aspect-video"></div>
					<h3 className="text-dark font-bold text-[24px]">Sai Seng</h3>
					<p className="text-sm text-gray-1">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
					</p>
				</div>
				<div className="w-full flex flex-col gap-2">
					<div className="rounded-lg bg-white border border-gray-300 justify-start aspect-video"></div>
					<h3 className="text-dark font-bold text-[24px]">Yan Naing Soe</h3>
					<p className="text-sm text-gray-1">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
					</p>
				</div>
				<div className="w-full flex flex-col gap-2">
					<div className="rounded-lg bg-white border border-gray-300 justify-start aspect-video"></div>
					<h3 className="text-dark font-bold text-[24px]">Myo Min Khant</h3>
					<p className="text-sm text-gray-1">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
					</p>
				</div>
				<div className="w-full flex flex-col gap-2">
					<div className="rounded-lg bg-white border border-gray-300 justify-start aspect-video"></div>
					<h3 className="text-dark font-bold text-[24px]">Khant Si Thu</h3>
					<p className="text-sm text-gray-1">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
					</p>
				</div>
			</div>
		</section>
	);
};
export default MembersPage;
