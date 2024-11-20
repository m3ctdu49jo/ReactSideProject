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
    dataItems: T[];
    setDataItems: React.Dispatch<React.SetStateAction<T[]>>;
    pageItems: T[];
    setPageItems: React.Dispatch<React.SetStateAction<T[]>>;
    colsSort: SortConditionProps<T>[];
    setColsSort: React.Dispatch<React.SetStateAction<SortConditionProps<T>[]>>
    resetData: boolean;
    setResetData: React.Dispatch<React.SetStateAction<boolean>>;
    children: ReactNode;
}

function GridViewProvider<T>({children}: GridViewProviderProps<T>) {
    const [dataItems, setDataItems] = useState<T[]>([]);
    const [pageItems, setPageItems] = useState<T[]>([]);
    const [colsSort, setColsSort] = useState<SortConditionProps<T>[]>([]);
    const [resetData, setResetData] = useState<boolean>(false);

    const contextValue = {
        dataItems, 
        setDataItems, 
        pageItems, 
        setPageItems, 
        colsSort, 
        setColsSort, 
        resetData, 
        setResetData, 
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
