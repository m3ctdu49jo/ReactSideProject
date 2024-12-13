import React, { useEffect, useState } from "react";
import style from "../../styles/style.module.css";
import styled from "styled-components";
import { useGridViewContext, SortConditionProps } from "./GridViewProvider";
import { setColsSortR, SetColumnNumberR } from "./actions/GridActions";

const ColumnTitle = styled.div`
    white-space: nowrap;
    background: #abd534;
    padding-top: .5rem;
    padding-bottom: .5rem;
    padding-right: 1.3rem;
    border-top-width: 1px !important; 
    position: relative;


    &:first-child {
        border-left-width: 1px !important; 
    }
    
    i {
        color: #666;
        font-size: 1.2rem;
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
            color: #fff;
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
    const [headCols, setHeadCols] = useState<(JSX.Element | undefined)[]>([]);
    
    useEffect(() => {
        let colsLen = colsVisible ? colsVisible.filter(x => x !== false).length : 1
        colsLen = state.showQuickSelectBtn ? colsLen + 1 : colsLen;
        dispatch(SetColumnNumberR(colsLen));
    }, [colsVisible])
    
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
        dispatch(setColsSortR(newSort));
    }

    useEffect(() => {
        let cols = colsName?.map((colName, index) => {
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
        if(state.showQuickSelectBtn){
            let seleColumn = <ColumnTitle key={"selectBtn"} className={style.gridViewColumn + " " + style.text_center}>{"選擇"}</ColumnTitle>;
            if(cols)
                cols = [...cols, seleColumn];
        }

        setHeadCols(cols);
    }, [colsName, columnNameItems]);


    return (
        <>
            {
                !colsName || colsName.length === 0 ?
                <ColumnTitleNone  className={style.gridViewColumn} $colsNum={colsName ? state.colsNum : 1}>無欄位</ColumnTitleNone> 
                :
                headCols
            }
        </>
    );
}

export default GridHeader;