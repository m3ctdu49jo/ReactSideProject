import React from "react";
import { QuickSearchActions } from "../actions/quickSearchActions";
import { columnsNameProps } from "../../GridView/Grid";

export interface quickSearchState<T> {
    queryURL: string;
    queryKeys: keyof T | (keyof T)[];
    keysValue: keyof T | (keyof T)[];
    queryKeysName: string | string[]
    gridColumnsName?: columnsNameProps[] | null;
}

export function initialState<T>(): quickSearchState<T> {
    return {        
        queryURL: "",
        queryKeys: [],
        keysValue: [],
        queryKeysName: [],
        gridColumnsName: null
    }
}

export function quickSearchReducer<T>(state: quickSearchState<T>, action: QuickSearchActions<T>) {
    switch(action.type){
        case "SET_QUERY_URL":
            return {
                ...state,
                queryURL: action.payload
            }
        case "SET_QUERY_KEYS":
            return {
                ...state,
                queryKeys: action.payload
            }
        case "SET_RESULT_KEYS":
            return {
                ...state,
                keysValue: action.payload
            }
        case "SET_QUERY_KEYS_NAME":
            return {
                ...state,
                queryKeysName: action.payload
            }
        case "SET_QUERY_GRID_COLUMNS_NAME":
            return {
                ...state,
                gridColumnsName: action.payload
            }

    }
}