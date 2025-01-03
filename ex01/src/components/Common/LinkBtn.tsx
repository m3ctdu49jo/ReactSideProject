import { HtmlHTMLAttributes } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface BtnProps {

}

const Btn = styled.div<BtnProps>`
    text-align: center;
    margin-right: auto;
    margin-bottom: auto;
    a {
        color: #fff;
        display: inline-block;
        background: #7ead47;
        margin-top: 2rem;
        margin-left: 1rem;
        padding: .6rem .8rem;
        border-radius: 5px;
    }
`;

interface LinkBtnProps {
    text: string;
    to: string;
    marginCenter?: boolean;
}

function LinkBtn({text, to}: LinkBtnProps) {

    return (
        <Btn>
            <Link to={to}>{text}</Link>
        </Btn>
    );
}

export default LinkBtn;