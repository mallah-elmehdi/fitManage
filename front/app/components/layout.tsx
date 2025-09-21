import { AppSidebar } from '~/components/app-sidebar';
import { Separator } from '~/components/ui/separator';
import { SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar';
import { Toaster } from 'sonner';
import { useAppSelector } from '~/hooks/use-redux';
import Loader from './loader';

const Layout = ({ children }: { children: React.ReactNode }) => {
    const { is_loading } = useAppSelector((state) => state.loader);

    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
                {is_loading && <Loader />}
                <div className="flex flex-col space-y-5 p-4">
                    <SidebarTrigger variant="ghost" />
                    {children}
                </div>
                <Toaster position="top-right" />
            </main>
        </SidebarProvider>
    );
};

export default Layout;
