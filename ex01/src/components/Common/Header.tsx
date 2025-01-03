import { Link } from "react-router-dom";
import style from "../../styles/style.module.css"
import { styled } from "styled-components";
import Logo from "./Logo";

const HeaderBox = styled.header`
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    padding: 15px 0;
    border-bottom: 1px solid #ddd;
`;

const HeaderWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px !important;
    padding-bottom: 20px !important;
`;

const Menu = styled.ul`
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;

    li {
        a {
            color: #333;
            display: inline-block;
            padding: .5rem .8rem;
            margin-left: 15px;

            &:hover {
                color: #356fb1;
            }
        }
    }
`;

const Header = () => {
    return (
        <>
            <HeaderBox>
                <HeaderWrap className={style.container}>
                    <Logo />
                    <div style={{paddingLeft: "20px"}}>
                        <Menu>
                            <li><Link to="">關於我們</Link></li>
                            <li><Link to="">最新消息</Link></li>
                            <li><Link to="">畫　廊</Link></li>
                            <li><Link to="">聯絡我們</Link></li>
                        </Menu>
                    </div>
                </HeaderWrap>
            </HeaderBox>
        </>
    );
}

export default Header;