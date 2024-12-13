import React from "react";
import { columnsNameProps } from "../../GridView/Grid";



export interface SetQueryURL {
    type: "SET_QUERY_URL";
    payload: string;
}

export interface SetQueryKeys<T> {
    type: "SET_QUERY_KEYS";
    payload: keyof T | (keyof T)[];
}

export interface SetResultKeys<T> {
    type: "SET_RESULT_KEYS",
    payload: keyof T | (keyof T)[];
}

export interface SetQueryKeysName {
    type: "SET_QUERY_KEYS_NAME",
    payload: string | string[]
}

export interface SetQueryGridColumnsName {
    type: "SET_QUERY_GRID_COLUMNS_NAME",
    payload: columnsNameProps[] | null;
}

// Actions
export type QuickSearchActions<T> =
    SetQueryURL | 
    SetQueryKeys<T> |
    SetResultKeys<T> |
    SetQueryKeysName |
    SetQueryGridColumnsName
;

export function setQueryURL(url: string): SetQueryURL{
    return {
        type: "SET_QUERY_URL",
        payload: url
    }
}

export function setQueryKeys<T>(keys: keyof T | (keyof T)[]): SetQueryKeys<T>{
    return {type: "SET_QUERY_KEYS", payload: keys }
}

export function setResultKeys<T>(values: keyof T | (keyof T)[]): SetResultKeys<T> {
    return { type: "SET_RESULT_KEYS", payload: values }
}

export function setQueryKeysName(keyNames: string | string[]): SetQueryKeysName {
    return { type:"SET_QUERY_KEYS_NAME", payload: keyNames }
}

export function setQueryGridColumnsName(columnsNameList: columnsNameProps[] | null): SetQueryGridColumnsName {
    return { type: "SET_QUERY_GRID_COLUMNS_NAME", payload: columnsNameList }
}