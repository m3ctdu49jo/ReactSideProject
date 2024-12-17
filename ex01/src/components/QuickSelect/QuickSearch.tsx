import React, { useEffect, useReducer, useRef, useState } from "react";
import { GridPaging } from "../GridView";
import styled from "styled-components";
import style from "../../styles/style.module.css"
import QuickOpenBox from "./QuickOpenBox";
import { columnsNameProps } from "../GridView/Grid";
import QuickSearchProvider, { useQuickSearchContext } from "./QucikSearchProvider";
import { quickSearchReducer, initialState } from "./reducers/quickSearchReducer";
import { setQueryGridColumnsName, setQueryKeys, setQueryKeysName, setQueryURL, setResultKeys } from "./actions/quickSearchActions";
import OpenBox from "../Common/OpenBox";
import QuickButton from "./QuickButton";

const QuerySelect = styled.select`
`;

const QueryInput = styled.input`
`;
const QueryBtn = styled.button`
`;

interface OperatePanelProps<T> {
    getSelectedItem: (item: T | undefined) => void;   
}

function OperatePanel<T extends Object>({getSelectedItem}: OperatePanelProps<T>) {
    const [data, setData] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [toSearch, setToSearch] = useState(false);
    const queryInputRef = useRef<HTMLInputElement>(null);
    const querySelectOptionRef = useRef<HTMLSelectElement>(null);
    const { state } = useQuickSearchContext();

    useEffect(() => {
        if(state != null && !state.queryURL)
            return;

        fetch(state.queryURL, {
            method: "GET"
        })
        .then<T[]>(d => d.json())
        .then(d => {
            setData(d);
            setIsLoading(false);
        });
    }, [state.queryURL]);

    useEffect(() => {
        if(!toSearch)
            return;
        let inputVal = queryInputRef.current?.value;
        let option = querySelectOptionRef.current?.value;
        let url = state.queryURL;
        let errQueryKeys = false;
        
        if(Array.isArray(state.queryKeys) && !state.queryKeys.includes(option as keyof T)){
            errQueryKeys = true;
        } else if(!Array.isArray(state.queryKeys) && state.queryKeys !== option){
            errQueryKeys = true;
        }
        if(errQueryKeys)
            throw new Error(`${option} 不是可查詢項目${state.queryKeys.toString()}`);

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
        getSelectedItem(item);
    }

    return (
        <>
            <QuerySelect ref={querySelectOptionRef}>
                {
                    Array.isArray(state.queryKeys)
                    ?
                    state.queryKeys?.map((key, index) => <option key={key.toString()+index} value={key.toString()}>{state.queryKeysName[index]}</option>)
                    :
                    <option value={state.queryKeys.toString()}>{state.queryKeysName}</option>
                    
                }
            </QuerySelect>
            <QueryInput className={style.mr_1} ref={queryInputRef} />
            <QueryBtn onClick={() => {setToSearch(true); setIsLoading(true)}}>送出</QueryBtn>
            {
                isLoading || (data && data.length === 0) ? 
                "Loading..."
                :                 
                <GridPaging<T> dataItemList={data} columnNameList={state.gridColumnsName} showQuickSelectBtn={true} onQulickSelectedItem={getQuickSelectedItem} />
                }
        </>
    );
}

interface QuickSearchProps<T> {
    queryURL: string;
    resultKeys: keyof T | (keyof T)[];
    getQuickValue: (value: string[]) => void;
    queryKeys: keyof T | (keyof T)[];
    queryKeysName: string | string[]
    gridColumnsName?: columnsNameProps[] | null;
}


function QuickSearch<T extends Object>({queryURL, resultKeys, getQuickValue, queryKeys, queryKeysName, gridColumnsName}: QuickSearchProps<T>) {
    const [selectedItem, setSelectedItem] = useState<T | undefined>(undefined);
    const [state, dispatch] = useReducer(quickSearchReducer<T>, initialState<T>());
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if(!queryURL)
            throw new Error("queryURL can not be empty.");
        dispatch(setQueryURL(queryURL));
        dispatch(setResultKeys(resultKeys))
        dispatch(setQueryKeys(queryKeys));
        dispatch(setQueryKeysName(queryKeysName));
        if(gridColumnsName)
            dispatch(setQueryGridColumnsName(gridColumnsName))
    }, [queryURL, resultKeys, queryKeys, queryKeysName, gridColumnsName]);

    useEffect(() => {
        let val: string[] = [];
        if(selectedItem){
            if(Array.isArray(resultKeys))
                val = resultKeys.map(i => selectedItem[i as keyof T] as string);
            else
                val = [selectedItem[resultKeys as keyof T] as string];
        }
        if(selectedItem)
            getQuickValue(val);
    }, [selectedItem]);

    function onClearSelectedItem(isOpen: boolean){
        setOpen(isOpen);
        if(isOpen)
            setSelectedItem(undefined);
    }

    function getQuickSelectedItem(item: T | undefined){
        if(item){
            setSelectedItem(item);
            setOpen(false);
        }
    }
    return (
        <QuickSearchProvider<T> state={state} disptach={dispatch}>
            {/* <QuickOpenBox close={selectedItem !== undefined} onOpenQueryBox={onClearSelectedItem}>
                <OperatePanel getSelectedItem={getQuickSelectedItem} />
            </QuickOpenBox> */}
            
            <OpenBox open={open} onIsOpen={onClearSelectedItem}>
                <OperatePanel getSelectedItem={getQuickSelectedItem} />
            </OpenBox>
            <QuickButton onClcikBtn={setOpen} />
        </QuickSearchProvider>
    );
}

export default QuickSearch;