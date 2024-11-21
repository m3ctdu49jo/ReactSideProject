import React from "react";
import style from "../../styles/style.module.css"
import styled from "styled-components";


const Column = styled.div<ColumnProps>`
    &:nth-child(${props => props.$colsNum}n+1) {
    border-left-width: 1px;
}
`;
const ColumnNone = styled.div<ColumnProps>`
    color: #ccc;
    text-align: center;
    grid-column: span ${props => props.$colsNum};
    border-left-width: 1px !important;
`;

interface ColumnProps {
    $colsNum: number;
}


export interface GridBodyProps<T> {
    colsId: Array<keyof T>;
    colsName: string[];
    dataItems: T[];
}


function GridBody<T>({colsName, colsId, dataItems}: GridBodyProps<T>) {

    return (
        <>
            {
                !dataItems || dataItems.length === 0
                ?
                <ColumnNone className={style.gridViewColumn} $colsNum={colsName ? colsName.length : 1}>沒有資料</ColumnNone>
                :
                    dataItems.map((item) => {
                    return colsId?.map((colId, colIndex) => {
                        let i = item[colId] as string;
                        let k: string = i + colIndex;
                        return <Column className={style.gridViewColumn} key={k} $colsNum={colsName.length}>{i}</Column>
                    })
                })
            }
        </>
    );
}

export default GridBody;