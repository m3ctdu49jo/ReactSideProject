import React, {useState, createContext, useContext, useCallback} from "react";


const GridViewContext = createContext();
const useGridViewContext = () => useContext(GridViewContext);

function GridViewProvider({children}) {
    const [dataItems, setDataItems] = useState([]);
    const [colsSort, setColsSort] = useState([]);
    const handleDataItems = useCallback((items) => {
        setDataItems(items);
    });

    return (
        <GridViewContext.Provider value={{dataItems, setDataItems, colsSort, setColsSort}}>
            {children}
        </GridViewContext.Provider>
    );
}

export default GridViewProvider;
export { useGridViewContext}
