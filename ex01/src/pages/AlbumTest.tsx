import styled from "styled-components";
import Album from "../components/Common/Album";

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
}

function AlbumTest({ColumnCount = 3, imgList}: AlbumProps){
    // let imgs = ["img01", "img03", "img01", "img03", "img03", 
    //     "img03", "img01", "img03", "img01", "img03"];
    let imgs = [...imgList];
    let groupLength = ColumnCount;
    let groups: any[] = [];
    
    
    for (let i = 0;;) {
        if(imgs.length - 1 > i){
            if(i < groupLength){
                groups.push([imgs[i]]);
            } else {
                let curgp = (i % groupLength) - 1;
                curgp = curgp === -1 ? groupLength - 1 : curgp;
                groups[curgp] = [...groups[curgp], imgs[i]];
            }
        }else{
            break;
        }
        i++;
    }

    return (
        <AlbumBox>
            {
                groups.map((x, gindex) => {
                    let imgs: string[] = x;

                    let s = imgs.map((u, index) => <div key={index+u}><img src={require(`../images/album/${u}.jpg`)} /></div>)
                    
                    return <div key={gindex}>{s}</div>
                })
            }
        </AlbumBox>
    );
}

export default AlbumTest;