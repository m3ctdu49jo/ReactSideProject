import styled from "styled-components";
import style from "../styles/style.module.css";
import { Link } from "react-router-dom";
const Banner = styled.div`
    
`;
const SectionTitle = styled.div`
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    font-size: 2.3rem;
    text-align: center;
    padding: 20px 0;
`;

const NewsSection = styled.section`
    ul {
        display: flex;
    }
    li {
        margin-right: 20px;

        a {
            display: flex;
            flex-direction: column;
            background: #f7f7f7;
            padding: 15px 15px 30px;
            position: relative;
            border-radius: 15px;

            i {
                color: #cc9650;
                position: absolute;
                bottom: -10px;
                right: 15px;

                &:after {
                    content: "";
                    display: block;
                    background: #cc9650;
                    height: 1px;
                    width: 50px;
                    bottom: -3px;
                    left: 0;
                    position: absolute;
                }
            }

            strong {
                font-size: 1.1rem;
                margin-bottom: 1rem;
                text-decoration: underline;
            }

            p {
                font-size: .9rem;
                color: #aaa;
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
    background: #f8f8f8;
    height: 450px;
`;

const AlbumSection = styled.section`

`;

const TextSection = styled.section`
`;

const Home = () => {
    return (
        <>
            <Banner></Banner>
            <NewsSection>
                <div className={style.container}>
                    <SectionTitle>News</SectionTitle>
                    <ul>
                        <li>
                            <Link to="">
                                <i>December 24</i>
                                <strong>聖誕平安夜到來，推出全新畫作</strong>
                                <p>12月20日推出聖誕畫作，根據不同的場景呈現出不同的聖誕歡樂意境。</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="">
                                <i>December 24</i>
                                <strong>聖誕平安夜到來，推出全新畫作</strong>
                                <p>12月20日推出聖誕畫作，根據不同的場景呈現出不同的聖誕歡樂意境。</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="">
                                <i>December 24</i>
                                <strong>聖誕平安夜到來，推出全新畫作</strong>
                                <p>12月20日推出聖誕畫作，根據不同的場景呈現出不同的聖誕歡樂意境。</p>
                            </Link>
                        </li>
                    </ul>
                </div>
            </NewsSection>
            
            <AboutSection>
                <div className={style.container}>
                    <SectionTitle>About</SectionTitle>
                    <p className={style.arti_line_height}>畫廊不僅是展示藝術作品的空間，更是藝術家與觀眾交流的平台。透過展覽、講座等活動，畫廊促進了藝術文化的傳播，提升公眾對藝術的認識與欣賞能力。</p>
                    <p className={style.arti_line_height}>此外，畫廊在藝術市場中扮演著重要角色。它們為藝術家提供展示與銷售作品的機會，同時為收藏家和投資者提供專業的建議與服務。</p>  
                </div>
            </AboutSection>

            <AlbumSection>
                <div className={style.container}>
                    <SectionTitle>Album</SectionTitle>
                </div>
            </AlbumSection>

            <TextSection>
                <div className={style.container}>
                    <SectionTitle>畫廊</SectionTitle>
                    <p>畫廊不僅是展示藝術作品的空間，更是藝術家與觀眾交流的平台。透過展覽、講座等活動，畫廊促進了藝術文化的傳播，提升公眾對藝術的認識與欣賞能力。</p>
                    <p>此外，畫廊在藝術市場中扮演著重要角色。它們為藝術家提供展示與銷售作品的機會，同時為收藏家和投資者提供專業的建議與服務。</p>  
                </div>
            </TextSection>

        </>
    );
}

export default Home;