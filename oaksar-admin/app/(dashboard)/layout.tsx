import SideNav from '@/components/side-nav';
import { ScrollArea } from '@/components/ui/scroll-area';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex h-screen w-full shrink-0'>
            <SideNav />
            <div className='flex-1'>
                <ScrollArea className='h-full w-full'> {children}</ScrollArea>
            </div>
        </div>
    );
};
export default DashboardLayout;
