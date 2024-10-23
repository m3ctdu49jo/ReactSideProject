import React, { useState, useEffect } from "react";
import styled from "styled-components";
import style from "../styles/style.module.css";

const NewsWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 680px;
    height: 400px;
    margin: 0 auto;

    ul {
    }

    li {
        background: #eee;
        display: block;
        margin-bottom: 10px;
        padding: .8rem .8rem;
        border-radius: 5px;
    }
`;

function fetchData(){
    let data;
    return fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "get"
    }).then(response => response.json());
}

// 共用函式抽離
function displayNewsItemsWithIndex(newsData, currentNewsId, setNewsItems){
    const displayedCount = 5;
    let currentNewsIndex;            
    if (currentNewsId !== 0){
        currentNewsIndex = newsData.findIndex(x => x.id === currentNewsId);
    } else{
        currentNewsIndex = 0;
    }

    let items = [];
    const newsCount = newsData.length;
    for(let i = 0;items.length < displayedCount;){
        // 若超過資料筆數上限，改得知目前超出筆數，透過下方 n + i 換算得知為資料的 1 ~ n 筆
        let n = currentNewsIndex + i >= newsCount ? currentNewsIndex - newsCount : currentNewsIndex;
        items.push(newsData[n + i]);
        i++;
    }
    setNewsItems(items);
    return currentNewsIndex;
}


function NewsLoop(){
    const [currentNewsId, setCurrentNewsId] = useState(0);
    const [newsItems, setNewsItems] = useState([]);
    const [shouldFetch, setShouldFetch] = useState(false);
    const [newsArray, setNewsArray] = useState([]);

    useEffect(() => {
        if(!shouldFetch){
            fetchData().then(data => { 
                displayNewsItemsWithIndex(data, currentNewsId, setNewsItems);
                setNewsArray(data);
                setShouldFetch(true);
            });
        }
    }, [shouldFetch]);

    useEffect(() => {        
        const id = setInterval(() => {
            let currentNewsIndex = displayNewsItemsWithIndex(newsArray, currentNewsId, setNewsItems);
            // 從下一個id開始取
            setCurrentNewsId(newsArray[currentNewsIndex + 1 === newsArray.length ? 0 : currentNewsIndex + 1].id);
        }, 2000);
        return () => { clearTimeout(id) };
    }, [shouldFetch, currentNewsId]);



    return (
        <NewsWrap>
            <ul>
                {
                    newsItems.reverse().map((news) => <li key={news.id}>{ news.id + news.title }</li>)
                }
            </ul>
        </NewsWrap>
    );
}

export default NewsLoop;