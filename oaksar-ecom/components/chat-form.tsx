'use client';

import { useState } from 'react';
import { useActions, useUIState } from 'ai/rsc';
import { ArrowRightToLine, Sparkles, User } from 'lucide-react';
import { nanoid } from 'nanoid';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import { ClientMessage, continueConversation } from '@/app/(home)/ai-chat/action';
import { Button } from '@/components/ui/button';

import EmptyScreen from './empty-screen';
import { MemoizedReactMarkdown } from './markdown';
import { ScrollArea } from './ui/scroll-area';

const ChatForm = () => {
    const [input, setInput] = useState<string>('');
    const [conversation, setConversation] = useUIState();
    const { continueConversation } = useActions();

    console.log();

    return (
        <div className='mx-auto my-[100px] flex max-w-[600px] flex-col gap-5'>
            {conversation.length === 0 ? (
                <EmptyScreen />
            ) : (
                <ScrollArea className='h-[500px] w-full overflow-hidden'>
                    {conversation.map((message: ClientMessage) => (
                        <div className='mb-5 flex w-full gap-2' key={message.id}>
                            <div className='flex size-[40px] shrink-0 items-center justify-center rounded-md bg-zinc-100'>
                                {message.role === 'assistant' ? <Sparkles /> : <User />}
                            </div>
                            {/* <MemoizedReactMarkdown
                                    className='prose prose-p:leading-relaxed prose-pre:p-0 break-words'
                                    remarkPlugins={[remarkGfm, remarkMath]}>
                                    {message.display as string}
                                </MemoizedReactMarkdown> */}
                            <div className='w-full'>
                                {message.display}
                                {message.attachments}
                            </div>
                        </div>
                    ))}
                </ScrollArea>
            )}

            <form
                onSubmit={async e => {
                    e.preventDefault();
                    setInput('');
                    setConversation((currentConversation: ClientMessage[]) => [
                        ...currentConversation,
                        { id: nanoid(), role: 'user', display: input },
                    ]);

                    const message = await continueConversation(input);

                    setConversation((currentConversation: ClientMessage[]) => [
                        ...currentConversation,
                        message,
                    ]);
                }}>
                <div className='flex w-full items-center gap-2'>
                    <input
                        type='text'
                        value={input}
                        className='min-h-[60px] w-full resize-none rounded-full bg-zinc-100 px-4 py-[1.3rem] placeholder:text-zinc-900 focus-within:outline-none sm:text-sm'
                        onChange={event => {
                            setInput(event.target.value);
                        }}
                    />
                    <button
                        type='submit'
                        // size='icon'
                        disabled={input === ''}
                        className='flex aspect-square min-h-[60px] items-center justify-center rounded-full bg-zinc-100 text-zinc-950 shadow-none hover:bg-zinc-200'>
                        <ArrowRightToLine />
                        <span className='sr-only'>Send message</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChatForm;
