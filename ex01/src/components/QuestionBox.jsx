import React, {useState, useMemo, useEffect} from "react";
import styled from "styled-components"
import style from "../styles/style.module.css"

let questionAndAnswers = {"themes":["題目一", "題目二", "題目三"], "answers": ["答案一", "答案二", "答案三"]};

const ThemeBox = styled.strong`
    font-size: 1.3rem;
    background: #eee;
    display: block;
    padding: .5rem .8rem;
    border-bottom: 1px solid #ddd;
    position: relation;
    &:after{    
        content: "＞";
        font-size: 16px;
        font-weight: normal;
        text-align: center;
        line-height: 30px;
        width: 30px;
        height: 30px;
        position: absolute;
        transform: rotate(${props => props.$activeTheme && props.theme === props.$activeTheme ? "90deg" : "0deg"})
    }
`;
const AnswerBox = styled.p`
    padding: .5rem;
    margin: 0;
    margin-bottom: 1rem;
    display: ${props => props.$activeTheme && props.theme === props.$activeTheme ? "block" : "none"};
`;
// React 的特性之一：不允許未知的 props 傳遞到 DOM 元素中。
// 使用 styled-components 定義一個樣式化的 React 組件時，如果傳入的 props（例如 "active"）並非標準 HTML 元素的屬性，
// React 會顯示警告，因為這些 props 會被直接傳遞到 DOM 元素中，但 DOM 本身無法理解這些非標準屬性。
// ※使用 Transient Props（臨時 props）： 
// 解決這個問題，可以使用 $ 前綴的 transient props。
// 這樣的 props 不會傳遞到 DOM 元素中，僅供樣式處理使用。


const Items = function({theme, answer, activeTheme, setThemeActive}){
    
    function openAnswer(){
        setThemeActive(theme);
    }

    return (
        <li key={theme}>
            <ThemeBox theme={theme} $activeTheme={activeTheme} onClick={openAnswer}>{theme}</ThemeBox>
            {/* 臨時 props，使用 $ 前綴的 transient props */}
            <AnswerBox theme={theme} $activeTheme={activeTheme}>{answer}</AnswerBox>
        </li>
    );
}

function QuestionBox(){
    const [themeActive, setThemeActive] = useState("");


    return (
        <div>
            <ul>
                {
                    questionAndAnswers.themes.map((theme, index) => {
                        let answer = questionAndAnswers.answers[index];
                        return (<Items key={theme} theme={theme} answer={answer} activeTheme={themeActive} setThemeActive={setThemeActive} />);
                    })
                }
            </ul>
        </div>
    );
}

export default QuestionBox;