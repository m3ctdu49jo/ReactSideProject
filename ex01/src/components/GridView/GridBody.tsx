import React from "react";
import style from "../../styles/style.module.css"
import styled from "styled-components";


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


function GridBody({colsName, colsId, dataItems}) {

    return (
        !dataItems || dataItems.length === 0
        ?
        <ColumnNone className={style.gridViewColumn} $colsNum={colsName ? colsName.length : 1}>沒有資料</ColumnNone>
        :
        dataItems.map((item) => {
            return colsId?.map((colId, colIndex) => {
                return <Column className={style.gridViewColumn} key={colId + colIndex} $colsNum={colsName.length}>{item[colId]}</Column>
            })
        })
    );
}

export default GridBody;