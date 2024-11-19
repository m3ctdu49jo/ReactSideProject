import React, {useState, createContext, useContext, useCallback, ReactNode} from "react";


const GridViewContext = createContext({});
const useGridViewContext = () => useContext(GridViewContext);

interface GridViewProviderProps {
    children: ReactNode
}

function GridViewProvider({children}: GridViewProviderProps) {
    const [dataItems, setDataItems] = useState<[]>([]);
    const [pageItems, setPageItems] = useState<[]>([]);
    const [colsSort, setColsSort] = useState<[]>([]);
    const [resetData, setResetData] = useState<boolean>(false);

    return (
        <GridViewContext.Provider value={{dataItems, setDataItems, pageItems, setPageItems, colsSort, setColsSort, resetData, setResetData}}>
            {children}
        </GridViewContext.Provider>
    );
}

export default GridViewProvider;
export { useGridViewContext}
