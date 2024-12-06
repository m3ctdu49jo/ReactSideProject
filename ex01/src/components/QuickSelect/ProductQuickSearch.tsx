import React, { useEffect, useRef, useState } from "react";
import { GridPaging } from "../GridView";
import styled from "styled-components";
import QuickOpenBox from "./QuickOpenBox";

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


const QuerySelect = styled.select`

`;

const QueryInput = styled.input`

`;
const QueryBtn = styled.button`

`;

interface ProductOperateProps {
    getSelectValue: (item: ProductProps | undefined) => void
}

const ProductOperate: React.FC<ProductOperateProps> = ({getSelectValue}: ProductOperateProps) => {
    const [data, setData] = useState<ProductProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [toSearch, setToSearch] = useState(false);
    const queryInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {

        fetch("https://northwind.vercel.app/api/products", {
            method: "GET"
        })
        .then<ProductProps[]>(d => d.json())
        .then(d => {
            setData(d);
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        if(!toSearch)
            return;
        let id = queryInputRef.current?.value;
        fetch(`https://northwind.vercel.app/api/products/${id}`, {
            method: "GET"
        })
        .then<ProductProps[]>(d => d.json())
        .then(d => {
            setData(d);
            setIsLoading(false);
            setToSearch(false);
        });
    }, [toSearch]);

    function getQuickSelectedItem(item: ProductProps | undefined){
        getSelectValue(item);
    }

    return (
        <>
            <QuerySelect>
                <option>訂單單號</option>
                <option>產品編號</option>
            </QuerySelect>
            <QueryInput ref={queryInputRef} />
            <QueryBtn onClick={() => {setToSearch(true); setIsLoading(true)}}>送出</QueryBtn>
            {
                isLoading || (data && data.length === 0) ? 
                "Loading..."
                :                 
                <GridPaging<ProductProps> dataItemList={data} showQuickSelectBtn={true} onQulickSelectedItem={getQuickSelectedItem} />
                }
        </>
    );
}

interface GetProductKeyValue{
    unitPrice: string;
    name: string;
}


function ProductQuickSearch<T>({getKeyValue, getQuickValue}: {getKeyValue: keyof GetProductKeyValue | (keyof GetProductKeyValue)[]; getQuickValue: (value: string[]) => void}) {
    const [selectedItem, setSelectedItem] = useState<ProductProps | undefined>(undefined);

    useEffect(() => {
        let val: string[] = [];
        if(selectedItem){
            if(Array.isArray(getKeyValue))
                val = getKeyValue.map(i => selectedItem[i].toString());
            else
                val = [selectedItem[getKeyValue].toString()];
        }
        if(selectedItem)
            getQuickValue(val);
    }, [selectedItem]);

    function onClearSelectedItem(isOpen: boolean){
        if(isOpen)
            setSelectedItem(undefined);
    }

    function getQuickSelectItem(item: ProductProps | undefined){
        setSelectedItem(item);
    }
    return (
        <QuickOpenBox close={selectedItem !== undefined} onOpenQueryBox={onClearSelectedItem}>
            <ProductOperate getSelectValue={getQuickSelectItem} />
        </QuickOpenBox>
    );
}

export default ProductQuickSearch;