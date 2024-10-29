import React, { useEffect, useState } from "react";
import styled from "styled-components";
import style from "../styles/style.module.css"

const GridViewWrap = styled.div`
    width: 80%;
    display: grid;
    grid-template-columns: repeat(${props => props.$colsNum}, 1fr);
    margin: 50px auto 0;
`;
const ColumnTitle = styled.div`
    background: #d7f3ff;
    border-top-width: 1px !important; 

    &:first-child {
        border-left-width: 1px !important; 
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

// let column = [];

// column.push({columnId: "orderNum", columnName: "訂單單號"})

// const data = {
//     columnId: "orderNum",
//     columnName: "訂單單號"
// }

function mutiSort(data, sortConditions) {
    console.log(sortConditions);
    return data.sort((a, b) => {
        for (let condition of sortConditions) {
            const { key, asc = false } = condition;
            const diff = (a[key] > b[key]) - (a[key] < b[key]);

            if (diff !== 0) {
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
                asc: false
            });
        }
        let itemSorted = await mutiSort([...dataItems], newSort);
        console.log(itemSorted);
        setDataItems(itemSorted);
        setColsSort(newSort);
    }

    return (
        <GridViewWrap $colsNum={colsName.length}>
            {
                // title
                colsName.map((colName, index) => {
                    let id = columnNameItems.find(x => x.colName === colName).colId;
                    let sort = colsSort.find(x => x.id === id);
                    return (
                        <ColumnTitle key={colName + index} className={style.gridViewColumn} onClick={() => { changeDataSort(id) }}>
                            {colName}
                            {sort ? sort.asc ? <i>V</i> : <i>^</i> : ""}
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


    );
}

export default GridView;