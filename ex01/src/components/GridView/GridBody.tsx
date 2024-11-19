import React from "react";
import style from "../../styles/style.module.css"
import styled from "styled-components";


const Column = ({colsNum}: ColumnProps) => styled.div`
    &:nth-child(${colsNum}n+1) {
    border-left-width: 1px;
}
`;
const ColumnNone = ({colsNum}: ColumnProps) => styled.div`
    color: #ccc;
    text-align: center;
    grid-column: span ${colsNum};
    border-left-width: 1px !important;
`;

interface ColumnProps {
    colsNum: number;
    children: React.ReactNode;
    className: string;
}


function GridBody<T>({colsName, colsId, dataItems}: {colsName: string[], colsId: [keyof T], dataItems: T[]}) {

    return (
        !dataItems || dataItems.length === 0
        ?
        <ColumnNone className={style.gridViewColumn} colsNum={colsName ? colsName.length : 1}>沒有資料</ColumnNone>
        :
        dataItems.map((item) => {
            return colsId?.map((colId, colIndex) => {
                let i = item[colId] as string;
                let k: string = i + colIndex;
                return <Column className={style.gridViewColumn} key={k} colsNum={colsName.length}>{i}</Column>
            })
        })
    );
}

export default GridBody;