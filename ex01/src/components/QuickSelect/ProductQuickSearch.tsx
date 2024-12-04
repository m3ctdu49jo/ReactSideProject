import React, { useEffect, useRef, useState } from "react";
import { GridPaging } from "../GridView";
import styled from "styled-components";
import QuickOpenBox from "./QuickOpenBox";

interface PropsProps {
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

const ProductOperate: React.FC = () => {
    const [data, setData] = useState<PropsProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [toSearch, setToSearch] = useState(false);
    const queryInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {

        fetch("https://northwind.vercel.app/api/products", {
            method: "GET"
        })
        .then<PropsProps[]>(d => d.json())
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
        .then<PropsProps[]>(d => d.json())
        .then(d => {
            setData(d);
            setIsLoading(false);
            setToSearch(false);
        });
    }, [toSearch]);

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
                <GridPaging<PropsProps> dataItemList={data} />
                }
        </>
    );
}


function ProductQuickSearch() {

    
    return <QuickOpenBox OperateComponent={ProductOperate} />
}

export default ProductQuickSearch;