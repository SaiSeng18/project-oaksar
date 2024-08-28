import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default async function Home() {
    return (
        <main className='flex flex-col items-center justify-between'>
            <section className='mb-20 flex h-[500px] w-full items-center justify-between bg-gray-50 p-20'>
                <div className='flex flex-col gap-5'>
                    <div>
                        <h1 className='mb-2 text-3xl'>Welcome to the shop</h1>
                        <p className='max-w-[300px] text-gray-500'>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat dolores
                            repellendus totam velit laborum vel. Vel, maiores, sit necessitatibus
                            ipsum
                        </p>
                    </div>

                    <Link
                        href='/products'
                        className='flex w-[200px] items-center justify-center gap-2 rounded-md bg-gray-900 p-3 text-white hover:bg-gray-900/90'>
                        Shop
                    </Link>
                </div>

                <div className='relative aspect-square h-full overflow-hidden rounded-md bg-black'></div>
            </section>

            <section className='w-full p-5'>
                <div className='mb-10 text-center text-3xl'>Top Categories</div>

                <div className='grid w-full grid-cols-3 gap-5'>
                    <Link href='/products?category=t-shirt' className='w-full'>
                        <div className='relative mb-10 flex aspect-video w-full items-center justify-center overflow-hidden rounded-md bg-gray-200'>
                            ßT-shirt
                        </div>
                    </Link>
                    <Link href='/products?category=t-shirt' className='w-full'>
                        <div className='relative mb-10 flex aspect-video w-full items-center justify-center overflow-hidden rounded-md bg-gray-200'>
                            ßT-shirt
                        </div>
                    </Link>
                    <Link href='/products?category=t-shirt' className='w-full'>
                        <div className='relative mb-10 flex aspect-video w-full items-center justify-center overflow-hidden rounded-md bg-gray-200'>
                            ßT-shirt
                        </div>
                    </Link>
                </div>
            </section>

            <section className='w-full p-5'>
                <div className='mb-10 text-center text-3xl'>Featured Products</div>

                <div className='grid w-full grid-cols-4 gap-5'>
                    <div className='w-full'>
                        <div className='mb-10 aspect-square w-full overflow-hidden rounded-md bg-gray-200'></div>
                        <div className='flex items-center justify-between'>
                            <div>
                                <div>T Shirt</div>
                                <div className='text-gray-500'>2,500 MMK</div>
                            </div>
                            <Link
                                href='/products'
                                className='flex items-center justify-center gap-2 rounded-md bg-gray-900 p-3 px-10 text-white hover:bg-gray-900/90'>
                                Shop
                            </Link>
                        </div>
                    </div>
                    <div className='w-full'>
                        <div className='mb-10 aspect-square w-full overflow-hidden rounded-md bg-gray-200'></div>
                        <div className='flex items-center justify-between'>
                            <div>
                                <div>T Shirt</div>
                                <div className='text-gray-500'>2,500 MMK</div>
                            </div>
                            <Link
                                href='/products'
                                className='flex items-center justify-center gap-2 rounded-md bg-gray-900 p-3 px-10 text-white hover:bg-gray-900/90'>
                                Shop
                            </Link>
                        </div>
                    </div>
                    <div className='w-full'>
                        <div className='mb-10 aspect-square w-full overflow-hidden rounded-md bg-gray-200'></div>
                        <div className='flex items-center justify-between'>
                            <div>
                                <div>T Shirt</div>
                                <div className='text-gray-500'>2,500 MMK</div>
                            </div>
                            <Link
                                href='/products'
                                className='flex items-center justify-center gap-2 rounded-md bg-gray-900 p-3 px-10 text-white hover:bg-gray-900/90'>
                                Shop
                            </Link>
                        </div>
                    </div>
                    <div className='w-full'>
                        <div className='mb-10 aspect-square w-full overflow-hidden rounded-md bg-gray-200'></div>
                        <div className='flex items-center justify-between'>
                            <div>
                                <div>T Shirt</div>
                                <div className='text-gray-500'>2,500 MMK</div>
                            </div>
                            <Link
                                href='/products'
                                className='flex items-center justify-center gap-2 rounded-md bg-gray-900 p-3 px-10 text-white hover:bg-gray-900/90'>
                                Shop
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
