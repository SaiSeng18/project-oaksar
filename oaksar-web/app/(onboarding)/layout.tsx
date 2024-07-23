import Image from "next/image";
import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="flex min-h-screen flex-col items-center px-10 md:px-5 justify-between">
			<div className="w-full flex items-center justify-between py-5 max-w-[1440px]">
				<div className="flex-1 flex justify-start">
					<Link href="/">
						<Image src="/icons/oaksar-light.svg" alt="logo" width={75} height={75} />
					</Link>
				</div>

				<nav className="flex-1 flex justify-center md:hidden">
					<ul className="flex items-center gap-5">
						<li>
							<Link href="/features" className="text-gray-1/80 hover:text-gray-1">
								Features
							</Link>
						</li>
						<li>
							<Link href="/about" className="text-gray-1/80 hover:text-gray-1">
								About
							</Link>
						</li>
						<li>
							<Link href="/members" className="text-gray-1/80 hover:text-gray-1">
								Members
							</Link>
						</li>
					</ul>
				</nav>

				<div className="flex-1 flex justify-end">
					<Link
						href="/dashboard"
						className="px-5 py-3 rounded-md bg-black text-white hover:bg-black/90 text-sm ">
						Get Started
					</Link>
				</div>
			</div>
			{children}

			<div className="flex w-full max-w-[1440px] items-center justify-between text-sm pt-20 pb-5 flex-wrap md:text-center md:justify-center">
				<div>
					Build by the <span className="font-bold">S.Y.M.K Team</span> with passion.
					All rights reserved.
				</div>

				<div>
					Special thanks to{" "}
					<a
						href="https://www.samsung.com/mm/"
						target="_blank"
						className="font-bold">
						Samsung
					</a>
				</div>
			</div>
		</main>
	);
};
export default Layout;
