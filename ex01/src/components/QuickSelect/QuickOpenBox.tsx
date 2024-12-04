import React, { FC, useState } from "react";
import QuickButton from "./QuickButton";
import styled from "styled-components";

interface QueryBoxProps {
    $show: boolean;
    children: React.ReactNode;
}

const QueryBox = styled.div<QueryBoxProps>`
    background: rgba(255, 255, 255, .5);
    display: ${props => props.$show ? "block" : "none"};
    width: 100%;
    height: 100%;
    position: fixed;
    top:0;
    left: 0;
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
    OperateComponent: React.FC
}

function QuickOpenBox<T extends string | number | boolean, K>({searchValue, onSearchResult, OperateComponent}: QuickOpenBoxProps<T, K>) {
    const [open, setOpen] = useState(false);

    function openQueryBox(isOpen: boolean) {
        setOpen(isOpen);
    }
    
    return (
        <>
            <QueryBox $show={open} onClick={(event: React.MouseEvent) => {
                if(event.target === event.currentTarget)
                    setOpen(false)
            }}>
                <OperateComponent />
                <QueryBoxClose title="關閉快速查詢" onClick={() => {setOpen(false);}} />
            </QueryBox>
            
            <QuickButton onClcikBtn={openQueryBox} />
        </>
    );
}

export default QuickOpenBox;