import React, { useEffect, useState } from "react";
import { Provider } from "react-redux"
import store from "./store/store";
import GridDetailTest from "./pages/GridDetailTest";
import QuickSearchTest from "./pages/QuickSearchTest";


//components 以大寫開頭
export default function App(){
    return (
        <>
            <Provider store={store}>
                {/* <GridDetailTest /> */}
                <QuickSearchTest />
            </Provider>
        </>
    );
}