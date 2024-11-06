import React from "react";
import styled from "styled-components";
import { useGridViewContext } from "./GridViewProvider";
import { useDispatch, useSelector } from "react-redux";
import { setDataItemsR, addDataItemsR, setColsSortR } from "../../actions/GridActions";

const ControlBox = styled.div`
    color: #999;
    line-height: 1;
    display: flex;
    background: #fff;
    padding: .3rem .7rem;
    position: absolute;
    transition: transform .5s ease, opacity .5s ease;
    transform: translateY(${props => props.$hover ? "-33px" : "0"});
    opacity: ${props => props.$hover ? 1 : 0};
    right: 0;
    border: 1px solid #ddd;
    border-radius: 3px;
    box-shadow: 0 3px 5px rgba(0, 0, 0, .1);

    div {
        position: relative;
        padding-right: 10px;
        cursor: pointer;
        transition: all .2s ease;
        
        &:after {
            content: "";
            background: #ddd;
            width: 1px;
            height: 10px;
            margin: auto 0;
            position: absolute;
            top: 0;
            right: 5px;
            bottom: 0;
        }
        &:last-child {        
            padding-right: 0;

            &:after {
                display: none;
            }
        }
        &:hover {
            color: #5695e1;
        }
    }
    
    
    &:after {
        content: "";
        width: 100%;
        height: 10px;
        position: absolute;
        left: 0;
        bottom: -10px;
    }
`;



function ControlBar({gridHover, initialDataRef}){

    //const {setDataItems, setColsSort} = useGridViewContext();
    const dispatch = useDispatch();
    
    function resetData(){
        // let d = [...initialDataRef.current];
        // d.push({ orderNum: "A124469", orderSeq: "1", productId: "A1A356950", productName: "紡織布" });
        // initialDataRef.current = d;
        let addItem = { orderNum: "A124469", orderSeq: "1", productId: "A1A356950", productName: "紡織布" };
        dispatch(addDataItemsR([addItem]));
        initialDataRef.current = [...initialDataRef.current, addItem];
        resetSortAndInitData();

    }
    function resetSortAndInitData(){
        //setColsSort([]);
        dispatch(setColsSortR([]));
        resetInitData();
    }

    function resetInitData(){
        //setDataItems(initialDataRef.current);
        dispatch(setDataItemsR(initialDataRef.current));
    }
    return (
        <ControlBox $hover={gridHover}>
            <div title="重製排序" onClick={() => resetSortAndInitData()}>⥯</div>
            <div title="資料重整" onClick={() => resetData()}>↻</div>
        </ControlBox>
    );
}

export default ControlBar;