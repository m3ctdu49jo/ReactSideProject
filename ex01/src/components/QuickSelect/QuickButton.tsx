import React, { useEffect, useState } from "react";
import styled from "styled-components";
import style from "../../styles/style.module.css"

const QuickSearchButton = styled.div`
    font-family: cursive;
    color: #fff;
    background: #4cafeb !important;
    margin: 0 .5rem;

    &:hover {
        background: #54bafa !important;
    }
`;

interface QuickButtonProps {
    onClcikBtn: (result: boolean) => void;
}

export default function QuickButton({ onClcikBtn }: QuickButtonProps) {

    return <QuickSearchButton className={style.btn} title="快速查詢" onClick={() => {onClcikBtn(true)}}>{"> >"}</QuickSearchButton>;
}