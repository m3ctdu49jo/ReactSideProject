import styled from "styled-components";
import style from "../../styles/style.module.css"
import { Link } from "react-router-dom";
import Logo from "./Logo";

const FooterWrap = styled.div`
    background: #fffdf8;
`;

const Copyright = styled.div`
    font-size: .8rem;
    color: #fff;
    text-align: center;
    background: #95b679;
    padding: 1rem 0;
`;

const FooterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const LogoBox = styled.div`

    p {
        color: #999;
        font-size: .85rem;
    }
`;

const MenuBox = styled.div`
    ul {
        display: flex;
    }
    li {
        margin-left: 15px;
    }
`;



function Footer(){
    return (
        <FooterWrap>
            <Copyright>
                Copyright © SAMPLEWEB All Rights Reserved.
            </Copyright>
            <FooterContainer className={style.container}>
                <LogoBox>
                    <Logo />
                    <p>TEL 04-768888866</p>
                    <p>FAX 04-768888868</p>
                </LogoBox>                
                <MenuBox>
                    <ul>
                        <li><Link to="">關於我們</Link></li>
                        <li><Link to="">最新消息</Link></li>
                        <li><Link to="">畫　廊</Link></li>
                        <li><Link to="">聯絡我們</Link></li>
                    </ul>
                </MenuBox>
            </FooterContainer>
        </FooterWrap>
    );
}

export default Footer;