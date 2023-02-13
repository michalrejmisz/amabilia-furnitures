import React from 'react';
import { useViewportSize } from '@mantine/hooks';
import Link from "next/link";

interface Props {
    to: string;
    openModal: () => void;
}

export const ConditionalModal: React.FC<Props> = ({ to, openModal, children }) => {
    const {width} = useViewportSize();

    const handleClick = (event: React.MouseEvent) => {
        event.preventDefault();
        openModal();
    };

    return width > 768 ? (
        <a href="#" onClick={handleClick} style={{height: '100%'}}>
            {children}
        </a>
    ) : (
        <Link href={{ pathname: `/product/${to}` }}><a style={{height: '100%'}}>{children}</a></Link>
    );
};