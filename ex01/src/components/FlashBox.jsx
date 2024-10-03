import React, {useState} from "react";
import styled from "styled-components"
import style from "../styles/style.module.css"
import reactImg from "../images/React1.png" //寫法等同於 require 方法引入，透過 Babel 轉譯後還是會使用 CommonJS 加載


let Box = styled.div`
    background: #eee;
    width: 100%;
    max-width: 500px;
    min-height: 500px;
    margin: 0 auto;
    position: relative;
`;

let ArrowBtn = styled.div`
    color: #fff;
    font-size: 1.3rem;
    text-align: center;
    line-height: 40px;
    background: rgba(0, 0, 0, .3);
    width: 40px;
    height: 40px;
    position: absolute;
    top: 150px;
    border-radius: 5px;
    cursor: pointer;
`;

let Button = function(props){
    function changeCurrentActive(){
        let newIndex = props.isNext ? props.currentIndex + 1 : props.currentIndex - 1;
        if(newIndex >= props.liLen){
            newIndex = 0;
        } else if(newIndex < 0){
            newIndex = props.liLen - 1;
        }
        // 父元件的setState方法由子元件觸發，注意是「綁定在元件或HTML標籤的事件(例：onclick)」上而不是直接執行
        props.setActiveIndex(newIndex);
    }


    let arrow = props.isNext ? ">" : "<";
    let arrowStyle = props.isNext ? style.right : style.left;
    return (
        //父元件的setState由子元件的事件觸發
        <ArrowBtn className={arrowStyle} onClick={changeCurrentActive}>{arrow}</ArrowBtn>
    );
}

let DotItem = function({index, activeIndex, setActiveIndex}){
    function setNewActiveIndex(){
        setActiveIndex(index);
    }
    return (
        //class若使用module.css一定都要使用物件的方式
        <li onClick={setNewActiveIndex} className={index === activeIndex ? style.active : ""}></li>
    );
}



// HTML標籤也需要使用className寫法
// 如果import的css沒有以模組的方式匯入*.moDule.css，則在className不能以物件方式使用
// 而是以一般class方式 className="box"
// 導入一般的 CSS（如 style.css），它的樣式是全局的，無法使用物件方式 (style.box) 來引用
// CSS 模組（如 style.module.css）在構建時會生成唯一的、範圍限定的類名，以避免樣式衝突。
export default function FlashBox({name}){
    const imgsName = ["React1", "React2", "React3"];
    const [activeIndex, setActiveIndex] = useState(0);

    // 動態導入圖片，要使用require.context()
    const images = require.context("../images", false, /\.(png|jp?g)$/);
    // 透過require引入
    // <img src={require("../images/React1.png")} />


    return (
        <Box className={style.flashBox}>
            <Button isNext={true} currentIndex={activeIndex} setActiveIndex={setActiveIndex} liLen = {imgsName.length} />
            <Button isNext={false} currentIndex={activeIndex} setActiveIndex={setActiveIndex} liLen = {imgsName.length} />
            <ul className={style.imgList}>
                {
                    imgsName.map((imgName, index) => {
                        //let imgSrc = `../images/${imgName}.png`;  //不可以直接引用
                        let imgSrc = images(`./${imgName}.png`);
                        return (<li key={index} className={index === activeIndex ? style.active : ""}>
                                    <img src={imgSrc} alt={imgName} />
                                </li>);
                    })
                }
            </ul>
            {/* <img style={{width: "300px"}} src={reactImg} /> */}

            <ul className={style.dotList}>
                {
                    imgsName.map((imgName, index) => {
                        return (
                            <DotItem key={index} index={index} activeIndex = {activeIndex} setActiveIndex={setActiveIndex} />
                        );
                    })
                }
            </ul>
        </Box>
    );
}