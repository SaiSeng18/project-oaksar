import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
	return (
		<div className="flex justify-center items-center flex-col w-full h-screen">
			<Image src="/icons/oaksar-light.svg" alt="icon" width={200} height={200} />
			<div className="max-w-[300px] text-center text-gray-1 text-sm">
				Oppsie, the page you are currently looking for is not found
			</div>
			<div>
				Please go back to{" "}
				<Link href="/" className="font-bold underline">
					Home page
				</Link>
			</div>
		</div>
	);
};
export default NotFound;
