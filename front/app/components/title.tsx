import React from 'react';
import { TypographyP } from './ui/typography';

const Title = ({ children }: { children?: React.ReactNode }) => {
    return (
        <div className="bg-secondary w-fit p-1">
            <TypographyP className="uppercase">{children}</TypographyP>
        </div>
    );
};

export default Title;
