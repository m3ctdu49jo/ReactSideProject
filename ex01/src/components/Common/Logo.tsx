import { Link } from "react-router-dom";
import { styled } from "styled-components";

const LogoWrap = styled.div`
    color: #ffae00;
    font-size: 1.8rem;  
    font-family: Verdana, Geneva, Tahoma, sans-serif;

    a, &:hover {
        color: #ffae00;
    }
`;

function Logo() {
    return (
        <LogoWrap>
            <Link to="/">
                PATING ART. <i style={{color: "#ccc"}}>WEB</i>
            </Link>                        
        </LogoWrap>
    );
}

export default Logo;