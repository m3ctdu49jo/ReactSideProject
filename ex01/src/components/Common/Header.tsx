import { Link } from "react-router-dom";
import style from "../../styles/style.module.css"
import { styled } from "styled-components";

const Menu = styled.ul`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;

    li {
        margin: 0 .5rem;
        a {
            color: #333;
            display: inline-block;
            padding: .5rem .8rem;

            &:hover {
                color: #356fb1;
            }
        }
    }
`;

const Header = () => {
    return (
        <>
            <div style={{padding: ".5rem 0", marginBottom: "1rem", borderBottom: "1px solid #ddd"}}>
                <Menu>
                    <li><Link to="/GridDetailTest">GridDetailTest</Link></li>
                    <li><Link to="/QuickSearchTest">QuickSearchTest</Link></li>
                </Menu>
            </div>
        </>
    );
}

export default Header;