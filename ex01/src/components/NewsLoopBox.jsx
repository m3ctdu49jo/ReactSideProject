import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import style from "../styles/style.module.css";

const NewsWrap = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 680px;
    height: 400px;
    margin: 100px auto 0;

    ul {
        width: 100%;
        height: 230px;
        opacity: 1;
        transition: transform 1s ease-out, opacity 1s ease-out;
        position: relative;
        overflow: hidden;
        border: 1px solid #eee;
    }

    li {
        background: #f2f2f2;
        display: block;
        width: 80%;
        margin: 0 auto;
        padding: .8rem .8rem;
        border-radius: 5px;
        transition: transform 1s ease-out, opacity 1s ease-out;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;

        font {
            color: #ccc;
        }
    }
`;

async function fetchData(){
    let data;
    return await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "get"
    }).then(response => response.json());
}

// 函式抽離
function InitDisplayNewsItems(newsData, currentNewsId, setNewsItems, isInit = false){
    const displayedCount = 5;
    let currentNewsIndex;   
    let items = [];         
    
    currentNewsIndex = currentNewsId !== 0 ? newsData.findIndex(x => x.id === currentNewsId) : 0;

    const newsCount = newsData.length;
    
    if(isInit)
        items.push(newsData[newsCount - 1]);
    for(let i = 0;items.length < displayedCount;){
        // 若超過資料筆數上限，改得知目前超出筆數，透過下方 n + i 換算得知為資料的 1 ~ n 筆
        let n = currentNewsIndex + i >= newsCount ? currentNewsIndex - newsCount : currentNewsIndex;
        items.push(newsData[n + i]);
        i++;
    }
    setNewsItems(items);
}


function NewsLoopBox(){
    const [currentNewsId, setCurrentNewsId] = useState(0);
    const [newsItems, setNewsItems] = useState([]);
    const [shouldFetch, setShouldFetch] = useState(true);
    const [newsArray, setNewsArray] = useState([]);
    const newsItemRef = useRef([]);
    const [trans, setTrnas] = useState(false);
    const [elmsTop, setElmsTop] = useState([]);
    const [newsTimeout, setNewsTimeout] = useState(true);

    useEffect(() => {
        if(shouldFetch){
            fetchData().then(data => { 
                InitDisplayNewsItems(data, currentNewsId, setNewsItems, newsItems.length === 0);
                setNewsArray(data);
                setTrnas(true); 
                setShouldFetch(false);
            });
        }
    }, [shouldFetch]);

    useEffect(() => {    
        if(!newsTimeout)
            return;  
        const id = setInterval(() => {
            let currentNewsIndex;            
            if (currentNewsId !== 0){
                currentNewsIndex = newsArray.findIndex(x => x.id === currentNewsId);
            } else{
                currentNewsIndex = newsArray.findIndex(x => x.id === newsItems[newsItems.length - 1].id);
            }

            let items = [...newsItems];
            const newsCount = newsArray.length;
            
            let addItemIndex = currentNewsIndex + 1 === newsCount ? 0 : currentNewsIndex + 1;
            items.push(newsArray[addItemIndex]);


            if(!shouldFetch)
                items = items.slice(1);
 
            setNewsItems(items);
            setTrnas(true); //重新計算間隔
            // 從下一個id開始取
            setCurrentNewsId(newsArray[currentNewsIndex + 1 === newsArray.length ? 0 : currentNewsIndex + 1].id);
        }, 5000);
        setNewsTimeout(true);
        return () => { 
            clearTimeout(id);
        };
    }, [shouldFetch, currentNewsId, newsTimeout]);


    useEffect(() => {
        let newElmsTop = [];
        let m = 0;
        newsItemRef.current.map((elm, index) => {
            let mrg = 20;
            let firstElemMove = (elm.offsetHeight + (mrg / 2)) * -1;
            if((index === 1 || index === 4))
                mrg = 40;
            m += (elm.previousElementSibling ? (elm.previousElementSibling.offsetHeight + mrg) : firstElemMove);
            newElmsTop.push(m);
        });
        setElmsTop(newElmsTop);
        setTrnas(false);
    }, [trans]);




    return (
        <NewsWrap>
            <ul onMouseEnter={() => {setNewsTimeout(false);console.log('in')}} onMouseLeave={() => {setNewsTimeout(true);console.log('out')}}>
                {
                    newsItems.map((news, index) => {
                        let top = elmsTop ? elmsTop[index] : 0;
                        return <li key={news.id} ref={el => newsItemRef.current[index] = el} style={{transform: `translateY(${top}px)`}}><font>{ news.id + '. ' }</font>{ news.title }</li>
                    })
                }
            </ul>
        </NewsWrap>
    );
}

export default NewsLoopBox;