import SideNav from '@/components/side-nav';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex h-screen w-full shrink-0'>
            <SideNav />
            {children}
        </div>
    );
};
export default DashboardLayout;
