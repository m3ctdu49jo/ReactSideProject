import React, { StrictMode, useEffect, useState } from "react";
import { Provider } from "react-redux"
import store from "./store/store";
import GridDetailTest from "./pages/GridDetailTest";
import QuickSearchTest from "./pages/QuickSearchTest";


//components 以大寫開頭
export default function App(){
    return (
        <>
            <StrictMode>
                <Provider store={store}>
                    {/* <GridDetailTest /> */}
                    <QuickSearchTest />
                </Provider>
            </StrictMode>
        </>
    );
}