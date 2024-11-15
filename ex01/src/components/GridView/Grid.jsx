import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useDebounce from "../../hooks/useDebounce";
import ControlBar from "./ControlBar";
import GridHeader from "./GridHeader";
import GridBody from "./GridBody";
import { useGridViewContext } from "./GridViewProvider";

const GridViewBox = styled.div`
    width: 80%;
    margin: 50px auto 0;
    position: relative;
`;
const GridViewWrap = styled.div`
    display: grid;
    grid-template-columns: repeat(${props => props.$colsNum}, 1fr);
`;

// 接收透過元件傳遞進來的參數要使用解構物件方式獲取，否則數據將有可能出錯
function Grid({data, columnsName, onSortChange, onRestSetData}) {
    const { colsSort, resetData, setResetData} = useGridViewContext();
    const [columnNameItems, setColumnNameItem] = useState([]);
    const [colsName, setColsName] = useState([]);
    const [colsId, setColsId] = useState([]);
    const [gridHover, setGridHover] = useState(false);
    const [hover, setHover] = useState(false);

    useEffect(() => {
        let d = data && data[0] ? [...data] : [];
        let c = columnsName && columnsName[0] ? [...columnsName] : [];
        setColumnNameItem(c);

        let names, ids;
        if (!c[0]) {
            names = d.map(i => Object.keys(i))[0];
            ids = d.map(i => Object.keys(i))[0];
        } else {
            names = c.map(i => i.colName);
            ids = c.map(i => i.colId);
        }
        setColsName(names);
        setColsId(ids);
        setResetData(false);

    }, [data, columnsName]);

    useEffect(() => {
        onSortChange(colsSort);
    }, [colsSort]);

    
    useEffect(() => {
        onRestSetData(resetData);
    }, [resetData]);

    // debounce 延遲觸發函式執行，以免反覆觸發造成state異常設定，而導致顯示異常
    useDebounce(() => {
        if(hover)
            setGridHover(true);
        else
            handleMouseLeave();
    }, 200, [hover, gridHover]);
    const handleMouseLeave = () => {
        setTimeout(() => {
            if(!hover)
                setGridHover(false);
        }, 500);
    };

    return (
        <GridViewBox onMouseEnter={() => {setHover(true)}} onMouseLeave={() => {setHover(false)}}>
            <ControlBar gridHover={gridHover} />
            <GridViewWrap $colsNum={colsName ? colsName.length : []}>
                <GridHeader columnNameItems={columnNameItems} colsName={colsName} />
                <GridBody colsId={colsId} colsName={colsName} dataItems={data} />
            </GridViewWrap>
        </GridViewBox>
    );
}

export default Grid;