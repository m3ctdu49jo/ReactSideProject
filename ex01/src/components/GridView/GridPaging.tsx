import React, { useEffect, useState } from "react";
import Grid, { columnsNameProps } from "./Grid";
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


    
interface GridPagingProps<T> {
    dataItemList: T[] | null;
    columnNameList: columnsNameProps[] | null;
}


function GridPaging<T extends Object>({dataItemList, columnNameList}: GridPagingProps<T>) {
    const [pagingNum, setPagingNum] = useState<number>(1);
    const [pagingPerNum, setPagingPerNum] = useState<number>(10);
    const [dataItems, setDataItems] = useState<T[] | null>([]);
    const [pageData, setPageData] = useState<T[]>([]);
    const [colsSort, setColsSort] = useState<SortConditionProps<T>[]>([]);
    const [columnsName, setColumnsName] = useState<columnsNameProps[] | null>([]);
    const [resetData, setResetData] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [pagingToFirst, setPagingToFirst] = useState<boolean>(false);
    const [clickItem, setClickItem] = useState<T | undefined>(undefined);
    const [allowClick, setAllowClick] = useState<boolean>(false);

    useEffect(() => {     
        setDataItems(dataItemList);
        setColumnsName(columnNameList);
        setIsLoading(false);
        setPagingToFirst(true);
        setPagingNum(1);
    }, [resetData]);

    
    useEffect(() => {   
        if(!dataItems || dataItems.length === 0)
            return;

        const firstIndex = ((pagingNum - 1) * pagingPerNum);
        const LastIndex = (firstIndex + pagingPerNum) - 1;
             
        const filterD: T[] = dataItems.filter((_, index) => {
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
    function sortChangeHandle(sort: SortConditionProps<T>[]){
        setColsSort(sort);
    }
    function resetDataHandle(reset: boolean){
        setResetData(reset);
    }

    return (
        <GridViewProvider<T> 
            dataItems={dataItems} 
            setDataItems={setDataItems} 
            colsSort={colsSort} 
            setColsSort={setColsSort} 
            resetData={false} 
            setResetData={setResetData}
            clickItem={clickItem}
            setClickItem={setClickItem}
            allowClcikItem={allowClick}
            setAllowClcikItem={setAllowClick}
        >
            <Grid data={pageData} columnsName={columnsName} onSortChange={sortChangeHandle} onRestSetData={resetDataHandle} />
            <Paging dataNum={dataItems ? dataItems.length : 0} onPagingChange={pagingChangeHandle} currentNumToFirst={pagingToFirst} />
        </GridViewProvider>
    );
}

export default GridPaging;