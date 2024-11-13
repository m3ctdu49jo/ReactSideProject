import React, { useCallback, useEffect, useState } from "react";
import Grid from "./Grid";
import Paging from "../Paging";
import GridViewProvider from "./GridViewProvider";


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

    useEffect(() => {     
        async function fetchData(){
            await new Promise((resolve, reject) => {             
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
            }).then(({d, c}) => {
                setDataItems(d);
                setColumnsName(c);
            });
        }
        fetchData();
    }, []);

    
    // useEffect(() => {   
    //     const firstIndex = ((pagingNum - 1) * pagingPerNum);
    //     const LastIndex = (firstIndex + pagingPerNum) - 1;
        
    //     async function filterPagingData(){
    //         await new Promise((resolve) => {            
    //             const filterD = dataItems.filter((_, index) => {
    //                 return index >= firstIndex && index <= LastIndex;
    //             });
    //             resolve(filterD);
    //         }).then(d => {
    //             setPageData(d);
    //         });
    //     }
    //     filterPagingData();
    // }, [pagingNum, pagingPerNum, dataItems]);

    const pagingEvent = () => {

        const firstIndex = ((pagingNum - 1) * pagingPerNum);
        const LastIndex = (firstIndex + pagingPerNum) - 1;
        
        async function filterPagingData(){
            await new Promise((resolve) => {            
                const filterD = dataItems.filter((_, index) => {
                    return index >= firstIndex && index <= LastIndex;
                });
                resolve(filterD);
            }).then(d => {
                setPageData(d);
            });
        }
        filterPagingData();
    };

    
    
    useEffect(() => {   
        let itemSorted = mutiSort([...dataItems], colsSort);
        setDataItems(itemSorted);
    }, [colsSort]);

    function pagingChangeHandle(num, perNum){
        setPagingNum(num);
        setPagingPerNum(perNum);
        pagingEvent();
    }
    function sortChangeHandle(sort){
        setColsSort(sort);
    }

    return (
        <GridViewProvider>
            <Grid data={pageData} columnsName={columnsName} onSortChange={sortChangeHandle} />
            <Paging dataNum={dataItems ? dataItems.length : 0} onPagingChange={pagingChangeHandle} />
        </GridViewProvider>
    );
}

export default GridPaging;