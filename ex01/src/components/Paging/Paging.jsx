import React, { useEffect, useState, useRef } from "react";
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
    color: ${props => props.$disabled ? "#888 !important" : "inherit"};
    background: ${props => props.$disabled ? "#d5d5d5 !important" : "inherit"};
    border: 1px solid #ddd;
    cursor: ${props => props.$disabled ? "not-allowed !important" : "inherit"};
`;
const PagingInput = styled.input`
    font-size: .7rem;
    text-align: center;
    width: 40px;
    padding: .2rem;
`;

function tryParseInt(strNum){
    let isNum = (/^\d*$/).test(strNum) && strNum;
    return isNum;
}

function defParseInt(strNum, defaultNum) {
    return tryParseInt(strNum) ? parseInt(strNum) : defaultNum;
}

function pagingCalculate(dataCount, pagingPerNum){
    let count = 1;
    count = Math.ceil(dataCount / pagingPerNum);
    count = count > 0 ? count : count;
    return count;
}

function Paging({dataNum = 200}){
    const [currentNum, setCurrentNum] = useState(1);
    const [pagingItems, setPagingItems] = useState([]);
    const maxPagingItem = 5;
    const pagingInput = useRef(null);
    const pagingPerInput = useRef(null);
    const [pagingCount, setPagingCount] = useState(1);
    const [pagingPer, setPagingPer] = useState(10);

    useEffect(() => {        
        let pagings = [];
        let pagingPer = pagingPerInput.current.value;
        let count = 1;

        pagingPer = pagingPer !== "" ? pagingPer : "10";

        if(!tryParseInt(pagingPer)){
            alert("請輸入數字");
            return;
        }
        pagingPer = defParseInt(pagingPer, 10);
        pagingPer = pagingPer <= 0 ? 10 : pagingPer;
        setPagingPer(pagingPer);

        count = pagingCalculate(dataNum, pagingPer);
        setPagingCount(count);

        if(maxPagingItem >= count){
            for(let i = 1;;){
                pagings.push(i);
                if(i >= count)
                    break;
                i++;
            }
        }   // 1 2 3 4
        
        if(maxPagingItem < count && currentNum + 3 >= count){
            let beginNum;
            pagings.push(1);
            pagings.push("...");
            if(currentNum - 2 === 1)
                beginNum = 3;
            else
                beginNum = count - 4;

            for(;;){
                pagings.push(beginNum);
                if(beginNum === count)
                    break;
                beginNum++;
            }
        }   // 1 ... 4 5 6 7 8 9
        
        if(count > maxPagingItem && currentNum + 3 <= count && currentNum <= 4){
            let beginNum;
            if(currentNum - 3 <= 1)
                beginNum = 1;

            for(let i = 0; i < 5; i++){
                pagings.push(beginNum);
                beginNum++;
            }
            pagings.push("...");
            pagings.push(count);
        }   // 1 2 3 4 5 ... 20

        if(count >= 10 && currentNum < count - 2 && currentNum - 3 > 1 && currentNum + 4 <= count){
            let beginNum;
            pagings.push(1);
            pagings.push("...");

            beginNum = currentNum - 2;
            for(;;){
                pagings.push(beginNum);
                if(beginNum === currentNum + 2)
                    break;
                beginNum++;
            }

            pagings.push("...");
            pagings.push(count);
        }   // 1 ... 4 5 6 7 8 ... 11

        setPagingItems(pagings);

    }, [dataNum, currentNum, pagingPer]);

    function pagingPrevNext(clickType){
        let newCurrentNum = currentNum;
        if(clickType === "prev"){
            if(currentNum - 1 >= 1)
                newCurrentNum = currentNum - 1;
        } else {
            if(currentNum + 1 <= pagingCount)
                newCurrentNum = currentNum + 1;
        }
        setCurrentNum(newCurrentNum);
    }

    function pagingGo(){
        setCurrentNum(defParseInt(pagingInput.current.value, 1));
        setPagingPer(defParseInt(pagingPerInput.current.value, 10));
    }

    useEffect(() => {
        let inputNum = pagingInput.current.value;
        let inputPerNum = pagingPerInput.current.value;
        let newPagingCount, newCorrentNum;
        
        if((!tryParseInt(inputNum) && inputNum !== "") || (!tryParseInt(inputPerNum) && inputPerNum !== ""))
            alert("請輸入數字");
        else
        {
            inputPerNum = defParseInt(pagingPerInput.current.value, 10);
            newPagingCount = pagingCalculate(dataNum, inputPerNum);
            if(inputNum !== ""){
                inputNum = defParseInt(inputNum, currentNum);
                inputNum = inputNum > pagingCount ? pagingCount : inputNum;
                pagingInput.current.value = inputNum;
                newCorrentNum = newPagingCount < inputNum ? newPagingCount : inputNum;
                if(newPagingCount < inputNum)
                    setCurrentNum(newPagingCount);
            }else{
                newCorrentNum = newPagingCount < currentNum ? newPagingCount : currentNum;
                setCurrentNum(newCorrentNum);
            }
            setPagingCount(newPagingCount);
            setPagingPer(inputPerNum);
        }
    }, [dataNum, currentNum, pagingPer]);

    // function reviewPaging(){
    //     let inputNum = pagingInput.current.value;
    //     let inputPerNum = pagingPerInput.current.value;
    //     let newPagingCount, newCorrentNum;
        
    //     if((!tryParseInt(inputNum) && inputNum !== "") || (!tryParseInt(inputPerNum) && inputPerNum !== ""))
    //         alert("請輸入數字");
    //     else
    //     {
    //         inputPerNum = defParseInt(pagingPerInput.current.value, 10);
    //         newPagingCount = pagingCalculate(dataNum, inputPerNum);
    //         if(inputNum !== ""){
    //             inputNum = defParseInt(inputNum, currentNum);
    //             inputNum = inputNum > pagingCount ? pagingCount : inputNum;
    //             pagingInput.current.value = inputNum;
    //             newCorrentNum = newPagingCount < inputNum ? newPagingCount : inputNum;
    //             if(newPagingCount < inputNum)
    //                 setCurrentNum(newPagingCount);
    //         }else{
    //             newCorrentNum = newPagingCount < currentNum ? newPagingCount : currentNum;
    //             setCurrentNum(newCorrentNum);
    //         }
    //         console.log(3);
    //         setPagingPer(inputPerNum);
    //     }
    // }

    return (
        <>
            <PagingBox>
                {
                    pagingItems.map((item, index) => {
                        return item !== "..." ? 
                            item === currentNum ? <div key={item} className="active">{item}</div> : <div key={item} onClick={() => {setCurrentNum(item)}}>{item}</div>
                            : 
                            <div key={item + index} className="normal">{item}</div>;
                    })
                }
                <PagingArrow $disabled={currentNum === 1} onClick={() => {pagingPrevNext("prev")}}>{"<"}</PagingArrow>
                <PagingArrow $disabled={currentNum === pagingCount} onClick={() => {pagingPrevNext("next")}}>{">"}</PagingArrow>
                <div className="normal">
                    <PagingInput type="text" min="0" max={pagingCount} ref={elm => pagingInput.current = elm} />
                </div>
                <div onClick={() => {pagingGo()}}>Go</div>
                <div className="normal">☰</div>
                <div className="normal">
                    <PagingInput type="text" placeholder="10" ref={elm => pagingPerInput.current = elm} />
                </div>
                {" / " + dataNum}
            </PagingBox>
        </>
    );
}

export default Paging;