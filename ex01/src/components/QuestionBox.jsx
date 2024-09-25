import React from "react";

let questionAndAnswer = {"themes":["題目一", "題目二", "題目三"], "answers": ["答案一", "答案二", "答案三"]};

const Items = function({theme, answer}){
    return (
        <li>
            <strong>{theme}</strong>
            <p>{answer}</p>
        </li>
    );
}

function QuestionBox(){
    return (
        <div>
            <ul>
                {
                    questionAndAnswer.themes.map((theme, index) => {
                        let answer = questionAndAnswer.answers[index];
                        return (<Items key={theme} answer={answer} theme={theme} />);
                    })
                }
            </ul>
        </div>
    );
}

export default QuestionBox;