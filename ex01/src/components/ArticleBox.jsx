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
    display: block;
    width: 100%;
    // margin: 0 1rem;
    position: relative;
    overflow: hidden;
`;

const ArticleWrap = {
    display: 'flex',
    
}

const ContentBox = styled.div`
    color: #fff;
    font-family: Arial, Helvetica, sans-serif;
    background: rgba(0, 0, 0, .5);
    width: 100%;
    height: 200px;
    padding: 1rem;
    position: absolute;
    left: 0;
    bottom: ${props => props.$show ? "0px" : "-145px" };
    transition: all .35s ease-out;

    strong {
        font-size: 1.5rem;
        display: block;
        width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    p {
        display: -webkit-box;
        -webkit-line-clamp: 3; /* 設定顯示 3 行 */
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
`;


function ArticleBox() {
    const [articles, setArticles] = useState(0);
    // 狀態shouldFetch比articles.length較有更高的可控性
    const [shouldFetch, setShouldFetch] = useState(false);
    const [firstArticleId, setFirstArticleId] = useState("");
    const [showTextId, setShowTextId] = useState("");
    const [articleImgs, setArticleImgs] = useState([]);
    const count = articles ? articles.length : 0;
    
    const fetchData = useCallback(() => {
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'GET'
        }).then(response => response.json()).then(data => {
            let displayItems = [];
            data.map(item => {
                if(item.id >= firstArticleId && displayItems.length <= 2){
                    displayItems.push(item);
                    if(displayItems.length === 1)
                        setFirstArticleId(item.id);
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


    function showArticleText(articleId){
        setShowTextId(articleId);
    }


    let images = require.context("../images/displays", false, /\.jp?g$/);

    return (
        <DisplayBox className={style.displayBox}>
            <div style={{marginBottom: "15px"}}>
                <button type="button" onClick={() => {setShouldFetch(true)}} style={{marginRight: "10px"}}>獲取資料</button>{/* 原本是 fetchData() */}
                <button type="button" onClick={() => {setArticles(null)}}>清空資料</button>
            </div>
            <ul style={ArticleWrap}>
                {
                    articles ? articles.map(article => {
                    
                    //儲存img，渲染會跑
                    setArticleImgs(`img0${Math.floor(Math.random() * 5) + 1}`);
                    return (
                        <ArticleItems key={article.id} $img={images(`./img0${Math.floor(Math.random() * 5) + 1}.jpg`)} onMouseOver={() => showArticleText.call(this, article.id)} onMouseOut={() => showArticleText.call(this, "")}>
                            <ContentBox $show={showTextId === article.id}>
                                <strong>{article.title}</strong>
                                <p>{article.body}</p>
                            </ContentBox>
                        </ArticleItems>
                    )}) : ""
                }
            </ul>
        </DisplayBox>
    );
}

export default ArticleBox;


