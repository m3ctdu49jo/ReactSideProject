import React, { useCallback, useEffect, useState } from "react";
import Grid from "./Grid";
import Paging from "../Paging";
import GridViewProvider from "./GridViewProvider";
import style from "../../styles/style.module.css"


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

function GridPaging(){
    const [pagingNum, setPagingNum] = useState(1);
    const [pagingPerNum, setPagingPerNum] = useState(10);
    const [dataItems, setDataItems] = useState([]);
    const [pageData, setPageData] = useState([]);
    const [colsSort, setColsSort] = useState([]);
    const [columnsName, setColumnsName] = useState([]);
    const [resetData, setResetData] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [pagingToFirst, setPagingToFirst] = useState(false);

    useEffect(() => {     
        async function fetchData(){
            const t = await new Promise((resolve) => {             
                let d = [];
                let c = [];
                //Fake data
                d.push({ orderNum: "A123467", orderSeq: "5", productId: "A1A356866", productName: "網球線" });
                d.push({ orderNum: "A123456", orderSeq: "1", productId: "A1A356854", productName: "釣魚線1" });
                d.push({ orderNum: "A123456", orderSeq: "3", productId: "A1A356854", productName: "釣魚線2" });
                d.push({ orderNum: "A123456", orderSeq: "2", productId: "A1A356854", productName: "釣魚線3" });
                d.push({ orderNum: "A123456", orderSeq: "2", productId: "A1A356853", productName: "釣魚線3" });
                d.push({ orderNum: "A123468", orderSeq: "3", productId: "A1A356850", productName: "鞋面" });
                d.push({ orderNum: "A123467", orderSeq: "5", productId: "A1A356866", productName: "網球線" });
                d.push({ orderNum: "A123456", orderSeq: "1", productId: "A1A356854", productName: "釣魚線1" });
                d.push({ orderNum: "A123456", orderSeq: "3", productId: "A1A356854", productName: "釣魚線2" });
                d.push({ orderNum: "A123456", orderSeq: "2", productId: "A1A356854", productName: "釣魚線3" });
                d.push({ orderNum: "A123456", orderSeq: "2", productId: "A1A356853", productName: "釣魚線3" });
                d.push({ orderNum: "A123468", orderSeq: "3", productId: "A1A356850", productName: "鞋面" });
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
                resolve({d, c});
            });
            setDataItems(t.d);
            setColumnsName(t.c);
            setIsLoading(false);
            setPagingToFirst(true);
            setPagingNum(1);
        }
        fetchData();
    }, [resetData]);

    
    useEffect(() => {   
        if(!dataItems || dataItems.length === 0)
            return;

        const firstIndex = ((pagingNum - 1) * pagingPerNum);
        const LastIndex = (firstIndex + pagingPerNum) - 1;
             
        const filterD = dataItems.filter((_, index) => {
            return index >= firstIndex && index <= LastIndex;
        });
        setPageData(filterD);
        setPagingToFirst(false);
    }, [pagingNum, pagingPerNum, dataItems]);
    
    useEffect(() => {   
        if(!dataItems || dataItems.length === 0 || resetData)
            return;
        if(colsSort.length === 0){
            setPagingToFirst(true);
            setPagingNum(1);
        }
        let itemSorted = mutiSort([...dataItems], colsSort);
        setDataItems(itemSorted);
    }, [colsSort]);

    function pagingChangeHandle(num, perNum){
        setPagingNum(num);
        setPagingPerNum(perNum);
    }
    function sortChangeHandle(sort){
        setColsSort(sort);
    }
    function resetDataHandle(reset){
        setResetData(reset);
    }

    return (
        <GridViewProvider>
            <Grid data={pageData} columnsName={columnsName} onSortChange={sortChangeHandle} onRestSetData={resetDataHandle} />
            <Paging dataNum={dataItems ? dataItems.length : 0} onPagingChange={pagingChangeHandle} currentNumToFirst={pagingToFirst} />
        </GridViewProvider>
    );
}

export default GridPaging;