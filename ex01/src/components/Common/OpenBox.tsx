import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface BoxContentProps {
    children: React.ReactNode;
}
interface BoxCoverProps {
    $show: boolean;
    children: React.ReactNode;
}
const BoxCover = styled.div<BoxCoverProps>`
    background: rgba(0, 0, 0, .15);
    /* display: ${props => props.$show ? "flex" : "none"};
    opacity: ${props => props.$show ? "1" : "0"}; */
    display: flex;
    visibility: ${props => props.$show ? "visible" : "hidden"};
    opacity: ${props => props.$show ? "1" : "0"};
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: .8rem 1rem;
    position: fixed;
    top:0;
    left: 0;
    transition: all .8s ease;
    
`;

const BoxContent = styled.div<BoxContentProps>`
display: inline-block;
    background: #f8f8f8;
    max-width: 80%;
    min-width: 1000px;
    height: 80%;
    padding: .8rem 1rem;
    border: 10px solid #fff;
    border-radius: 30px;
    overflow-y: auto;
    box-shadow: 0 10px 20px rgba(0, 0, 0, .2);    
`;

const BoxClose = styled.div`
    width: 50px;
    height: 50px;
    background: rgba(0, 0, 0, .2);
    border-radius: 50px;
    position: fixed;
    top: 20px;
    right: 30px;

    &:hover {
        background: rgba(0, 0, 0, .3);
        cursor: pointer;
    }

    &::before, &::after {
        content: "";
        display: block;
        background: #fff;
        width: 50%;
        height: 1px;
        margin: auto;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }
    &::before {
        transform: rotate(45deg);
    }
    &::after {
        transform: rotate(-45deg);
    }

`;

interface OpenBoxProps {
    open: boolean;
    onIsOpen?: (isOpen: boolean) => void;
    children: React.ReactNode;
}

function OpenBox({open, onIsOpen, children}: OpenBoxProps) {
    const [show, setShow] = useState(false);
    const coverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(coverRef.current && open){
            coverRef.current.style.opacity = "1";
        }
    }, [open]);
    useEffect(() => {
        if(onIsOpen)
            onIsOpen(show);
    }, [show]);

    useEffect(() => {
        setShow(open);
    }, [open]);
    
    return (
        <>
            <BoxCover $show={show} onClick={(event: React.MouseEvent) => {
                if(event.target === event.currentTarget)
                    setShow(false);
            }}>
                <BoxContent>
                    {children}
                    <BoxClose title="關閉視窗" onClick={() => {setShow(false)}} />
                </BoxContent>

            </BoxCover>
        </>
    );
}

export default OpenBox;