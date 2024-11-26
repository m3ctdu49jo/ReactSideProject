import React, { useState } from "react";
import style from "../../styles/style.module.css"
import styled from "styled-components";
import { GridViewProviderProps, useGridViewContext } from "./GridViewProvider";


const Column = styled.div<ColumnProps>`
    background: ${props => props.$active ? "#ffd20b" : ""};
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
    $active?: boolean;
}


export interface GridBodyProps<T> {
    colsId: Array<keyof T>;
    colsName: string[];
    dataItems: T[] | null;
    colsVisible: boolean[];
}


function GridBody<T>({colsName, colsId, dataItems, colsVisible}: GridBodyProps<T>) {

    const {setClickItem} = useGridViewContext<T>();
    const [rowActive, setRowActive] = useState<string>("");

    const itemClickHandle = (row: T, activeId: string) => {
        setRowActive(activeId);
        if(setClickItem)
            setClickItem(row);
    }

    return (
        <>
            {
                !dataItems || dataItems.length === 0
                ?
                <div><ColumnNone className={style.gridViewColumn} $colsNum={colsName ? colsName.length : 1}>沒有資料</ColumnNone></div>
                :
                dataItems.map((item, index) => {
                    let r: string = index.toString() + colsId.map(c => item[c]);
                    return colsId?.map((colId, colIndex) => {
                        if(!colsVisible[colIndex])
                            return;
                        let i = item[colId] as string;
                        let k: string = i + colIndex;
                        return <Column className={style.gridViewColumn} key={k} $colsNum={colsName.length} $active={rowActive === r} onClick={() => {itemClickHandle(item, r)}}>{i}</Column>
                    })
                })
            }
        </>
    );
}

export default GridBody;