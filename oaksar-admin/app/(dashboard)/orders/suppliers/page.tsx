import Link from 'next/link';
import { Plus } from 'lucide-react';

import { DataTable } from '@/components/data-table';
import { SupplierColumns } from '@/components/suppliers-page/data-table/column';
import { db } from '@/db';
import { SupplierType } from '@/db/schema';

export const revalidate = 0;

async function getData(): Promise<Partial<SupplierType>[]> {
    const data = await db.query.supplier.findMany();
    //  const data = [
    //   {
    //     "id": 1,
    //     "name": "Acme Supplies Co.",
    //     "phone": "+1-800-123-4567",
    //     "email": "info@acmesupplies.com",
    //     "description": "Leading supplier of office supplies and equipment.",
    //     "created_at": new Date("2024-08-21T12:34:56Z"),
    //     "updated_at": new Date("2024-08-21T12:34:56Z")
    //   },
    //   {
    //     "id": 2,
    //     "name": "Global Tech Parts",
    //     "phone": "+1-800-987-6543",
    //     "email": "sales@globaltechparts.com",
    //     "description": "Supplier of electronic components and tech accessories.",
    //     "created_at": new Date("2024-08-21T13:45:22Z"),
    //     "updated_at": new Date("2024-08-21T13:45:22Z")
    //   },
    //   {
    //     "id": 3,
    //     "name": "GreenEarth Products",
    //     "phone": "+44-20-7946-0958",
    //     "email": "contact@greenearthproducts.co.uk",
    //     "description": "Eco-friendly and sustainable packaging solutions.",
    //     "created_at": new Date("2024-08-21T14:12:33Z"),
    //     "updated_at": new Date("2024-08-21T14:12:33Z")
    //   },
    //   {
    //     "id": 4,
    //     "name": "MedSupply Corp",
    //     "phone": "+1-888-555-0199",
    //     "email": "support@medsupplycorp.com",
    //     "description": "Wholesale distributor of medical supplies and equipment.",
    //     "created_at": new Date("2024-08-21T15:27:14Z"),
    //     "updated_at": new Date("2024-08-21T15:27:14Z")
    //   },
    //   {
    //     "id": 5,
    //     "name": "BrightLights Lighting",
    //     "phone": "+1-800-222-1234",
    //     "email": "info@brightlights.com",
    //     "description": "Provider of innovative lighting solutions.",
    //     "created_at": new Date("2024-08-21T16:45:56Z"),
    //     "updated_at": new Date("2024-08-21T16:45:56Z")
    //   },
    //   {
    //     "id": 6,
    //     "name": "FoodEssentials Inc.",
    //     "phone": "+1-800-555-2020",
    //     "email": "orders@foodessentials.com",
    //     "description": "Specialist in bulk food ingredients and supplies.",
    //     "created_at": new Date("2024-08-21T17:30:44Z"),
    //     "updated_at": new Date("2024-08-21T17:30:44Z")
    //   },
    //   {
    //     "id": 7,
    //     "name": "CleanWave Solutions",
    //     "phone": "+1-800-333-7788",
    //     "email": "info@cleanwavesolutions.com",
    //     "description": "Cleaning and sanitation product supplier.",
    //     "created_at": new Date("2024-08-21T18:12:50Z"),
    //     "updated_at": new Date("2024-08-21T18:12:50Z")
    //   },
    //   {
    //     "id": 8,
    //     "name": "PrimeFurniture Ltd.",
    //     "phone": "+1-800-444-8899",
    //     "email": "sales@primefurniture.com",
    //     "description": "Manufacturer and supplier of high-quality furniture.",
    //     "created_at": new Date("2024-08-21T19:05:30Z"),
    //     "updated_at": new Date("2024-08-21T19:05:30Z")
    //   },
    //   {
    //     "id": 9,
    //     "name": "TechGear Distribution",
    //     "phone": "+1-800-555-6060",
    //     "email": "contact@techgeardistribution.com",
    //     "description": "Distributor of consumer electronics and gadgets.",
    //     "created_at": new Date("2024-08-21T20:11:42Z"),
    //     "updated_at": new Date("2024-08-21T20:11:42Z")
    //   },
    //   {
    //     "id": 10,
    //     "name": "HealthFirst Supplies",
    //     "phone": "+1-800-666-7777",
    //     "email": "orders@healthfirstsupplies.com",
    //     "description": "Supplier of health and wellness products.",
    //     "created_at": new Date("2024-08-21T21:23:15Z"),
    //     "updated_at": new Date("2024-08-21T21:23:15Z")
    //   }
    // ]

    return data;
}
const SuppliersPage = async () => {
    const data = await getData();

    return (
        <section className='flex min-h-screen w-full flex-col px-10 py-5 2xl:px-5'>
            <div className='mb-10 flex w-full items-center justify-between'>
                <div className='text-5xl'>Suppliers</div>

                <Link
                    href='/orders/suppliers/add'
                    className='flex items-center gap-2 rounded-md bg-dark px-4 py-2 text-light hover:bg-dark/90'>
                    Add
                    <Plus size={15} />
                </Link>
            </div>

            <div className='w-full'>
                {data.length < 1 ? (
                    <div className='flex h-40 flex-1 items-center justify-center'>
                        Start By Adding New Data
                    </div>
                ) : (
                    <DataTable columns={SupplierColumns} data={data} filterKey='name' />
                )}
            </div>
        </section>
    );
};
export default SuppliersPage;
