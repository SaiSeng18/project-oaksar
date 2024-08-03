import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
    return (
        <div className='flex w-full max-w-[1440px] items-center justify-between py-5'>
            <Link href='/'>
                <Image src='/icons/oaksar-light.svg' alt='logo' width={75} height={75} />
            </Link>

            <Link
                href='/overview'
                className='rounded-md bg-dark px-5 py-3 text-sm text-white hover:bg-dark/90'>
                Get Started
            </Link>
        </div>
    );
};
export default Header;
