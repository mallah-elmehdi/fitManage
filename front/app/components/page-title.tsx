import React from 'react';
import { Avatar, AvatarFallback } from '~/components/ui/avatar';
import { TypographyH1 } from '~/components/ui/typography';
import { SIDEBAR_MENU } from '~/lib/sidebar-menu';
import { Separator } from './ui/separator';

type PageTitleType = {
    icon: React.ReactNode;
    title: string;
};

const PageTitle = ({ icon, title }: PageTitleType) => {
    return (
        <div className="space-y-5">
            <Separator />
            <div className="flex items-center space-x-3 h-fit">
                <Avatar className="size-10">
                    <AvatarFallback>{icon}</AvatarFallback>
                </Avatar>
                <TypographyH1>{title}</TypographyH1>
            </div>
            <Separator />
        </div>
    );
};

export default PageTitle;
