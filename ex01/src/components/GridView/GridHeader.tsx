import React from "react";
import style from "../../styles/style.module.css";
import styled from "styled-components";
import { useGridViewContext, SortConditionProps } from "./GridViewProvider";
import { setColsSortR } from "./actions/GridActions";

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
const ColumnTitleNone = styled.div<ColumnTitleNoneProps>`
    text-align: center;
    border-top-width: 1px !important; 
    background: #d7f3ff;
    grid-column: span ${(props) => (props.$colsNum)};
`;

interface ColumnTitleNoneProps {
    $colsNum: number;
}

interface GridHeaderProps<K> {
    columnNameItems: K[];
    colsName: string[];
    colsVisible: boolean[];
}

function GridHeader<T, K extends {colName: string; colId: string}>({columnNameItems, colsName, colsVisible}: GridHeaderProps<K>){
    const {dispatch, state} = useGridViewContext<T>();
    const colsLen = colsVisible ? colsVisible.filter(x => x !== false).length : 1
    
    let changeDataSort = async function (colId: keyof T) {
        let newSort = [...state.colsSort];
        let index = state.colsSort.findIndex(x => x.key === colId);

        // 單個排序
        // let itemSorted = [...dataItems].sort((a, b) => {
        //     if(index === -1 || (index >= 0 && !newSort[index].asc))
        //         return a[colId].localeCompare(b[colId]);
        //     else
        //         return b[colId].localeCompare(a[colId]);
        // });

        if (index >= 0) {
            newSort[index].asc = !state.colsSort[index].asc;
        }
        else {
            newSort.push({
                key: colId,
                asc: true
            });
        }
        dispatch(setColsSortR(newSort))
    }

    return (
        <>
            {
                !colsName || colsName.length === 0 ?
                <ColumnTitleNone  className={style.gridViewColumn} $colsNum={colsName ? colsLen : 1}>無欄位</ColumnTitleNone> 
                :
                colsName?.map((colName, index) => {
                    let id: keyof T, sort;

                    if(!colsVisible[index])
                        return;

                    if(typeof columnNameItems !== "undefined" && columnNameItems.length > 0)
                        id =  columnNameItems.find(x => x.colName === colName)?.colId as keyof T;
                    sort = state.colsSort.find(x => x.key === id);

                    return (
                        <ColumnTitle key={colName + index} className={style.gridViewColumn}>
                            {colName}
                            <i className={!sort ? "normal" : ""} onClick={() => { changeDataSort(id) }}>{sort ? sort.asc ? "⇃" : "↾" : "⥯"}</i>
                        </ColumnTitle>
                    )
                })
            }
        </>
    );
}

export default GridHeader;