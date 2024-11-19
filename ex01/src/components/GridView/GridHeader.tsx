import React from "react";
import style from "../../styles/style.module.css"
import styled from "styled-components";
import { useGridViewContext } from "./GridViewProvider";

const ColumnTitle = styled.div`
    background: #d7f3ff;
    padding-right: 1rem;
    border-top-width: 1px !important; 
    position: relative;


    &:first-child {
        border-left-width: 1px !important; 
    }
    
    i {
        color: #333;
        font-size: 16px;
        text-align: center;
        line-height: 20px;
        font-style: normal;
        width: 20px;
        height: 20px;
        margin: auto 0;
        position: absolute;
        right: .1rem;
        top: 0;
        bottom: 0;
        cursor: pointer;
        border-radius: 50%;

        &.normal {
            color: #aaa;
        }

    }
`;
const ColumnTitleNone = styled.div`
    text-align: center;
    border-top-width: 1px !important; 
    background: #d7f3ff;
    grid-column: span ${props => props.$colsNum}
`;

function mutiSort(data, sortConditions) {
    return data.sort((a, b) => {
        for (let condition of sortConditions) {
            const { key, asc = true } = condition;
            const diff = (a[key] > b[key]) - (a[key] < b[key]);

            if (diff !== 0) {
                return asc ? diff : -diff;
            }
        }
        return 0; // 所有屬性都相同時保持原順序
    });
}

function GridHeader({columnNameItems, colsName}){
    const {dataItems, setDataItems, colsSort, setColsSort} = useGridViewContext();
    
    let changeDataSort = async function (colId) {
        let newSort = [...colsSort];
        let index = colsSort.findIndex(x => x.key === colId);

        // 單個排序
        // let itemSorted = [...dataItems].sort((a, b) => {
        //     if(index === -1 || (index >= 0 && !newSort[index].asc))
        //         return a[colId].localeCompare(b[colId]);
        //     else
        //         return b[colId].localeCompare(a[colId]);
        // });

        if (index >= 0) {
            newSort[index].asc = !colsSort[index].asc;
        }
        else {
            newSort.push({
                key: colId,
                asc: true
            });
        }
        let itemSorted = await mutiSort([...dataItems], newSort);
        setDataItems(itemSorted);
        setColsSort(newSort);
    }

    return (
        !colsName || colsName.length === 0 ?
            <ColumnTitleNone  className={style.gridViewColumn}  $colsNum={colsName ? colsName.length : 1}>無欄位</ColumnTitleNone> :
        colsName?.map((colName, index) => {
            let id = columnNameItems.find(x => x.colName === colName).colId;
            let sort = colsSort.find(x => x.key === id);
            return (
                <ColumnTitle key={colName + index} className={style.gridViewColumn}>
                    {colName}
                    <i className={!sort ? "normal" : ""} onClick={() => { changeDataSort(id) }}>{sort ? sort.asc ? "⇃" : "↾" : "⥯"}</i>
                </ColumnTitle>
            )
        })
    );
}

export default GridHeader;