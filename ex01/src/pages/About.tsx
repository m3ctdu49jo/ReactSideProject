import Container from "../components/Common/Container"
import PageBanner from "../components/Common/PageBanner";
import Title from "../components/Common/Title";
import style from "../styles/style.module.css"

function About(){
    return (
        <>
            <PageBanner imgURL={require("../images/home/banner.jpg")} />
            <Container>
                <Title title="Painting." enTitle="關　於" />
                <p className={style.arti_line_height}>致力於藝術呈現與文化交流的空間。透過藝術連結每一顆熱愛創作與美的心靈，並為社會帶來啟發與感動。</p>  
                <p className={style.arti_line_height}>藝術不僅是視覺的享受，更是思想的碰撞與心靈的共鳴。從傳統油畫到當代數位藝術，竭誠為藝術家提供展現創意的平台，並為每一位訪客打造身臨其境的藝術旅程。</p>  
                <p className={style.arti_line_height}>與本地藝術家密切合作，同時積極引進國際知名藝術家的作品，將世界藝術潮流帶進您的眼前。</p>  
                <p className={style.arti_line_height}>藝術的力量可以跨越語言、文化與時間的界限，為人們帶來無限的可能性。未來，我們將繼續致力於成為藝術創作者與愛好者的橋樑，推動藝術在社會中的普及與影響力。</p>  
            </Container>
        </>
    );
}

export default About;