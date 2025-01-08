import styled from "styled-components";
import style from "../styles/style.module.css";
import { Link } from "react-router-dom";
import LinkBtn from "../components/Common/LinkBtn";
import Footer from "../components/Common/Footer";
import Album from "../components/Common/Album";
import img from "../images/news/img01.jpg";
import Title from "../components/Common/Title";


const Banner = styled.div`
    background: #b7d2dd;
    height: 500px;
`;

const NewsSection = styled.section`
    ul {
        display: flex;
    }
    li {
        margin-right: 30px;

        a {
            display: flex;
            flex-direction: column;
            background: #f7f7f7;
            padding: 15px 15px 50px;
            position: relative;
            border-radius: 15px;

            i {
                color: #cc9650;
                position: absolute;
                bottom: 10px;
                right: 15px;

                &:after {
                    content: "";
                    display: block;
                    background: #cc9650;
                    height: 1px;
                    width: 50%;
                    bottom: -3px;
                    right: 0px;
                    position: absolute;
                }
            }

            strong {
                font-size: 1.1rem;
                margin-bottom: 1rem;
                text-decoration: underline;
            }

            div.img_box {
                background: #dfcab0;
                height: 250px;
                margin-bottom: 20px;
                border-radius: 15px;
            }

            p {
                font-size: .9rem;
                color: #999;
            }

            strong, p {
                display: block;
            }

            &:hover {
                background: #f3f3f3;

                i {
                    color: #ca6045;
                }
            }
        }

        &:last-child{
            margin-right: 0;
        }
    }
`;

const AboutSection = styled.section`
    display: flex;
    background: #f8f8f8;
    min-height: 450px;

    div.about_txt {
        width: 40%;
        padding: 80px
    }
    div.about_img {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f08137;
        width: 60%;

        div {
            background: #f5f5f5;
            height: 70%;
            width: 80%;
            box-shadow: 0 0 50px rgba(0, 0, 0, .3);
            border-radius: 30px;
        }
    }
`;

const AlbumSection = styled.section`

`;

const TextSection = styled.section`
`;

const Home = () => {
    return (
        <>
            <Banner style={{background: `url(${require("../images/home/banner.jpg")}) center center`}}></Banner>
            <NewsSection>
                <div className={style.container}>
                    <Title title="Messages." enTitle="新 訊 息" />
                    <ul>
                        <li>
                            <Link to="">
                                <i>December 24</i>
                                <strong>聖誕平安夜到來，推出全新畫作</strong>
                                <div className="img_box" style={{background: `url(${img}) center center`}}></div>
                                <p>12月20日推出聖誕畫作，根據不同的場景呈現出不同的聖誕歡樂意境。</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="">
                                <i>December 24</i>
                                <strong>聖誕平安夜到來，推出全新畫作</strong>
                                <div className="img_box" style={{background: `url(${require("../images/news/img02.jpg")}) center center`}}></div>
                                <p>12月20日推出聖誕畫作，根據不同的場景呈現出不同的聖誕歡樂意境。</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="">
                                <i>December 24</i>
                                <strong>聖誕平安夜到來，推出全新畫作</strong>
                                <div className="img_box" style={{background: `url(${require("../images/news/img03.jpg")}) center center`}}></div>
                                <p>12月20日推出聖誕畫作，根據不同的場景呈現出不同的聖誕歡樂意境。</p>
                            </Link>
                        </li>
                    </ul>
                    <LinkBtn text="更多消息" to="/news" />
                </div>
            </NewsSection>
            
            <AboutSection>
                <div className="about_img">
                    <div style={{background: `url(${require("../images/home/about.jpg")}) center center`, backgroundSize: "cover"}}></div>
                </div>
                <div className="about_txt">
                <Title title="Painting." enTitle="關　於" />
                    <p className={style.arti_line_height}>致力於藝術呈現與文化交流的空間。透過藝術連結每一顆熱愛創作與美的心靈，並為社會帶來啟發與感動。</p>  
                    <p className={style.arti_line_height}>藝術不僅是視覺的享受，更是思想的碰撞與心靈的共鳴。從傳統油畫到當代數位藝術，竭誠為藝術家提供展現創意的平台，並為每一位訪客打造身臨其境的藝術旅程。</p>  
                    <p className={style.arti_line_height}>與本地藝術家密切合作，同時積極引進國際知名藝術家的作品，將世界藝術潮流帶進您的眼前。</p>  
                    <p className={style.arti_line_height}>藝術的力量可以跨越語言、文化與時間的界限，為人們帶來無限的可能性。未來，我們將繼續致力於成為藝術創作者與愛好者的橋樑，推動藝術在社會中的普及與影響力。</p>  
                </div>
            </AboutSection>

            <AlbumSection>
                <Album />
            </AlbumSection>

            <TextSection>
                <div className={style.container}>
                <Title title="Presentation." enTitle="畫廊演說" />
                    <p className={style.arti_line_height}>畫廊是展示藝術作品的空間，更是藝術家與觀眾交流的平台。透過展覽、講座等活動，畫廊促進了藝術文化的傳播，提升公眾對藝術的認識與欣賞能力。</p>
                    <p className={style.arti_line_height}>此外，畫廊在藝術市場中扮演著重要角色。它們為藝術家提供展示與銷售作品的機會，同時為收藏家和投資者提供專業的建議與服務。</p>  
                </div>
            </TextSection>
        </>
    );
}

export default Home;