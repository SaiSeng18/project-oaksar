import Chat from '@/components/ai-chat/chat';

const DashboardPage = () => {
    return (
        <div className='p-5'>
            <div className='flex w-full items-center justify-between'>
                <div className='text-[48px]'>INVENTORY</div>

                <div className='rounded-full bg-black/5 p-2'>
                    <div className='rounded-full bg-gray-200 px-5 py-3'>Months</div>
                </div>
            </div>
            <Chat />
        </div>
    );
};
export default DashboardPage;
