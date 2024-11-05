import React from "react";
import style from "../../styles/style.module.css"
import styled from "styled-components";
import { useGridViewContext } from "./GridViewProvider";
import { useSelector } from "react-redux";


const Column = styled.div`
    &:nth-child(${props => props.$colsNum}n+1) {
    border-left-width: 1px;
}
`;
const ColumnNone = styled.div`
    color: #ccc;
    text-align: center;
    grid-column: span ${props => props.$colsNum};
    border-left-width: 1px !important;
`;


function GridBody({colsName, colsId}) {
    const {dataItems} = useGridViewContext();
    const dataItemsR = useSelector(state => state.grid.dataItems);
    const colsNameR = useSelector(state => state.grid.colsName);
    const coldsIdR = useSelector(state => state.grid.colsId);

    return (
        dataItemsR.length === 0
        ?
        <ColumnNone className={style.gridViewColumn} $colsNum={colsNameR.length}>沒有資料</ColumnNone>
        :
        dataItemsR.map((item, itemIndex) => {
            return coldsIdR.map((colId, colIndex) => {
                return <Column className={style.gridViewColumn} key={colId + colIndex} $colsNum={colsNameR.length}>{item[colId]}</Column>
            })
        })
    );
}

export default GridBody;