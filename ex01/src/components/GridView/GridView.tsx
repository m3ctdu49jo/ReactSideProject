import { useState } from "react";
import Grid from "./Grid";
import GridViewProvider, { SortConditionProps } from "./GridViewProvider"
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

function GridView(){
    const [pagingNum, setPagingNum] = useState<number>(1);
    const [pagingPerNum, setPagingPerNum] = useState<number>(10);
    const [dataItems, setDataItems] = useState<dataItemsProps[]>([]);
    const [pageData, setPageData] = useState<dataItemsProps[]>([]);
    const [colsSort, setColsSort] = useState<SortConditionProps<dataItemsProps>[]>([]);
    const [columnsName, setColumnsName] = useState<columnsNameProps[]>([]);
    const [resetData, setResetData] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [pagingToFirst, setPagingToFirst] = useState<boolean>(false);

    return (
        ""
        // <GridViewProvider<dataItemsProps> 
        //     dataItems={dataItems} 
        //     setDataItems={setDataItems} 
        //     pageItems={pageData} 
        //     setPageItems={setPageData} 
        //     colsSort={colsSort} 
        //     setColsSort={setColsSort} 
        //     resetData={false} 
        //     setResetData={setResetData}
        // >
        //     <Grid />
        // </GridViewProvider>
    );
}


export default GridView;   

//export { default } from "./GridView2"   //直接將預設匯出轉發