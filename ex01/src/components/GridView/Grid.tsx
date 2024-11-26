import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useDebounce from "../../hooks/useDebounce";
import ControlBar from "./ControlBar";
import GridHeader from "./GridHeader";
import GridBody, { GridBodyProps } from "./GridBody";
import { useGridViewContext, GridViewProviderProps, SortConditionProps } from "./GridViewProvider";

const GridViewBox = styled.div`
    width: 80%;
    margin: 50px auto 0;
    position: relative;
`;
const GridViewWrap = styled.div<GridViewWrapProps>`
    display: grid;
    grid-template-columns: repeat(${props => props.$colsNum}, 1fr);
`;

interface GridViewWrapProps {
    $colsNum: number;
}

interface GridProps<T, K> {
    data: T[] | null;
    columnsName: K[] | null;
    onSortChange: (sort: SortConditionProps<T>[]) => void;
    onRestSetData: (reset: boolean) => void;
    onClickItem?: (row: T | undefined) => void;
}


export interface columnsNameProps {
    colId: string;
    colName: string;
    visible?: boolean;
}


// 接收透過元件傳遞進來的參數要使用解構物件方式獲取，否則數據將有可能出錯
function Grid<T extends Object, K extends columnsNameProps>({data, columnsName, onSortChange, onRestSetData, onClickItem}: GridProps<T, K>) {
    const { colsSort, resetData, setResetData, clickItem, setAllowClcikItem}: GridViewProviderProps<T> = useGridViewContext();
    const [columnNameItems, setColumnNameItem] = useState<K[]>([]);
    const [colsName, setColsName] = useState<string[]>([]);
    const [colsId, setColsId] = useState<Array<keyof T>>([]);
    const [colsVisible, setColsVisible] = useState<boolean[]>([]);
    const [gridHover, setGridHover] = useState<boolean>(false);
    const [timeoutHover, setTimeoutHover] = useState<boolean>(false);

    useEffect(() => {
        let d = data && data[0] ? [...data] : [];
        let c = columnsName && columnsName[0] ? [...columnsName] : [];
        setColumnNameItem(c);

        let names: string[], ids: Array<keyof T>, visibles: boolean[];
        if (!c[0]) {
            names = d.map(i => Object.keys(i))[0];
            ids = d.map(i => Object.keys(i))[0] as Array<keyof T>;
            visibles = d.map(i => true);
        } else {
            names = c.map(i => i.colName);
            ids = c.map(i => i.colId) as Array<keyof T>;
            visibles = c.map(i => i.visible || i.visible === undefined ? true : false);
        }
        setColsName(names);
        setColsId(ids);
        setColsVisible(visibles);
        setResetData(false);

    }, [data, columnsName]);

    useEffect(() => {
        onSortChange(colsSort);
    }, [colsSort]);

    
    useEffect(() => {
        onRestSetData(resetData);
    }, [resetData]);

    useEffect(() => {
        if(setAllowClcikItem)
            setAllowClcikItem(onClickItem !== undefined);
        if(onClickItem)
            onClickItem(clickItem);
    }, [clickItem]);

    // debounce 延遲觸發函式執行，以免反覆觸發造成state異常設定，而導致顯示異常
    useDebounce(() => {
        if(timeoutHover)
            setGridHover(true);
        else
            handleMouseLeave();
    }, 200, [timeoutHover, gridHover]);
    const handleMouseLeave = () => {
        setTimeout(() => {
            if(!timeoutHover)
                setGridHover(false);
        }, 500);
    };

    return (
        <GridViewBox onMouseEnter={() => {setTimeoutHover(true)}} onMouseLeave={() => {setTimeoutHover(false)}}>
            <ControlBar gridHover={gridHover} />
            <GridViewWrap $colsNum={colsName ? colsName.length : 1}>
                <GridHeader columnNameItems={columnNameItems} colsName={colsName} colsVisible={colsVisible} />
                <GridBody colsId={colsId} colsName={colsName} dataItems={data} colsVisible={colsVisible} />
            </GridViewWrap>
        </GridViewBox>
    );
}

export default Grid;