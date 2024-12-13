import React, { useEffect, useReducer, useRef, useState } from "react";
import { GridPaging } from "../GridView";
import styled from "styled-components";
import style from "../../styles/style.module.css"
import QuickOpenBox from "./QuickOpenBox";
import { initialState, quickSearchReducer } from "./reducers/quickSearchReducer";
import QuickSearchProvider from "./QucikSearchProvider";

const QuerySelect = styled.select`
`;

const QueryInput = styled.input`
`;
const QueryBtn = styled.button`
`;


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
            <QueryInput className={style.mr_1} ref={queryInputRef} />
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

interface ProductQuickSearchProps {
    getKeyValue: keyof GetProductKeyValue | (keyof GetProductKeyValue)[];
    getQuickValue: (value: string[]) => void;
}


function ProductQuickSearch<T>({getKeyValue, getQuickValue}: ProductQuickSearchProps) {
    const [selectedItem, setSelectedItem] = useState<ProductProps | undefined>(undefined);
    const [state, dispatch] = useReducer(quickSearchReducer<T>, initialState<T>());

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
        <QuickSearchProvider<T> state={state} disptach={dispatch}>
            <QuickOpenBox close={selectedItem !== undefined} onOpenQueryBox={onClearSelectedItem}>
                <ProductOperate getSelectValue={getQuickSelectItem} />
            </QuickOpenBox>
        </QuickSearchProvider>
    );
}

export default ProductQuickSearch;