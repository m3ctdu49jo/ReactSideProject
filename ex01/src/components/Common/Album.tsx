import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

const AlbumWrap = styled.div`
    height: 500px;
    position: relative;
`;

const LiBox = styled.div<LiBoxProp>`
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;    
    visibility: ${props => props.$showImg ? "visible" : "hidden"};
    opacity: ${props => props.$showImg ? "1" : "0"};
    transition:  opacity 1.5s ease-in, visibility 1.5s ease;

    div {
        width: 100%;
        height: 500px;
    }
`;

interface LiBoxProp {
    $showImg: boolean;
}

function Album(){
    const [currentImgIndex, setCurrentImgIndex] = useState(0);
    const imgs = ["#eee", "#ddffff", "#f7edb9"];

    

    useEffect(() => {
        const times = setInterval(() => {
            let n = imgs.length === currentImgIndex + 1 ? 0 : currentImgIndex + 1;
            //console.log(n);
            setCurrentImgIndex(n);
        }, 5000);

        return () => { clearInterval(times) };
    }, [currentImgIndex]);


    return (
        <AlbumWrap>
            <ul>
                {
                    imgs.map((img, index) => {
                        return (                            
                            <LiBox key={img + index} $showImg={currentImgIndex === index}>
                                <div style={{background: img}}>
                                    <img src="" />
                                </div>
                            </LiBox>
                        );
                    })
                }
            </ul>
        </AlbumWrap>
    );
}

export default Album;