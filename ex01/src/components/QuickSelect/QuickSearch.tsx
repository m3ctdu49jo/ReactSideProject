import React, { useEffect, useRef, useState } from "react";
import { GridPaging } from "../GridView";
import styled from "styled-components";
import style from "../../styles/style.module.css"
import QuickOpenBox from "./QuickOpenBox";
import { columnsNameProps } from "../GridView/Grid";

const QuerySelect = styled.select`

`;

const QueryInput = styled.input`

`;
const QueryBtn = styled.button`

`;

interface OperatePanelProps<T> {
    queryURL: string;
    getSelectValue: (item: T | undefined) => void;    
    queryKeys: keyof T | (keyof T)[];
    queryKeysName: string | string[];
    gridColumnsName?: columnsNameProps[] | null;
}

function OperatePanel<T extends Object>({queryURL, getSelectValue, queryKeys, queryKeysName, gridColumnsName}: OperatePanelProps<T>) {
    const [data, setData] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [toSearch, setToSearch] = useState(false);
    const queryInputRef = useRef<HTMLInputElement>(null);
    const querySelectOptionRef = useRef<HTMLSelectElement>(null);

    useEffect(() => {
        console.log(gridColumnsName);
        if(!queryURL)
            throw new Error("URL不可為空");

        fetch(queryURL, {
            method: "GET"
        })
        .then<T[]>(d => d.json())
        .then(d => {
            setData(d);
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        if(!toSearch)
            return;
        let inputVal = queryInputRef.current?.value;
        let option = querySelectOptionRef.current?.value;
        let url = queryURL;
        let errQueryKeys = false;
        
        if(Array.isArray(queryKeys) && !queryKeys.includes(option as keyof T)){
            errQueryKeys = true;
        } else if(!Array.isArray(queryKeys) && queryKeys !== option){
            errQueryKeys = true;
        }
        if(errQueryKeys)
            throw new Error(`${option} 不是可查詢項目${queryKeys.toString()}`);

        url = (inputVal !== undefined && inputVal !== "") ? `${url}?${option}=${inputVal}` : url;

        fetch(url, {
            method: "GET"
        })
        .then<T[]>(d => d.json())
        .then(d => {
            setData(d);
            setIsLoading(false);
            setToSearch(false);
        });
    }, [toSearch]);

    function getQuickSelectedItem(item: T | undefined){
        getSelectValue(item);
    }

    return (
        <>
            <QuerySelect ref={querySelectOptionRef}>
                {
                    Array.isArray(queryKeys)
                    ?
                    queryKeys?.map((key, index) => <option key={key.toString()+index} value={key.toString()}>{queryKeysName[index]}</option>)
                    :
                    <option value={queryKeys.toString()}>{queryKeysName}</option>
                    
                }
            </QuerySelect>
            <QueryInput className={style.mr_1} ref={queryInputRef} />
            <QueryBtn onClick={() => {setToSearch(true); setIsLoading(true)}}>送出</QueryBtn>
            {
                isLoading || (data && data.length === 0) ? 
                "Loading..."
                :                 
                <GridPaging<T> dataItemList={data} columnNameList={gridColumnsName} showQuickSelectBtn={true} onQulickSelectedItem={getQuickSelectedItem} />
                }
        </>
    );
}

interface QuickSearchProps<T> {
    queryURL: string;
    getKeyValue: keyof T | (keyof T)[];
    getQuickValue: (value: string[]) => void;
    queryKeys: keyof T | (keyof T)[];
    queryKeysName: string | string[]
    gridColumnsName?: columnsNameProps[] | null;
}


function QuickSearch<T extends Object>({queryURL, getKeyValue, getQuickValue, queryKeys, queryKeysName, gridColumnsName}: QuickSearchProps<T>) {
    const [selectedItem, setSelectedItem] = useState<T | undefined>(undefined);

    useEffect(() => {
        let val: string[] = [];
        if(selectedItem){
            if(Array.isArray(getKeyValue))
                val = getKeyValue.map(i => selectedItem[i as keyof T] as string);
            else
                val = [selectedItem[getKeyValue as keyof T] as string];
        }
        if(selectedItem)
            getQuickValue(val);
    }, [selectedItem]);

    function onClearSelectedItem(isOpen: boolean){
        if(isOpen)
            setSelectedItem(undefined);
    }

    function getQuickSelectItem(item: T | undefined){
        setSelectedItem(item);
    }
    return (
        <QuickOpenBox close={selectedItem !== undefined} onOpenQueryBox={onClearSelectedItem}>
            <OperatePanel gridColumnsName={gridColumnsName} queryURL={queryURL} getSelectValue={getQuickSelectItem} queryKeys={queryKeys} queryKeysName={queryKeysName} />
        </QuickOpenBox>
    );
}

export default QuickSearch;