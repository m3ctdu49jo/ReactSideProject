import React, { useState, useEffect } from "react";
import styled from "styled-components";
import style from "../styles/style.module.css";


function fetchData(){
    let data;
    return fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "get"
    }).then(response => response.json());
}



function NewsLoop(){
    const [currentNewsId, setCurrentNewsId] = useState(0);
    const [newsItems, setNewsItems] = useState([]);
    const [shouldFetch, setShouldFetch] = useState(false);
    const [newsArray, setNewsArray] = useState([]);
    const displayedCount = 5;

    useEffect(() => {
        if(!shouldFetch){
            fetchData().then(data => { 
                let currentNewsIndex;
                if (currentNewsId !== 0){
                    currentNewsIndex = data.findIndex(x => x.id === currentNewsId);
                } else{
                    currentNewsIndex = 0;
                }

                let items = [];
                for(let i = 0;items.length < displayedCount;){
                    currentNewsIndex = currentNewsIndex + 1 === data.length ? 0 : currentNewsIndex;
                    items.push(data[currentNewsIndex + i]);
                    i++;
                }
                setNewsArray(data);
                setNewsItems(newsArray);
                console.log(data);
                setShouldFetch(true);
            });
        }
    }, [shouldFetch]);

    useEffect(() => {        
        const id = setInterval(() => {
            let currentNewsIndex;            
            if (currentNewsId !== 0){
                currentNewsIndex = newsArray.findIndex(x => x.id === currentNewsId);
            } else{
                currentNewsIndex = 0;
            }

            let items = [];
            const newsCount = newsArray.length;
            for(let i = 0;items.length < displayedCount;){
                // 若超過資料筆數上限，改得知目前超出筆數，透過下方 n + i 換算得知為資料的 1 ~ n 筆
                let n = currentNewsIndex + i >= newsCount ? currentNewsIndex - newsCount : currentNewsIndex;
                items.push(newsArray[n + i]);
                i++;
            }
            setNewsItems(items);

            // 從下一個id開始取
            setCurrentNewsId(newsArray[currentNewsIndex + 1 === newsCount ? 0 : currentNewsIndex + 1].id);
            // console.log(currentNewsIndex);
        }, 2000);
        return () => { clearTimeout(id) };
    }, [shouldFetch, currentNewsId]);



    return (
        <div>
            <ul>
                {
                    newsItems.map((news) => <li key={news.id}>{ news.id + news.title }</li>)
                }
            </ul>
        </div>
    );
}

export default NewsLoop;