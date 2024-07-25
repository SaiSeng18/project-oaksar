import Image from 'next/image';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

const NavItem = () => {
    return (
        <Accordion type='single' collapsible>
            <AccordionItem value='item-1'>
                <AccordionTrigger className='rounded-md px-5 hover:bg-dark/5'>
                    <div className='flex gap-5'>
                        <Image src='/icons/oaksar-light.svg' alt='Logo' width={30} height={30} />
                        Dashboard
                    </div>
                </AccordionTrigger>
                <AccordionContent className='pl-10'>Home</AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};
export default NavItem;
