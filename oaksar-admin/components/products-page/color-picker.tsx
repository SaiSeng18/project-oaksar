'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ColorPicker = ({
    onChange,
    value,
}: {
    onChange: (value: string[]) => void;
    value: string[];
}) => {
    const [input, setInput] = useState('');

    const [colors, setColors] = useState<string[]>([]);

    const handleInput = () => {
        onChange([...value, input]);
        setInput('');
    };

    return (
        <div className='space-y-2'>
            <div className='flex gap-2'>
                {value.map((color, index) => (
                    <div
                        key={index}
                        className='flex items-center gap-2 rounded-md bg-dark px-4 py-2 text-white'>
                        {color}

                        <X
                            size={20}
                            className='cursor-pointer'
                            onClick={() => onChange(value.filter((_, i) => i !== index))}
                        />
                    </div>
                ))}
            </div>
            <div className='flex items-center gap-2'>
                <Input value={input} onChange={e => setInput(e.target.value)} />
                <Button onClick={handleInput} type='button'>
                    Add
                </Button>
            </div>
        </div>
    );
};
export default ColorPicker;
