import React, {useState, createContext, useContext, useCallback} from "react";


const GridViewContext = createContext();
const useGridViewContext = () => useContext(GridViewContext);

function GridViewProvider({children}) {
    const [dataItems, setDataItems] = useState([]);
    const [pageItems, setPageItems] = useState([]);
    const [colsSort, setColsSort] = useState([]);
    const [resetData, setResetData] = useState(false);
    const handleDataItems = useCallback((items) => {
        setDataItems(items);
    });

    return (
        <GridViewContext.Provider value={{dataItems, setDataItems, pageItems, setPageItems, colsSort, setColsSort, resetData, setResetData}}>
            {children}
        </GridViewContext.Provider>
    );
}

export default GridViewProvider;
export { useGridViewContext}
