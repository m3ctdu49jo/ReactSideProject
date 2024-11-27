import React, { useEffect, useState } from "react";
import { Provider } from "react-redux"
import store from "./store/store";
import Test from "./Test";


//components 以大寫開頭
export default function App(){
    return (
        <>
            <Provider store={store}>
                <Test />
            </Provider>
        </>
    );
}