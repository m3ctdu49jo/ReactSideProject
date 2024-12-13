import React, { FC, useEffect, useState } from "react";
import QuickButton from "./QuickButton";
import styled from "styled-components";

interface QueryBoxProps {
    children: React.ReactNode;
}
interface QueryBoxCoverProps {
    $show: boolean;
    children: React.ReactNode;
}
const QueryBoxCover = styled.div<QueryBoxCoverProps>`
    background: rgba(0, 0, 0, .15);
    display: ${props => props.$show ? "flex" : "none"};
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: .8rem 1rem;
    position: fixed;
    top:0;
    left: 0;
`;

const QueryBox = styled.div<QueryBoxProps>`
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

const QueryBoxClose = styled.div`
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

interface QuickOpenBoxProps<T extends string | number | boolean, K> {
    searchValue?: T; // 帶值或不帶值
    onSearchResult?: (result: K) => void;
    close: boolean;
    children: React.ReactNode;
    onOpenQueryBox: (isOpen: boolean) => void;
}

function QuickOpenBox<T extends string | number | boolean, K>({searchValue, onSearchResult, close, onOpenQueryBox, children}: QuickOpenBoxProps<T, K>) {
    const [open, setOpen] = useState(false);

    function openQueryBox(isOpen: boolean) {
        setOpen(isOpen);
        onOpenQueryBox(true);
    }
    useEffect(() => {
        if(close)
            setOpen(false);
    }, [close]);
    
    return (
        <>
            <QueryBoxCover $show={open}>
                <QueryBox onClick={(event: React.MouseEvent) => {
                    // if(event.target === event.currentTarget)
                    //     setOpen(false)
                }}>
                    {children}
                    <QueryBoxClose title="關閉快速查詢" onClick={() => {setOpen(false);}} />
                </QueryBox>

            </QueryBoxCover>
            
            <QuickButton onClcikBtn={openQueryBox} />
        </>
    );
}

export default QuickOpenBox;