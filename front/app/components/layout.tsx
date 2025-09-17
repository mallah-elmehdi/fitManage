import { AppSidebar } from '~/components/app-sidebar';
import { Separator } from '~/components/ui/separator';
import { SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar';
import { Toaster } from 'sonner';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
                <div className="flex flex-col space-y-5 p-4">
                    <SidebarTrigger variant="ghost" />
                    {children}
                </div>
                <Toaster />
            </main>
        </SidebarProvider>
    );
};

export default Layout;
