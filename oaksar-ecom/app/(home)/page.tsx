import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default async function Home() {
    return (
        <main className='container flex flex-col items-center justify-between p-5'>
            <section className='mb-20 flex h-[500px] w-full items-center justify-between rounded-lg bg-gray-200 p-20'>
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

            <section className='w-full'>
                <div className='text-center text-3xl'>Featured Products</div>
            </section>
        </main>
    );
}
