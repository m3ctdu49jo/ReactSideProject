import React, { useEffect, useState } from "react";
import style from "../../styles/style.module.css"
import styled from "styled-components";
import { useGridViewContext } from "./GridViewProvider";
import { setClickItemR, setQuickSelectedItemR } from "./actions/GridActions";


const Column = styled.div<ColumnProps>`
    background: ${props => props.$active ? "#ffd20b" : "#fff"};
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

const SelectedBtn = styled.div`
    white-space: nowrap;
    display: inline;
    padding: .3rem .5rem;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        
    background: #eee;
    }
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
    showQuickSelectedBtn?: boolean;
}


function GridBody<T>({colsName, colsId, dataItems, colsVisible}: GridBodyProps<T>) {

    const [rowActive, setRowActive] = useState<string>("");
    const {state, dispatch} = useGridViewContext<T>();
    const [items, setItems] = useState<T[] | null>();

    const itemClickHandle = (row: T, activeId: string) => {
        setRowActive(activeId);
        dispatch(setClickItemR(row))
    }

    useEffect(() => {
        //console.log(dataItems);
        if(dataItems)
            setItems([...dataItems]);
    }, [dataItems]);


    useEffect(() => {
        if(!state.clickItem)
            setRowActive("");
    }, [state.clickItem]);

    return (
        <>
            {
                
                !items || items.length === 0
                ?
                <ColumnNone className={style.gridViewColumn} $colsNum={colsName ? state.colsNum : 1}>沒有資料</ColumnNone>
                :
                items.map((item, index) => {
                    let r: string = index.toString() + colsId?.map(c => item[c]);
                    let cols =  colsId?.map((colId, colIndex) => {
                        if(!colsVisible[colIndex])
                            return;
                        let i = item[colId] as string;
                        let k: string = i + colId.toString() + r + colIndex;
                        if(typeof i === "object")
                            i = "";
                        return <Column className={style.gridViewColumn} key={k} $colsNum={state.colsNum} $active={rowActive === r && state.allowClcikItem} onClick={() => {itemClickHandle(item, r)}}>{i}</Column>
                    })
                    if(cols && state.showQuickSelectBtn){
                        let seleColumn = <Column className={style.gridViewColumn + " " + style.d_flex + " " + style.flex_centerXY} key={r + "selectBtn"} $colsNum={state.colsNum} $active={rowActive === r && state.allowClcikItem} onClick={() => {itemClickHandle(item, r)}}>
                                <SelectedBtn className={style.btn} onClick={() => {dispatch(setQuickSelectedItemR(item))}}>{"選擇"}</SelectedBtn>
                            </Column>;
                        cols = [...cols, seleColumn];
                    }
                    return cols;
                })
            }
        </>
    );
}

export default GridBody;