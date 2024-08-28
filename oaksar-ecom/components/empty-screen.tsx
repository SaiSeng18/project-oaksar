import React from 'react';

const EmptyScreen = () => {
    return (
        <div className='flex h-[500px] max-w-[600px] flex-col items-center justify-between'>
            <div className=''>
                <div className='text-center text-2xl font-bold'>Welcome to Oaksar</div>
                <div className='text-center text-lg'>Ask me anything</div>
            </div>

            <div></div>
        </div>
    );
};

export default EmptyScreen;
