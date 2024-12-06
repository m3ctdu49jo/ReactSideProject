import React from "react";
import { SortConditionProps } from "../GridViewProvider";
import { gridState } from "../reducers/gridReducer";

// 制定Action動作介面
export interface SetDataItemAction<T> {
    type: "SET_DATA_ITEM";
    payload: T[] | null;
}
export interface ClearDataItemAction {
    type: "CLEAR_DATA_ITEM";
}
export interface SetColsSortAction<T> {
    type: "SET_COLS_SORT";
    payload: SortConditionProps<T>[];
}
export interface ClearColsSortAction {
    type: "CLEAR_COLS_SORT";
}
export interface SetResetDataAction {
    type: "SET_RESET_DATA";
    payload: boolean;
}
export interface SetClickItemAction<T> {
    type: "SET_CLICK_ITEM";
    payload: T | undefined
}
export interface ClearClickItemAction {
    type: "CLEAR_CLICK_ITEM";
}
export interface SetAllowClickItemAction {
    type: "SET_ALLOW_CLICK_ITEM";
    payload: boolean;
}
export interface UseQuickSelectBtn {
    type: "USE_QUICK_SELECT_BTN";
}
export interface SetQuickSelectedItem<T> {
    type: "SET_QUICK_SELECT_ITEM";
    payload: T
}

export interface SetColumnNumber {
    type: "SET_COLUMN_NUMBER"
    payload: number;
}

// Grid Actions
export type GridActions<T> = 
    SetDataItemAction<T> | ClearDataItemAction |
    SetColsSortAction<T> | ClearColsSortAction |
    SetResetDataAction |
    SetClickItemAction<T> | ClearClickItemAction |
    SetAllowClickItemAction |
    UseQuickSelectBtn | SetQuickSelectedItem<T> |
    SetColumnNumber
;

// 初始值
export function initialState<T>(): gridState<T>{
    return {        
        dataItems: null,
        colsSort: [],
        resetData: false,
        clickItem: undefined as T,
        allowClcikItem: false,
        showQuickSelectBtn: false,
        quickSelectedItem: undefined as T,
        colsNum: 0
    }
}

// 對應的 Action 函式
export function setDataItemR<T>(items: T[] | null): SetDataItemAction<T> {
    return {type: "SET_DATA_ITEM", payload: items}
}
export function clearDataItemR(): ClearDataItemAction {
    return {type: "CLEAR_DATA_ITEM"}
}

export function setColsSortR<T>(items: SortConditionProps<T>[]): SetColsSortAction<T> {
    return {type: "SET_COLS_SORT", payload: items}
}
export function clearColsSortR(): ClearColsSortAction {
    return {type: "CLEAR_COLS_SORT"}
}

export function setResetDataR(reset: boolean): SetResetDataAction {
    return {type: "SET_RESET_DATA", payload: reset}
}
export function setClickItemR<T>(items: T | undefined): SetClickItemAction<T> {
    return {type: "SET_CLICK_ITEM", payload: items}
}
export function clearClickItemR(): ClearClickItemAction {
    return {type: "CLEAR_CLICK_ITEM"}
}


export function setAllowClickItemR(allow: boolean): SetAllowClickItemAction {
    return {type: "SET_ALLOW_CLICK_ITEM", payload: allow}
}

export function useQuickSelectBtnR(): UseQuickSelectBtn {
    return {type: "USE_QUICK_SELECT_BTN"}
}
export function setQuickSelectedItemR<T>(item: T): SetQuickSelectedItem<T> {
    return {
        type: "SET_QUICK_SELECT_ITEM", payload: item
    }
}

export function SetColumnNumberR(num: number) :SetColumnNumber {
    return {
        type: "SET_COLUMN_NUMBER",
        payload: num
    }
}