import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { tryParseInt, defParseInt} from "../../lib";

interface PagingBoxProps {
    $noData: boolean;
}

interface PagingArrowProps {
    $disabled: boolean;
}

const PagingBox = styled.div<PagingBoxProps>`
    font-size: .7rem;
    font-family: sans-serif;
    display: ${props => props.$noData ? "none" : "flex"};
    align-items: center;
    justify-content: center;
    margin-top: 10px;

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
const PagingArrow = styled.div<PagingArrowProps>`
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

function pagingCalculate(dataCount: number, pagingPerNum: number){
    let count;
    count = Math.ceil(dataCount / pagingPerNum);
    count = count > 1 ? count : 1;
    return count;
}

function Paging({dataNum, onPagingChange, currentNumToFirst}: {dataNum:number;onPagingChange: Function; currentNumToFirst: boolean;}){
    const [currentNum, setCurrentNum] = useState(1);
    const [pagingItems, setPagingItems] = useState<(string | number)[]>([]);
    const maxPagingItem = 5;
    const pagingInput = useRef<HTMLInputElement | null>(null);
    const pagingPerInput = useRef<HTMLInputElement | null>(null);
    const [pagingCount, setPagingCount] = useState(1);
    const [pagingPer, setPagingPer] = useState(10);

    // 分頁數處理
    useEffect(() => {        
        let pagings: (string | number)[] = [];
        let pagingPer: string | number = !pagingPerInput || !pagingPerInput.current ? "10" : pagingPerInput.current.value;
        let count = 1;


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
            let beginNum: number = 1;
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

    function pagingPrevNext(clickType: string){
        let newCurrentNum = currentNum;
        if(clickType === "prev"){
            if(currentNum - 1 >= 1)
                newCurrentNum = currentNum - 1;
        } else {
            if(currentNum + 1 <= pagingCount)
                newCurrentNum = currentNum + 1;
        }
        setCurrentNum(newCurrentNum);
        onPagingChange(newCurrentNum, pagingPer);
    }

    function pagingGo(){
        if(pagingInput?.current){
            setCurrentNum(defParseInt(pagingInput.current.value, 1));
        }
        if(pagingPerInput?.current){
            setPagingPer(defParseInt(pagingPerInput.current.value, 10));
        }
    }

    function onPagingClick(num: number){
        setCurrentNum(num);
        onPagingChange(num, pagingPer);
    }

    useEffect(() => {
        if(currentNumToFirst)
            setCurrentNum(1);
    }, [currentNumToFirst]);

    // 每頁顯示筆數, 頁數跳轉處理
    useEffect(() => {
        let inputNum: string | number = pagingInput.current ? pagingInput.current.value : "";
        let inputPerNum: string | number = pagingPerInput.current ? pagingPerInput.current.value : "";
        let newPagingCount, newCurrentNum;
        
        if((!tryParseInt(inputNum) && inputNum !== "") || (!tryParseInt(inputPerNum) && inputPerNum !== ""))
            alert("每頁顯示筆數, 跳轉頁數 請輸入數字");
        else
        {
            inputPerNum = pagingPerInput.current ? defParseInt(pagingPerInput.current.value, 10) : 10;
            newPagingCount = pagingCalculate(dataNum, inputPerNum);
            if(inputNum !== ""){
                inputNum = defParseInt(inputNum, currentNum);
                inputNum = inputNum > pagingCount ? pagingCount : inputNum;
                if(pagingInput.current)
                    pagingInput.current.value = inputNum.toString();
                newCurrentNum = newPagingCount < inputNum ? newPagingCount : inputNum;
                if(newPagingCount < inputNum)
                    setCurrentNum(newPagingCount);
            }else{
                newCurrentNum = newPagingCount < currentNum ? newPagingCount : currentNum;
                setCurrentNum(newCurrentNum);
            }
            setPagingCount(newPagingCount);
            setPagingPer(inputPerNum);
        }
    }, [dataNum, currentNum, pagingPer]);

    return (
        <>
            <PagingBox $noData={dataNum === 0}>
                {
                    pagingItems.map((item, index) => {
                        let n = defParseInt(item, 0);
                        return item !== "..." ? 
                            item === currentNum ? <div key={item} className="active">{item}</div> : <div key={item} onClick={() => {onPagingClick(n)}}>{item}</div>
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