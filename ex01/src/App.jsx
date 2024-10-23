import React from "react";
import FlashBox from "./components/FlashBox";
import QuestionBox from "./components/QuestionBox";
import ArticleBox from "./components/ArticleBox";
import NewsLoop from "./components/NewsLoop";


//components 以大寫開頭
export default function App(){
    return (
        <>
            {/* <FlashBox /> */}
            {/* <QuestionBox /> */}
            {/* <ArticleBox /> */}
            <NewsLoop />
        </>
    );
}