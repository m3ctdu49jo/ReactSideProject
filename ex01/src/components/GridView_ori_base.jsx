import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import style from "../styles/style.module.css"
import debounce from 'lodash/debounce'
import useDebounce from "../hooks/useDebounce";

const GridViewBox = styled.div`
    width: 80%;
    margin: 50px auto 0;
    position: relative;
`;
const GridViewWrap = styled.div`
    display: grid;
    grid-template-columns: repeat(${props => props.$colsNum}, 1fr);
`;
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

const ControlBar = styled.div`
    color: #999;
    line-height: 1;
    display: flex;
    background: #fff;
    padding: .3rem .7rem;
    position: absolute;
    transition: transform .5s ease, opacity .5s ease;
    transform: translateY(${props => props.$hover ? "-33px" : "0"});
    opacity: ${props => props.$hover ? 1 : 0};
    right: 0;
    border: 1px solid #ddd;
    border-radius: 3px;
    box-shadow: 0 3px 5px rgba(0, 0, 0, .1);

    div {
        position: relative;
        padding-right: 10px;
        cursor: pointer;
        transition: all .2s ease;
        
        &:after {
            content: "";
            background: #ddd;
            width: 1px;
            height: 10px;
            margin: auto 0;
            position: absolute;
            top: 0;
            right: 5px;
            bottom: 0;
        }
        &:last-child {        
            padding-right: 0;

            &:after {
                display: none;
            }
        }
        &:hover {
            color: #5695e1;
        }
    }
    
    
    &:after {
        content: "";
        width: 100%;
        height: 10px;
        position: absolute;
        left: 0;
        bottom: -10px;
    }
`;

// let column = [];

// column.push({columnId: "orderNum", columnName: "訂單單號"})

// const data = {
//     columnId: "orderNum",
//     columnName: "訂單單號"
// }

function mutiSort(data, sortConditions) {
    return data.sort((a, b) => {
        for (let condition of sortConditions) {
            const { key, asc = true } = condition;
            const diff = (a[key] > b[key]) - (a[key] < b[key]);

            if (diff !== 0) {
                console.log(diff);
                return asc ? diff : -diff;
            }
        }
        return 0; // 所有屬性都相同時保持原順序
    });
}


function GridView(data = [], columnsName = []) {
    const [dataItems, setDataItems] = useState([]);
    const [columnNameItems, setColumnNameItem] = useState([]);
    const [colsName, setColsName] = useState([]);
    const [colsId, setColsId] = useState([]);
    const [colsSort, setColsSort] = useState([]);
    const [gridHover, setGridHover] = useState(false);
    const [hover, setHover] = useState(false);
    const initialDataRef = useRef(null);


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
        setColumnNameItem(c);

        if(!initialDataRef.current)
            initialDataRef.current = d;


        if (!c[0]) {
            setColsName(d.map(i => Object.keys(i))[0]);
            setColsId(d.map(i => Object.keys(i))[0]);
        } else {
            setColsName(c.map(i => i.colName));
            setColsId(c.map(i => i.colId));
        }
    }, [data, columnsName]);

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


    function resetData(){
        let d = [...initialDataRef.current];
        d.push({ orderNum: "A124469", orderSeq: "1", productId: "A1A356950", productName: "紡織布" });
        initialDataRef.current = d;
        resetSortAndInitData();
    }
    function resetSortAndInitData(){
        setColsSort([]);
        resetInitData();
    }

    function resetInitData(){
        setDataItems(initialDataRef.current);
    }

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
            <ControlBar $hover={gridHover}>
                <div title="重製排序" onClick={() => resetSortAndInitData()}>⥯</div>
                <div title="資料重整" onClick={() => resetData()}>↻</div>
            </ControlBar>
            <GridViewWrap $colsNum={colsName.length}>
                {
                    // title
                    colsName.map((colName, index) => {
                        let id = columnNameItems.find(x => x.colName === colName).colId;
                        let sort = colsSort.find(x => x.key === id);
                        return (
                            <ColumnTitle key={colName + index} className={style.gridViewColumn}>
                                {colName}
                                <i className={!sort ? "normal" : ""} onClick={() => { changeDataSort(id) }}>{sort ? sort.asc ? "⇃" : "↾" : "⥯"}</i>
                            </ColumnTitle>
                        )
                    })
                }
                {
                    // content
                    dataItems.length === 0
                        ?
                        <ColumnNone className={style.gridViewColumn} $colsNum={colsName.length}>沒有資料</ColumnNone>
                        :
                        dataItems.map((item, itemIndex) => {
                            return colsId.map((colId, colIndex) => {
                                return <Column className={style.gridViewColumn} key={colId + colIndex} $colsNum={colsName.length}>{item[colId]}</Column>
                            })
                        })
                }
            </GridViewWrap>
        </GridViewBox>


    );
}

export default GridView;