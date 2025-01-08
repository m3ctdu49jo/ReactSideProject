import { styled } from "styled-components";

const SectionTitle = styled.div`
    color: #c3d09b;
    font-size: 2.5rem;
    display: flex;
    justify-content: center;
    padding: 20px 50px;
    div {
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        text-align: center;
        p {
            color: #ceaa54;
            font-size: 1.5rem;
            position: relative;

            &:after, &:before {
                position: absolute;
                top: 0;
                bottom: 0;
                margin-top: auto;
                margin-bottom: auto;
            }
            &:after {
                color: #c480c4;
                content: "╚╗";
                left: -50px;
            }

            &:before {
                color: #bd8181;
                content: "╔╝";
                right: -50px;
            }
        }
    }
`;

function Title({title, enTitle}:{title: string, enTitle: string}) {
    return (
        <SectionTitle><div>{title}<p>{enTitle}</p></div></SectionTitle>
    );
}

export default Title;