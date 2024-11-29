import React from "react";
import styled from "styled-components";
import { useGridViewContext } from "./GridViewProvider";
import { clearClickItemR, clearColsSortR, setResetDataR } from "./actions/GridActions";

const ControlBox = styled.div.withConfig({
        shouldForwardProp: (prop) => prop !== "gridhover"   // boolean 參數，過濾不應傳遞到 DOM 的屬性
    })<ControlBoxProps>`
    color: #999;
    line-height: 1;
    display: flex;
    background: #fff;
    padding: .3rem .7rem;
    position: absolute;
    transition: transform .5s ease, opacity .5s ease;
    transform: translateY(${(props) => (props.gridhover ? "-33px" : "0")});
    opacity: ${(props) => (props.gridhover ? 1 : 0)};
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

interface ControlBoxProps {
    gridhover: boolean;
}


function ControlBar({gridHover}: {gridHover: boolean}){

    const { dispatch } = useGridViewContext();
    
    function reset(){
        resetSortAndInitData();
        dispatch(clearClickItemR());


    }
    function resetSortAndInitData(){
        dispatch(clearColsSortR());
        resetInitData();
    }

    function resetInitData(){
        dispatch(setResetDataR(true));
    }
    return (
        <ControlBox gridhover={gridHover}>
            <div title="重製排序" onClick={() => resetSortAndInitData()}>⥯</div>
            <div title="資料重整" onClick={() => reset()}>↻</div>
        </ControlBox>
    );
}

export default ControlBar;