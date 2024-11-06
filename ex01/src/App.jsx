import React from "react";
import { Provider } from "react-redux"
import store from "./store/store";
import FlashBox from "./components/FlashBox";
import QuestionBox from "./components/QuestionBox";
import ArticleBox from "./components/ArticleBox";
import NewsLoop from "./components/NewsLoop";
import NewsLoopBox from "./components/NewsLoopBox";
import GridView from "./components/GridView";
import Paging from "./components/Paging/Paging";


//components 以大寫開頭
export default function App(){
    return (
        <>
            <Provider store={store}>
                {/* <FlashBox /> */}
                {/* <QuestionBox /> */}
                {/* <ArticleBox /> */}
                {/* <NewsLoop /> */}
                {/* <NewsLoopBox /> */}
                {/* <GridView /> */}
                <Paging />
            </Provider>
        </>
    );
}