import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import React from 'react';
import Layout from '~/components/layout';
import PageTitle from '~/components/page-title';
import Title from '~/components/title';
import { Separator } from '~/components/ui/separator';
import { SIDEBAR_MENU } from '~/lib/sidebar-menu';
import DbJsonSetup from './db-json-setup';
import ExercisesList from './exercises-list';

const Exercises = () => {
    return (
        <Layout>
            <div className="flex-1 flex space-y-5 flex-col">
                <PageTitle title={SIDEBAR_MENU[3].title} icon={React.createElement(SIDEBAR_MENU[3].icon)} />

                {/* ------------------------------ DB INIT */}
                <Collapsible defaultOpen className="flex gap-3 flex-col">
                    <CollapsibleTrigger>
                        <Title>EXERCISES LIST</Title>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <ExercisesList />
                    </CollapsibleContent>
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

export default Exercises;
