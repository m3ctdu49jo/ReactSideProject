import React, { useEffect, useState } from "react";
import Grid from "./Grid";
import Paging from "../Paging";
import GridViewProvider, { GridViewProviderProps, SortConditionProps } from "./GridViewProvider";


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

interface dataItemsProps {
    orderNum: string;
    orderSeq: string;
    productId: string;
    productName: string;
    //[key: string]: string;  // 添加索引簽名，允許使用任意 string 作為鍵 a[key], b[key]
}
interface columnsNameProps {
    colId: string;
    colName: string;
}
interface dataProps {
    d: dataItemsProps[];
    c: columnsNameProps[];
}


function GridPaging(){
    const [pagingNum, setPagingNum] = useState<number>(1);
    const [pagingPerNum, setPagingPerNum] = useState<number>(10);
    const [dataItems, setDataItems] = useState<dataItemsProps[]>([]);
    const [pageData, setPageData] = useState<dataItemsProps[]>([]);
    const [colsSort, setColsSort] = useState<SortConditionProps<dataItemsProps>[]>([]);
    const [columnsName, setColumnsName] = useState<columnsNameProps[]>([]);
    const [resetData, setResetData] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [pagingToFirst, setPagingToFirst] = useState<boolean>(false);

    useEffect(() => {     
        async function fetchData(){
            const t: dataProps = await new Promise((resolve) => {             
                let d: dataItemsProps[] = [];
                let c: columnsNameProps[] = [];
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
             
        const filterD: dataItemsProps[] = dataItems.filter((_, index) => {
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

    function pagingChangeHandle(num: number, perNum: number){
        setPagingNum(num);
        setPagingPerNum(perNum);
    }
    function sortChangeHandle(sort: SortConditionProps<dataItemsProps>[]){
        setColsSort(sort);
    }
    function resetDataHandle(reset: boolean){
        setResetData(reset);
    }

    return (
        <GridViewProvider<dataItemsProps> 
            dataItems={dataItems} 
            setDataItems={setDataItems} 
            pageItems={pageData} 
            setPageItems={setPageData} 
            colsSort={colsSort} 
            setColsSort={setColsSort} 
            resetData={false} 
            setResetData={setResetData}
        >
            <Grid data={pageData} columnsName={columnsName} onSortChange={sortChangeHandle} onRestSetData={resetDataHandle} />
            <Paging dataNum={dataItems ? dataItems.length : 0} onPagingChange={pagingChangeHandle} currentNumToFirst={pagingToFirst} />
        </GridViewProvider>
    );
}

export default GridPaging;