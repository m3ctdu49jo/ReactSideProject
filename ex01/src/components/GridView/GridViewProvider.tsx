import React, {useState, createContext, useContext, useCallback, ReactNode, useReducer} from "react";
import { gridReducer, gridState } from "./reducers/gridReducer";
import { GridActions, initialState } from "./actions/GridActions";

const GridViewContext = createContext<GridViewProviderProps<any> | null>(null);
function useGridViewContext<T>(): GridViewProviderProps<T> { 
    const context = useContext(GridViewContext);

    if(!context)
        throw new Error("useGridViewContext must be used within a GridViewProvider");

    return context;

}
export interface SortConditionProps<T> {
    key: keyof T;   // 限制 key 必須是 IdataItems 的屬性名稱
    asc: boolean;
}

export interface GridViewProviderProps<T> {
    // 搭配Reducer可以不需要再將state, setState包進useContext
    // dataItems: T[] | null;
    // setDataItems: React.Dispatch<React.SetStateAction<T[] | null>>;
    // colsSort: SortConditionProps<T>[];
    // setColsSort: React.Dispatch<React.SetStateAction<SortConditionProps<T>[]>>
    // resetData: boolean;
    // setResetData: React.Dispatch<React.SetStateAction<boolean>>;
    // clickItem?: T | undefined;
    // setClickItem?: React.Dispatch<React.SetStateAction<T | undefined>>;
    // allowClcikItem?: boolean;
    // setAllowClcikItem?: React.Dispatch<boolean>;
    state: gridState<T>;
    dispatch: React.Dispatch<GridActions<T>>;
    children: ReactNode;

}

function GridViewProvider<T>({children, ...props}: GridViewProviderProps<T>) {
    // 由 <元件狀態傳進來就不需要再設定State>
    //const [dataItems, setDataItems] = useState<T[] | null>(null);
    const [pageItems, setPageItems] = useState<T[]>([]);
    //const [colsSort, setColsSort] = useState<SortConditionProps<T>[]>([]);
    //const [resetData, setResetData] = useState<boolean>(false);
    //const [clickItem, setClickItem] = useState<T | undefined>(undefined);
    //const [allowClcikItem, setAllowClcikItem] = useState<boolean>(false);

    // const [state, dispatch] = useReducer(gridReducer<T>, initialState<T>());
    const contextValue = {
        pageItems, 
        setPageItems, 
        ...props,
        children
    }


    return (
        <GridViewContext.Provider value={contextValue}>
            {children}
        </GridViewContext.Provider>
    );
}

export default GridViewProvider;
export { useGridViewContext }
