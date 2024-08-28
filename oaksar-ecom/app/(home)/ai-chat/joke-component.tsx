'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { Joke } from './schema';

export const JokeComponent = ({ joke }: { joke?: Joke }) => {
    const [showPunchline, setShowPunchline] = useState(false);
    return (
        <div className='m-4 flex max-w-prose items-center justify-between rounded-md bg-neutral-100 p-4'>
            <p>{showPunchline ? joke?.punchline : joke?.setup}</p>
            <Button
                onClick={() => setShowPunchline(true)}
                disabled={showPunchline}
                variant='outline'>
                Show Punchline!
            </Button>
        </div>
    );
};
