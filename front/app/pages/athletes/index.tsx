import React from 'react';
import Layout from '~/components/layout';
import PageTitle from '~/components/page-title';
import { SIDEBAR_MENU } from '~/lib/sidebar-menu';
import AthletesTable from './athletes_table';

const Athlete = () => {
    return (
        <Layout>
            <div className="flex-1 flex space-y-5 flex-col">
                <PageTitle title={SIDEBAR_MENU[2].title} icon={React.createElement(SIDEBAR_MENU[2].icon)} />
                <AthletesTable />
            </div>
        </Layout>
    );
};

export default Athlete;
