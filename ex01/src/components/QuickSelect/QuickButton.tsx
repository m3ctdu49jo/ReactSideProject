import React, { useEffect, useState } from "react";
import styled from "styled-components";

const QuickSearchButton = styled.div`
    color: #666;
    font-size: .8rem;
    display: inline-block;
    background: #fff;
    padding: .5rem 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
        background: #eee;
    }
`;

interface QuickButtonProps {
    onClcikBtn: (result: boolean) => void;
}

export default function QuickButton({ onClcikBtn }: QuickButtonProps) {

    return <QuickSearchButton title="快速查詢" onClick={() => {onClcikBtn(true)}}>{"> >"}</QuickSearchButton>;
}