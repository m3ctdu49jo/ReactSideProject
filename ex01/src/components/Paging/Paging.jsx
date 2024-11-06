import React, { useState } from "react";
import styled from "styled-components";

const PagingBox = styled.div`
    font-size: .7rem;
    font-family: sans-serif;
    display: flex;
    align-items: center;

    div {
        padding: .3rem .5rem;
        background: #eee;
        margin-right: .35rem;
        border-radius: 3px;
        cursor: pointer;
        transition: all 0.1s ease;
        
        &:hover {
            background: #ccc;
        }
    }
    div.active {
        color: #fff;
        background: #55d1cc;
    }
    div.normal {
        background: none;
        padding-left: 0;
        padding-right: 0;
    }
`;
const PagingArrow = styled.div`
    padding: .3rem .5rem;
    border: 1px solid #ddd;
`;
const PagingInput = styled.input`
    font-size: .7rem;
    text-align: center;
    width: 40px;
    padding: .2rem;
`;

function Paging({dataNum = 20}){
    const [currentNum, serCurrentNum] = useState();
    const maxPagingItem = 5;
    const pagingItems = [];

    
    if(maxPagingItem > dataNum){
        for(let i = 1;;){
            pagingItems.push(i);
            if(i >= dataNum)
                break;
            i++;
        }
    }   // 1 2 3 4
    
    if(maxPagingItem < dataNum && dataNum < 10){
        let beginNum;
        pagingItems.push(1);
        pagingItems.push("...");
        if(currentNum - 2 === 1)
            beginNum = 3;
        else
            beginNum = currentNum - 2;

        for(;;){
            pagingItems.push(beginNum);
            if(beginNum === dataNum)
                break;
            beginNum++;
        }
    }   // 1 ... 4 5 6 7 8 9

    
    // if(maxPagingItem < dataNum && dataNum <= 8){
    //     let beginNum;
    //     pagingItems.push(1);
    //     pagingItems.push("...");
    //     if(currentNum - 2 === 1)
    //         beginNum = 3;
    //     else
    //         beginNum = currentNum - 2;

    //     for(;;){
    //         pagingItems.push(beginNum);
    //         if(beginNum === dataNum)
    //             break;
    //         beginNum++;
    //     }
    // }   // 1 2 3 4 5 ... 8

    if(dataNum >= 10 && currentNum < dataNum - 2){
        let beginNum;
        pagingItems.push(1);
        pagingItems.push("...");

        beginNum = currentNum - 2;
        for(;;){
            pagingItems.push(beginNum);
            if(beginNum === currentNum + 2)
                break;
            beginNum++;
        }

        pagingItems.push("...");
        pagingItems.push(dataNum);
    }   // 1 ... 4 5 6 7 8 ... 11

    return (
        <>
            <PagingBox>
            </PagingBox>
            <PagingBox>
                <div>1</div>
                <div className="normal">...</div>
                <div>3</div>
                <div>4</div>
                <div className="active">5</div>
                <div>6</div>
                <div>7</div>
                <div className="normal">...</div>
                <div>10</div>
                <PagingArrow>{"<"}</PagingArrow>
                <PagingArrow>{">"}</PagingArrow>
                <div className="normal">
                    <PagingInput type="text" />
                </div>
                <div>Go</div>
            </PagingBox>
        </>
    );
}

export default Paging;