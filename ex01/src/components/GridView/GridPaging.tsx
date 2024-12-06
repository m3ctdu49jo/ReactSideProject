import React, { useEffect, useReducer, useState } from "react";
import Grid, { columnsNameProps } from "./Grid";
import Paging from "../Paging";
import GridViewProvider, { GridViewProviderProps, SortConditionProps } from "./GridViewProvider";
import { gridReducer } from "./reducers/gridReducer";
import { initialState, setAllowClickItemR, setClickItemR, setColsSortR, SetColumnNumber, setDataItemR, setResetDataR, useQuickSelectBtnR } from "./actions/GridActions";


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
    columnNameList?: columnsNameProps[] | null;
    allowClickItem?: boolean;
    onClickItem?: (item: T | undefined) => void;
    showQuickSelectBtn?: boolean;
    onQulickSelectedItem?: (item: T | undefined) => void
}


function GridPaging<T extends Object>({dataItemList, columnNameList, allowClickItem = false, onClickItem, showQuickSelectBtn = false, onQulickSelectedItem}: GridPagingProps<T>) {
    const [pagingNum, setPagingNum] = useState<number>(1);
    const [pagingPerNum, setPagingPerNum] = useState<number>(10);
    const [pageData, setPageData] = useState<T[]>([]);
    const [columnsName, setColumnsName] = useState<columnsNameProps[] | null>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [pagingToFirst, setPagingToFirst] = useState<boolean>(false);
    const [state, dispatch] = useReducer(gridReducer<T>, initialState<T>());
    
    useEffect(() => {
        dispatch(setAllowClickItemR(allowClickItem));
        if(showQuickSelectBtn)
            dispatch(useQuickSelectBtnR());
    }, []);

    useEffect(() => {
        if(onQulickSelectedItem)
            onQulickSelectedItem(state.quickSelectedItem);
    }, [state.quickSelectedItem]);
    

    useEffect(() => {     
        dispatch(setDataItemR(dataItemList));
        if(columnNameList)
            setColumnsName(columnNameList);
        setPagingToFirst(true);
        setPagingNum(1);
    }, [state.resetData]);
    
    useEffect(() => {   
        if(!state.dataItems || state.dataItems.length === 0)
            return;

        const firstIndex = ((pagingNum - 1) * pagingPerNum);
        const LastIndex = (firstIndex + pagingPerNum) - 1;
             
        const filterD: T[] = state.dataItems.filter((_, index) => {
            return index >= firstIndex && index <= LastIndex;
        });
        setPageData(filterD);
        setPagingToFirst(false);
    }, [pagingNum, pagingPerNum, state.dataItems]);
    
    useEffect(() => {   
        if(!state.dataItems || state.dataItems.length === 0 || state.resetData)
            return;
        if(state.colsSort.length === 0){
            setPagingToFirst(true);
            setPagingNum(1);
        }
        let itemSorted: T[] = mutiSort<T>([...state.dataItems], state.colsSort);
        dispatch(setDataItemR(itemSorted));
    }, [state.colsSort]);

    useEffect(() => {
        if(onClickItem && allowClickItem)
            onClickItem(state.clickItem);
    }, [state.clickItem]);

    function pagingChangeHandle(num: number, perNum: number){
        setPagingNum(num);
        setPagingPerNum(perNum);
    }
    
    return (
        <GridViewProvider<T> 
            state={state}
            dispatch={dispatch}
        >
            <Grid data={pageData} columnsName={columnsName} />
            <Paging dataNum={dataItemList ? dataItemList.length : 0} onPagingChange={pagingChangeHandle} currentNumToFirst={pagingToFirst} />
        </GridViewProvider>
    );
}

export default GridPaging;