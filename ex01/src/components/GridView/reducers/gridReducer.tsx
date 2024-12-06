import React from "react";
import { GridActions } from "../actions/GridActions";
import { SortConditionProps } from "../GridViewProvider";



export interface gridState<T> {
    dataItems: T[] | null;
    colsSort: SortConditionProps<T>[];
    resetData: boolean;
    clickItem: T | undefined;
    allowClcikItem: boolean;
    showQuickSelectBtn: boolean;
    colsNum: number;
    quickSelectedItem: T | undefined
}


export function gridReducer<T>(state: gridState<T>, action: GridActions<T>){
    switch(action.type){    // GridActions 介面中的每一個 Action 都要有對應的 case 
        case "SET_DATA_ITEM":
            let items: T[] | null = [];
            if(Array.isArray(action.payload))
                items = action.payload;
            else if(action.payload)
                items[0] = action.payload;
            return {
                ...state,
                dataItems: action.payload ? [...items] : null
            };     
        case "CLEAR_DATA_ITEM":
            return {
                ...state,
                colsSort: []
            }   
        case "SET_COLS_SORT":
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
        case "SET_COLUMN_NUMBER":
            return {
                ...state,
                colsNum: action.payload
            }
        case "USE_QUICK_SELECT_BTN":
            return {
                ...state,
                showQuickSelectBtn: true
            }
        case "SET_QUICK_SELECT_ITEM":
            return {
                ...state,
                quickSelectedItem: action.payload
            }
    }
}