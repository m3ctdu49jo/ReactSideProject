import { Link } from "react-router-dom";
import style from "../../styles/style.module.css"
import { styled } from "styled-components";

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
const Logo = styled.div`
    color: #ffae00;
    font-size: 1.8rem;  
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;

    a, &:hover {
        color: #ffae00;
    }
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
                    <Logo>
                        <Link to="/">
                            SAMPLE<i style={{color: "#ccc"}}>WEB</i>
                        </Link>                        
                    </Logo>
                    <div style={{paddingLeft: "20px"}}>
                        <Menu>
                            <li><Link to="/GridDetailTest">GridDetailTest</Link></li>
                            <li><Link to="/QuickSearchTest">QuickSearchTest</Link></li>
                        </Menu>
                    </div>
                </HeaderWrap>
            </HeaderBox>
        </>
    );
}

export default Header;