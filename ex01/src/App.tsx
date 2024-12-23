import React, { StrictMode, useEffect, useState } from "react";
import { Provider } from "react-redux"
import store from "./store/store";
import GridDetailTest from "./pages/GridDetailTest";
import QuickSearchTest from "./pages/QuickSearchTest";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Layout from "./components/Common/Layout";


//components 以大寫開頭
export default function App(){
    return (
        <>
            <StrictMode>
            <Provider store={store}>
                <BrowserRouter basename="/pages">
                    <Routes>
                        <Route element={<Layout />}>
                            <Route path="/" />
                            <Route path="/GridDetailTest" element={<GridDetailTest />} />
                            <Route path="/QuickSearchTest" element={<QuickSearchTest />} />
                        </Route>
                    </Routes>
                    {/* <GridDetailTest /> */}
                    {/* <QuickSearchTest /> */}
                </BrowserRouter>
                </Provider>
            </StrictMode>
        </>
    );
}