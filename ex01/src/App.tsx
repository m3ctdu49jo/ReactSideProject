import React, { useEffect, useState } from "react";
import { Provider } from "react-redux"
import store from "./store/store";
import FlashBox from "./components/FlashBox";
import QuestionBox from "./components/QuestionBox";
import ArticleBox from "./components/ArticleBox";
import NewsLoop from "./components/NewsLoop";
import NewsLoopBox from "./components/NewsLoopBox";
import { GridView, GridPaging } from "./components/GridView";
import Paging from "./components/Paging";
import { columnsNameProps } from "./components/GridView/Grid";

interface dataItemsProps {
    id: number;
    orderNum: string;
    orderSeq: string;
    productId: string;
    productName: string;
    //[key: string]: string;  // 添加索引簽名，允許使用任意 string 作為鍵 a[key], b[key]
}

//components 以大寫開頭
export default function App(){

    const [data, setData] = useState<dataItemsProps[] | null>(null);
    const [colNameList, setColNameList] = useState<columnsNameProps[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    interface dataProps {
        d: dataItemsProps[];
        c: columnsNameProps[];
    }
useEffect(() => {
    async function fetchData(){
        const t: dataProps = await new Promise((resolve) => {             
            let d: dataItemsProps[] = [];
            let c: columnsNameProps[] = [];

            //Fake data
            d.push({ id: 1, orderNum: "A123467", orderSeq: "5", productId: "A1A356866", productName: "網球線" });
            d.push({ id: 2, orderNum: "A123456", orderSeq: "1", productId: "A1A356854", productName: "釣魚線1" });
            d.push({ id: 3, orderNum: "A123456", orderSeq: "3", productId: "A1A356854", productName: "釣魚線2" });
            d.push({ id: 4, orderNum: "A123456", orderSeq: "2", productId: "A1A356854", productName: "釣魚線3" });
            d.push({ id: 5, orderNum: "A123456", orderSeq: "2", productId: "A1A356853", productName: "釣魚線3" });
            d.push({ id: 6, orderNum: "A123468", orderSeq: "3", productId: "A1A356850", productName: "鞋面" });
            d.push({ id: 7, orderNum: "A123467", orderSeq: "5", productId: "A1A356866", productName: "網球線" });
            d.push({ id: 8, orderNum: "A123456", orderSeq: "1", productId: "A1A356854", productName: "釣魚線1" });
            d.push({ id: 9, orderNum: "A123456", orderSeq: "3", productId: "A1A356854", productName: "釣魚線2" });
            d.push({ id: 10, orderNum: "A123456", orderSeq: "2", productId: "A1A356854", productName: "釣魚線3" });
            d.push({ id: 11, orderNum: "A123456", orderSeq: "2", productId: "A1A356853", productName: "釣魚線3" });
            d.push({ id: 12, orderNum: "A123468", orderSeq: "3", productId: "A1A356850", productName: "鞋面" });
            d.push({ id: 13, orderNum: "A123467", orderSeq: "5", productId: "A1A356866", productName: "網球線" });
            d.push({ id: 14, orderNum: "A123456", orderSeq: "1", productId: "A1A356854", productName: "釣魚線1" });
            d.push({ id: 15, orderNum: "A123456", orderSeq: "3", productId: "A1A356854", productName: "釣魚線2" });
            d.push({ id: 16, orderNum: "A123456", orderSeq: "2", productId: "A1A356854", productName: "釣魚線3" });
            d.push({ id: 17, orderNum: "A123456", orderSeq: "2", productId: "A1A356853", productName: "釣魚線3" });
            d.push({ id: 18, orderNum: "A123468", orderSeq: "3", productId: "A1A356850", productName: "鞋面" });
            c.push({ colId: "id", colName: "id", visible: false });
            c.push({ colId: "orderNum", colName: "訂單單號" });
            c.push({ colId: "orderSeq", colName: "訂單項次" });
            c.push({ colId: "productId", colName: "產品編號" });
            c.push({ colId: "productName", colName: "產品名稱" });
            resolve({d, c});
        });
        setData(t.d);
        setColNameList(t.c);
        setIsLoading(false);
    }
    fetchData();

}, []);

    return (
        <>
            <Provider store={store}>
                {/* <FlashBox /> */}
                {/* <QuestionBox /> */}
                {/* <ArticleBox /> */}
                {/* <NewsLoop /> */}
                {/* <NewsLoopBox /> */}
                {/* <GridView /> */}
                {isLoading ? "loading..." :
                <GridPaging<dataItemsProps> dataItemList={data} columnNameList={colNameList} />}
            </Provider>
        </>
    );
}