import React, { forwardRef, useEffect, useState } from "react";
import styled from "styled-components";

const AlbumBox = styled.div`
    display: flex;
    justify-content: space-between;

    & > div {
        padding: 0 10px;
        width: 100%;

        div {
            padding: 10px 0;
            transition: all 0.5s ease-in;

            img {
                width: 100%;
                max-width: 100%;
                border-radius: 25px;
            }
        }
        
    }

`;

interface AlbumProps {
    ColumnCount?: number;
    imgList: string[];
    ref?: React.MutableRefObject<HTMLDivElement | null>
}

const AlbumFlow = forwardRef<HTMLDivElement, AlbumProps>(({imgList, ColumnCount = 3}, ref) => {    
    const [groups, setGroups] = useState<string[][]>([]);

    useEffect(() => {
        let imgs = [...imgList];
        let groupLength = ColumnCount;
        let groupArr: string[][] = [];
        for (let i = 0;;) {
            if(imgs.length - 1 > i){
                if(i < groupLength){
                    groupArr.push([imgs[i]]);
                } else {
                    let curgp = (i % groupLength) - 1;
                    curgp = curgp === -1 ? groupLength - 1 : curgp;
                    groupArr[curgp] = [...groupArr[curgp], imgs[i]];
                }
            }else{
                break;
            }
            i++;
        }
        setGroups(groupArr);
    }, [ColumnCount, imgList]);
    

    return (
        <AlbumBox ref={ref}>
            {
                groups.map((x, gindex) => {
                    let imgs: string[] = x;

                    let s = imgs.map((u, index) => <div key={index+u}><img src={require(`../../images/album/${u}.jpg`)} /></div>)
                    
                    return <div key={gindex}>{s}</div>
                })
            }
        </AlbumBox>
    );
});

export default AlbumFlow;