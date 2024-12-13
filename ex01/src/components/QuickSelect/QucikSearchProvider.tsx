import React, { createContext, useContext } from "react";
import { QuickSearchActions } from "./actions/quickSearchActions";
import { quickSearchState } from "./reducers/quickSearchReducer";

interface QuickSearchProviderProps<T> {
    state: quickSearchState<T>;
    disptach: React.Dispatch<QuickSearchActions<T>>;
    children: React.ReactNode;
}

const QuickSearchContext = createContext<QuickSearchProviderProps<any> | null>(null);
function useQuickSearchContext() {
    const context = useContext(QuickSearchContext);

    if(!context)
        throw new Error("useQuickSearchContext must be used within QuickSearchProvider");

    return context;
}


function QuickSearchProvider<T>({children, ...props}: QuickSearchProviderProps<T>){
    const contextValue = {
        ...props,
        children
    }

    return (
        <QuickSearchContext.Provider value={contextValue}>
            {children}
        </QuickSearchContext.Provider>
    );
}

export { useQuickSearchContext };
export default QuickSearchProvider;