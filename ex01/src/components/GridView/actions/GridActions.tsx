import React from "react";
import { SortConditionProps } from "../GridViewProvider";
import { gridState } from "../reducers/gridReducer";

// export interface ActionResult {
//     type: string;
//     payload: any;
// }

// export function setDataItem<T>(dataItem: T): ActionResult {
//     return {
//         type: "SET_DATA_ITEM",
//         payload: dataItem
//     }
// }

// 制定Action動作介面
export interface SetDataItemAction<T> {
    type: "SET_DATA_ITEM";
    payload: T[];
}
export interface SetColsSortAction<K> {
    type: "SET_COLS_SORT";
    payload: K[];
}
export interface SetRestDataAction {
    type: "SET_RESET_DATA";
    payload: boolean;
}
export interface SetClickItemAction<T> {
    type: "SET_CLICK_ITEM";
    payload: T
}
export interface SetAllowClickItem {
    type: "SET_ALLOW_CLICK_ITEM";
    payload: boolean;
}

// Grid Actions
export type GridActions<T> = 
    SetDataItemAction<T> | 
    SetColsSortAction<SortConditionProps<T>> |
    SetRestDataAction |
    SetClickItemAction<T> |
    SetAllowClickItem;

// 對應的 Action 函式
export function setDataItemR<T>(items: T[]): SetDataItemAction<T> {
    return {type: "SET_DATA_ITEM", payload: items}
}

// 初始值
export function initialState<T>(): gridState<T>{
    return {        
        dataItem: [],
        colsSort: [],
        resetData: false,
        clickItem: null as T,
        allowClcikItem: false
    }
}
