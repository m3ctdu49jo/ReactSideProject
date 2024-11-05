import React, { useEffect, useState, useRef, useCallback, createContext, useContext } from "react";
import styled from "styled-components";
import debounce from 'lodash/debounce'
import useDebounce from "../../hooks/useDebounce";
import ControlBar from "./ControlBar";
import GridHeader from "./GridHeader";
import GridBody from "./GridBody";
import { useGridViewContext } from "./GridViewProvider";
import { useSelector, useDispatch } from "react-redux";
import { setColsNameR, clearColsName, setColumnNameItemR, setColsIdR, setDataItemsR } from "../../actions/GridActions";

const GridViewBox = styled.div`
    width: 80%;
    margin: 50px auto 0;
    position: relative;
`;
const GridViewWrap = styled.div`
    display: grid;
    grid-template-columns: repeat(${props => props.$colsNum}, 1fr);
`;

function Grid(data = [], columnsName = []) {
    const {setDataItems} = useGridViewContext();
    // const [columnNameItems, setColumnNameItem] = useState([]);
    // const [colsName, setColsName] = useState([]);
    // const [colsId, setColsId] = useState([]);
    //const [colsSort, setColsSort] = useState([]);
    const [gridHover, setGridHover] = useState(false);
    const [hover, setHover] = useState(false);
    const initialDataRef = useRef(null);

    const colsNameR = useSelector(state => state.grid.colsName);
    const dispatch = useDispatch();

    useEffect(() => {
        //fake
        let d = data[0] ? [...data] : [];
        let c = columnsName[0] ? [...columnsName] : [];
        d.push({ orderNum: "A123467", orderSeq: "5", productId: "A1A356866", productName: "網球線" });
        d.push({ orderNum: "A123456", orderSeq: "1", productId: "A1A356854", productName: "釣魚線1" });
        d.push({ orderNum: "A123456", orderSeq: "3", productId: "A1A356854", productName: "釣魚線2" });
        d.push({ orderNum: "A123456", orderSeq: "2", productId: "A1A356854", productName: "釣魚線3" });
        d.push({ orderNum: "A123456", orderSeq: "2", productId: "A1A356853", productName: "釣魚線3" });
        d.push({ orderNum: "A123468", orderSeq: "3", productId: "A1A356850", productName: "鞋面" });
        c.push({ colId: "orderNum", colName: "訂單單號" });
        c.push({ colId: "orderSeq", colName: "訂單項次" });
        c.push({ colId: "productId", colName: "產品編號" });
        c.push({ colId: "productName", colName: "產品名稱" });
        setDataItems(d);
        //setColumnNameItem(c);
        dispatch(setDataItemsR(d));
        dispatch(setColumnNameItemR(c));

        if(!initialDataRef.current)
            initialDataRef.current = d;

        let names, ids;
        if (!c[0]) {
            names = d.map(i => Object.keys(i))[0];
            ids = d.map(i => Object.keys(i))[0];
            //setColsName(d.map(i => Object.keys(i))[0]);
            //setColsId(d.map(i => Object.keys(i))[0]);
        } else {
            names = c.map(i => i.colName);
            ids = c.map(i => i.colId);
            //setColsName(c.map(i => i.colName));
            //setColsId(c.map(i => i.colId));
        }
        dispatch(setColsNameR(names));
        dispatch(setColsIdR(ids));

    }, [data, columnsName, dispatch]);

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
            <ControlBar gridHover={gridHover} initialDataRef={initialDataRef} />
            <GridViewWrap $colsNum={colsNameR.length}>
                <GridHeader />
                <GridBody />
            </GridViewWrap>
        </GridViewBox>
    );
}

export default Grid;