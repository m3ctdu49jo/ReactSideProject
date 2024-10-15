import React, {useState, useEffect, useCallback} from 'react';
import { styled } from 'styled-components';
import style from '../styles/style.module.css'

const DisplayBox = styled.div`
    max-width: 1280px;
    width: 100%;
    margin: 0 auto;
`;
const ArticleItems = styled.li`
    background-image: url(${props => props.$img});
    background-size: cover;
    // margin: 0 1rem;
`;

const ArticleWrap = {
    display: 'flex',
    
}

const ContentBox = styled.div`
    color: #fff;
    font-family: Arial, Helvetica, sans-serif;
    background: rgba(0, 0, 0, .5);
    padding: 1rem;
`;


function ArticleBox() {
    const [articles, setArticles] = useState(0);
    // 狀態shouldFetch比articles.length較有更高的可控性
    const [shouldFetch, setShouldFetch] = useState(false);
    const [currentArticleId, setCurrentArticleId] = useState("");
    const count = articles ? articles.length : 0;
    
    const fetchData = useCallback(() => {
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'GET'
        }).then(response => response.json()).then(data => {
            let displayItems = [];
            data.map(item => {
                if(item.id >= currentArticleId && displayItems.length <= 2){
                    displayItems.push(item);
                    if(displayItems.length === 1)
                        setCurrentArticleId(item.id);
                }
            });
            setArticles(displayItems);
        });
    }, [shouldFetch]);  // 原本是count

    useEffect(() => {
        // 原本API在"獲取資料"按鈕獲取資料，改以控制shouldFetch狀態，並在Effect獲取API資料

        // if(count !== 0)
        //     fetchData();
        if(shouldFetch){
            fetchData();
            setShouldFetch(false);
        }
    }, [shouldFetch, fetchData]);   // 原本是[count]


    let images = require.context("../images/displays", false, /\.jp?g$/);

    return (
        <DisplayBox className={style.displayBox}>
            <div>
                <button onClick={() => {setShouldFetch(true)}}>獲取資料</button>{/* 原本是 fetchData() */}
                <button onClick={() => {setArticles(null)}}>清空資料</button>
            </div>
            <ul style={ArticleWrap}>
                {
                    articles ? articles.map(article => (
                        <ArticleItems key={article.id} $img={images("./img01.jpg")}>
                            <ContentBox>
                                <strong>{article.title}</strong>
                                <p>{article.body}</p>
                            </ContentBox>
                        </ArticleItems>
                    )) : ""
                }
            </ul>
        </DisplayBox>
    );
}

export default ArticleBox;


