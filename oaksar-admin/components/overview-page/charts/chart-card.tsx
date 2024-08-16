import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

const ChartCard = ({
    title,
    description,
    footer,

    icon: Icon,
    children,
}: {
    title: string;
    description?: React.ReactNode;
    footer?: React.ReactNode;
    icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
    children?: React.ReactNode;
}) => {
    return (
        // <div className='flex max-h-[300px] flex-col gap-5 rounded-md border p-5 h-full relative'>
        //     <div className='flex items-center justify-between'>
        //         <div className='text-2xl font-medium'>{title}</div>
        //         <div className='rounded-full bg-cyan/10 p-2'>
        //             <Icon size={30} className='text-cyan' />
        //         </div>

        //         {/* <Banknote /> */}
        //     </div>
        //     {children}
        // </div>
        <Card>
            <CardHeader>
                <div className='flex items-center justify-between'>
                    <CardTitle>{title}</CardTitle>
                    <div className='rounded-full bg-cyan/10 p-2'>
                        <Icon size={30} className='text-cyan' />
                    </div>
                </div>

                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent>{children}</CardContent>
            {footer && (
                <CardFooter className='flex-col items-start gap-2 text-sm'>{footer}</CardFooter>
            )}
        </Card>
    );
};
export default ChartCard;
