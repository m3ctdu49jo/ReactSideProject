import React from "react";
import style from "../../styles/style.module.css";
import styled from "styled-components";
import { useGridViewContext, SortConditionProps } from "./GridViewProvider";

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

function mutiSort<T>(data: T[], sortConditions: SortConditionProps<T>[]): T[] {
    return data.sort((a, b) => {
        for (let condition of sortConditions) {
            const { key, asc = true } = condition;
            // const valA = a[key as keyof IdataItems];    //型別斷言來
            // const valB = b[key as keyof IdataItems];
            // const diff = (valA > valB ? 1 : -1) - (valA < valB ? 1 : -1);
            const diff = (a[key] > b[key] ? 1 : -1) - (a[key] < b[key] ? 1 : -1);

            if (diff !== 0) {
                return asc ? diff : -diff;
            }
        }
        return 0; // 所有屬性都相同時保持原順序
    });
}

interface GridHeaderProps<K> {
    columnNameItems: K[];
    colsName: string[];
    colsVisible: boolean[];
}

function GridHeader<T, K extends {colName: string; colId: string}>({columnNameItems, colsName, colsVisible}: GridHeaderProps<K>){
    const {dataItems, setDataItems, colsSort, setColsSort} = useGridViewContext<T>();
    
    let changeDataSort = async function (colId: keyof T) {
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
        if(dataItems){
            let itemSorted = await mutiSort([...dataItems], newSort);
            setDataItems(itemSorted);
        }
        setColsSort(newSort);
    }

    return (
        <>
            {
                
                !colsName || colsName.length === 0 ?
                <ColumnTitleNone  className={style.gridViewColumn} $colsNum={colsName ? colsName.length : 1}>無欄位</ColumnTitleNone> 
                :
                colsName?.map((colName, index) => {
                    let id: keyof T;
                    let sort = colsSort.find(x => x.key === id);

                    if(!colsVisible[index])
                        return;

                    if(typeof columnNameItems !== "undefined" && columnNameItems.length > 0)
                        id =  columnNameItems.find(x => x.colName === colName)?.colId as keyof T;

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