import React from 'react';
import Layout from '~/components/layout';
import PageTitle from '~/components/page-title';
import { TypographyH2 } from '~/components/ui/typography';
import { SIDEBAR_MENU } from '~/lib/sidebar-menu';

export default function Home() {
    return (
        <Layout>
            <div className="flex-1 flex space-y-5 flex-col">
                <PageTitle title={SIDEBAR_MENU[0].title} icon={React.createElement(SIDEBAR_MENU[0].icon)} />
                <TypographyH2>Welcome</TypographyH2>
            </div>
        </Layout>
    );
}
