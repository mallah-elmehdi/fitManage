import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import React from 'react';
import Layout from '~/components/layout';
import PageTitle from '~/components/page-title';
import Title from '~/components/title';
import { Separator } from '~/components/ui/separator';
import { SIDEBAR_MENU } from '~/lib/sidebar-menu';
import DbJsonSetup from './db-json-setup';

const MuscleImbalance = () => {
    return (
        <Layout>
            <div className="flex-1 flex space-y-5 flex-col">
                <PageTitle title={SIDEBAR_MENU[4].title} icon={React.createElement(SIDEBAR_MENU[4].icon)} />

                {/* ------------------------------ DB INIT */}
                <Collapsible defaultOpen className="flex gap-3 flex-col">
                    <CollapsibleTrigger>
                        <Title>MUSCLE IMBALANCES LIST</Title>
                    </CollapsibleTrigger>
                    <CollapsibleContent></CollapsibleContent>
                </Collapsible>
                <Separator />

                {/* ------------------------------ DB INIT */}
                <Collapsible className="flex gap-3 flex-col">
                    <CollapsibleTrigger>
                        <Title>DB JSON SETUP</Title>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <DbJsonSetup />
                    </CollapsibleContent>
                </Collapsible>
                <Separator />
            </div>
        </Layout>
    );
};

export default MuscleImbalance;
