import { ForwardRefExoticComponent, ReactElement, RefAttributes } from 'react';
import { LucideProps } from 'lucide-react';

const ChartCard = ({
    title,
    icon: Icon,
    children,
}: {
    title: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
    children?: React.ReactNode;
}) => {
    return (
        <div className='flex aspect-video flex-col gap-5 rounded-md border p-5'>
            <div className='flex items-center justify-between'>
                <div className='text-2xl font-medium'>{title}</div>
                <div className='rounded-full bg-cyan/10 p-2'>
                    <Icon size={30} className='text-cyan' />
                </div>

                {/* <Banknote /> */}
            </div>
            {children}
        </div>
    );
};
export default ChartCard;
