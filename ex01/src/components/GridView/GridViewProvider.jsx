import React, {useState, createContext, useContext, useCallback} from "react";


const GridViewContext = createContext();
const useGridViewContext = () => useContext(GridViewContext);

function GridViewProvider({children}) {
    const [dataItems, setDataItems] = useState([]);
    const [pageItems, setPageItems] = useState([]);
    const [colsSort, setColsSort] = useState([]);
    const handleDataItems = useCallback((items) => {
        setDataItems(items);
    });

    return (
        <GridViewContext.Provider value={{dataItems, setDataItems, pageItems, setPageItems, colsSort, setColsSort}}>
            {children}
        </GridViewContext.Provider>
    );
}

export default GridViewProvider;
export { useGridViewContext}
