import React from "react";
import { SetDataItemAction, GridActions } from "../actions/GridActions";
import { SortConditionProps } from "../GridViewProvider";



export interface gridState<T> {
    dataItems: T[] | null;
    colsSort: SortConditionProps<T>[];
    resetData: boolean;
    clickItem: T | undefined;
    allowClcikItem: boolean;
}


export function gridReducer<T>(state: gridState<T>, action: GridActions<T>){
    switch(action.type){    // GridActions 介面中的每一個 Action 都要有對應的 case 
        case "SET_DATA_ITEM":
            return {
                ...state,
                dataItems: action.payload ? [...action.payload] : null
            };     
        case "CLEAR_DATA_ITEM":
            return {
                ...state,
                colsSort: []
            }   
        case "SET_COLS_SORT":
            //console.log("a", [...action.payload]);
            return {
                ...state,
                colsSort: [...action.payload]
            };   
        case "CLEAR_COLS_SORT":
            return {
                ...state,
                colsSort: []
            }
        case "SET_RESET_DATA":
            return {
                ...state,
                resetData: action.payload
            };   
        case "SET_CLICK_ITEM":
            return {
                ...state,
                clickItem: action.payload
            };   
        case "CLEAR_CLICK_ITEM":
            return {
                ...state,
                clickItem: undefined
            };   
        case "SET_ALLOW_CLICK_ITEM":
            return {
                ...state,
                allowClcikItem: action.payload
            };
    }
}