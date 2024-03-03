'use client';

import { ReactNode } from 'react';

interface SectionWrapperProps {
    children?: ReactNode;
    Test2?: Element;
}

const SectionWrapper = (props: SectionWrapperProps) => {
    return <div className="mt-30">{props.children}</div>;
};

export default SectionWrapper;
