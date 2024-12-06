import styled from "styled-components";
import { QuickSearch } from "../components/QuickSelect";
import ProductQuickSearch from "../components/QuickSelect/ProductQuickSearch";
import React, { useEffect, useRef, useState } from "react";

const QuickInput = styled.input``;

export default function QuickSearchTest(){
    const [quickValue, setQuickValue] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement | null>(null);

    function onQuickValue(value: string[]){
        setQuickValue(value);
    }

    useEffect(() => {
        if(inputRef.current && quickValue?.length > 0)
            inputRef.current.value = quickValue[0];
    }, [quickValue]);

    return (
        <>
            選取值: <QuickInput ref={inputRef} />
            {/* <QuickSearch /> */}
            <ProductQuickSearch getKeyValue={["unitPrice", "name"]} getQuickValue={onQuickValue}></ProductQuickSearch>
        </>
    )
}
