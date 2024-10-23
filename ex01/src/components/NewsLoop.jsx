import React, { useState, useEffect, useMemo } from "react";
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
    // const [nextNewsId, setNextNewsId] = useState("");
    const [newsArray, setNewsArray] = useState([]);
    // const newsArray = useMemo(() => fetchData().then(d => setData(d)), []);

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
                for(let i = 0;items.length <= 4;){
                    currentNewsIndex = currentNewsIndex + 1 === data.length ? 0 : currentNewsIndex;
                    items.push(data[currentNewsIndex + i]);
                    i++;
                    //console.log(data[currentNewsIndex + i]);
                }
                setNewsArray(data);
                setNewsItems(newsArray);
                console.log(data);
                setShouldFetch(true);
            });
        }
        const id = setInterval(() => {
            //console.log(newsArray);
            let currentNewsIndex;
            currentNewsIndex = currentNewsIndex + 1 === newsArray.length ? 0 : currentNewsIndex + 1;
            
            if (currentNewsId !== 0){
                currentNewsIndex = newsArray.findIndex(x => x.id === currentNewsId);
            } else{
                currentNewsIndex = 95;
            }

            let items = [];
                for(let i = 0;items.length <= 4;){
                    currentNewsIndex = currentNewsIndex + 1 === newsArray.length ? 0 : currentNewsIndex;
                    items.push(newsArray[currentNewsIndex + i]);
                    console.log(newsArray[currentNewsIndex + i]);
                    i++;
                    //console.log(newsArray[currentNewsIndex + i]);
                }
                setNewsItems(items);

            //從這排錯 id=96報錯
            setCurrentNewsId(newsArray[currentNewsIndex + 1 === newsArray.length ? 0 : currentNewsIndex].id);
            console.log(currentNewsIndex);
        }, 1000);
        return () => { clearTimeout(id) };
    }, [shouldFetch, currentNewsId]);



    return (
        <div>
            1
            <ul>
                {
                    newsItems.map((news) => <li key={news.id}>{ news.title }</li>)
                }
            </ul>
        </div>
    );
}

export default NewsLoop;