import { useEffect, useRef, useState } from "react";
import AlbumFlow from "../components/Common/AlbumFlow";
import Container from "../components/Common/Container";
import Title from "../components/Common/Title";

function fetchImgs(): string[] {
    let m: string[] = [];
    for(let i = 1;;) {
        if(i === 30)
            break;
        let n = Math.ceil(Math.random() * 10);

        m.push((n < 10 ? "img0" : "img") + n);

        i++;
    }
    return m;
}

function Album(){
    const [imgs, setImgs] = useState<string[]>([]);
    const [scrollTop, setScrollTop] = useState(0);
    const [addImgLoading, setAddImgLoading] = useState(false);
    const flowRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setImgs(fetchImgs());
    }, []);

    useEffect(() =>{
        function scrollMove(){
            setScrollTop(window.scrollY);
            if(flowRef.current?.scrollHeight && (window.scrollY + window.outerHeight) > flowRef.current?.scrollHeight && imgs.length < 150) {
                setAddImgLoading(true);
            }
            else{
                setAddImgLoading(false);
            }
            console.log(window.scrollY);
        }

        window.addEventListener("scroll", scrollMove);

        return () => { window.removeEventListener("scroll", scrollMove) };  // 取消註冊避免多次重複綁定事件
    }, []);

    useEffect(() => {
        if(addImgLoading && imgs.length < 150){
            setTimeout(() => {
                setImgs([...imgs, ...fetchImgs()]);
            }, 1000);
        } 
        else{
            setAddImgLoading(false);
        }
    }, [addImgLoading]);


    return (
        <Container>
            <Title title="Painting." enTitle="畫　廊" />
            <AlbumFlow ref={flowRef} imgList={imgs} ColumnCount={4} />
            {
                addImgLoading ? "Loading..." : "No more"
            }
        </Container>
    );
}

export default Album;