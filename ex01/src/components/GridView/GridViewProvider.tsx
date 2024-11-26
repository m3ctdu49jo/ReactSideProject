import React, {useState, createContext, useContext, useCallback, ReactNode} from "react";


const GridViewContext = createContext<GridViewProviderProps<any> | null>(null);
function useGridViewContext<T>() { 
    const context = useContext(GridViewContext);

    if(!context)
        throw new Error("useGridViewContext must be used within a GridViewProvider");

    return context as GridViewProviderProps<T>

}
export interface SortConditionProps<T> {
    key: keyof T;   // 限制 key 必須是 IdataItems 的屬性名稱
    asc: boolean;
}

export interface GridViewProviderProps<T> {
    dataItems: T[] | null;
    setDataItems: React.Dispatch<React.SetStateAction<T[] | null>>;
    colsSort: SortConditionProps<T>[];
    setColsSort: React.Dispatch<React.SetStateAction<SortConditionProps<T>[]>>
    resetData: boolean;
    setResetData: React.Dispatch<React.SetStateAction<boolean>>;
    clickItem?: T | undefined,
    setClickItem?: React.Dispatch<React.SetStateAction<T | undefined>>,
    allowClcikItem?: boolean,
    setAllowClcikItem?: React.Dispatch<boolean>,
    children: ReactNode;
}

function GridViewProvider<T>({children}: GridViewProviderProps<T>) {
    const [dataItems, setDataItems] = useState<T[] | null>(null);
    const [pageItems, setPageItems] = useState<T[]>([]);
    const [colsSort, setColsSort] = useState<SortConditionProps<T>[]>([]);
    const [resetData, setResetData] = useState<boolean>(false);
    const [clickItem, setClickItem] = useState<T | undefined>(undefined);
    const [allowClcikItem, setAllowClcikItem] = useState<boolean>(false);

    const contextValue = {
        dataItems, 
        setDataItems, 
        pageItems, 
        setPageItems, 
        colsSort, 
        setColsSort, 
        resetData, 
        setResetData, 
        clickItem,
        setClickItem,
        allowClcikItem,
        setAllowClcikItem,
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
