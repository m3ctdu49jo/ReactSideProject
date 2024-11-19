import React, {useState, createContext, useContext, useCallback, ReactNode} from "react";


const GridViewContext = createContext({});
const useGridViewContext = () => useContext(GridViewContext);

export interface GridViewProviderProps<T, K> {
    dataItems: T;
    pageItems: K;
    colsSort: string[];
    resetData: boolean;
    children: ReactNode;
}

function GridViewProvider<T, K>({children}: GridViewProviderProps<T, K>) {
    const [dataItems, setDataItems] = useState<T[]>([]);
    const [pageItems, setPageItems] = useState<K[]>([]);
    const [colsSort, setColsSort] = useState<string[]>([]);
    const [resetData, setResetData] = useState<boolean>(false);

    return (
        <GridViewContext.Provider value={{dataItems, setDataItems, pageItems, setPageItems, colsSort, setColsSort, resetData, setResetData}}>
            {children}
        </GridViewContext.Provider>
    );
}

export default GridViewProvider;
export { useGridViewContext}
