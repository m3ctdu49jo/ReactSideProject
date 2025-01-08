import React, { StrictMode, useEffect, useState } from "react";
import { Provider } from "react-redux"
import store from "./store/store";
import GridDetailTest from "./pages/GridDetailTest";
import QuickSearchTest from "./pages/QuickSearchTest";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Layout from "./components/Common/Layout";
import Home from "./pages/Home";
import AlbumTest from "./pages/AlbumTest";
import About from "./pages/About";
import Album from "./pages/Album";


//components 以大寫開頭
export default function App(){
    let imgs = ["img01", "img03", "img01", "img03", "img03", 
        "img03", "img01", "img03", "img01", "img03"];
    return (
        <>
            <StrictMode>
            <Provider store={store}>
                <BrowserRouter basename="/">
                    <Routes>
                        <Route element={<Layout />}>
                            <Route path="/About" element={<About />} />
                            <Route path="/Album" element={<Album />} />
                            <Route path="/GridDetailTest" element={<GridDetailTest />} />
                            <Route path="/QuickSearchTest" element={<QuickSearchTest />} />                            
                            <Route path="/" element={<Home />} />   
                        </Route>
                        <Route path="/testComponent" element={<AlbumTest imgList={imgs} />} />
                    </Routes>
                </BrowserRouter>
                </Provider>
            </StrictMode>
        </>
    );
}