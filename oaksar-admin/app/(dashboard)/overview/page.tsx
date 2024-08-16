import Analytics from '@/components/overview-page/analytics';
import { db } from '@/db';

const DashboardPage = async () => {
    // const { text } = await generateText({
    //     model: openai('gpt-4o'),
    //     prompt: `
    // 		what do you see in this link.
    // 		https://i.pinimg.com/736x/cd/47/9e/cd479e8dbd856aa6585bc5dbc07adf4c.jpg
    // 	`,
    // });
    // const data: ProductSelect[] = await db.select().from(product);
    const productData = await db.query.product.findMany({
        with: { category: true },
    });
    const categoryData = await db.query.category.findMany({
        with: { products: true },
    });

    return (
        <section className='px-10 py-5 2xl:px-5'>
            <div className='mb-20 flex w-full items-center justify-between'>
                <div className='text-5xl'>Overview</div>
            </div>

            <Analytics />
        </section>
    );
};
export default DashboardPage;
