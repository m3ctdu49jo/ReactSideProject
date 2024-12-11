import React, { useEffect, useRef, useState } from "react";
import QuickSearch from "./QuickSearch";


interface ProductProps {
    id: number,
    supplierId: number,
    categoryId: number,
    quantityPerUnit: string,
    unitPrice: number,
    unitsInStock: number,
    unitsOnOrder: number,
    reorderLevel: number,
    discontinued: boolean,
    name: string
}

const productLables: Record<keyof ProductProps, string> = {
    id: "編號",
    supplierId: "供應商編號",
    categoryId: "分類編號",
    quantityPerUnit: "每單位數量",
    unitPrice: "單價",
    unitsInStock: "庫存單位",
    unitsOnOrder: "訂單單位",
    reorderLevel: "重新進貨等級",
    discontinued: "已停止供應",
    name: "名稱",
}

interface GetProductKeyValue {
    unitPrice: number;
    name: string;
    a: string
}


interface ProductQuickSearchProps {
    getKeyValue: keyof ProductProps | (keyof ProductProps)[];
    queryKeys: keyof ProductProps | (keyof ProductProps)[];
    getQuickValue: (value: string[]) => void;
}


function RebuildProductQuickSearch({queryKeys, getKeyValue, getQuickValue}: ProductQuickSearchProps) {

    let queryKeysName: string | string[];
    if(Array.isArray(queryKeys)){
        queryKeysName = [];
        queryKeys.map(key => {
            (queryKeysName as Array<string>).push(productLables[key]);
        });
    }
    else{
        queryKeysName = productLables[queryKeys];
    }

    return (
        // <QuickOpenBox close={selectedItem !== undefined} onOpenQueryBox={onClearSelectedItem}>
        //     <ProductOperate getSelectValue={getQuickSelectItem} />
        // </QuickOpenBox>
        <QuickSearch<ProductProps> getKeyValue={getKeyValue} queryKeys={queryKeys} queryKeysName={queryKeysName} getQuickValue={getQuickValue} />
    );
}

export default RebuildProductQuickSearch;