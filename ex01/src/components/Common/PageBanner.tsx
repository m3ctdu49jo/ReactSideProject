import { styled } from "styled-components";

const Banner = styled.div`
    background: #b7d2dd;
    height: 500px;
`;

function PageBanner({imgURL}: {imgURL: string}){
    return (
        <Banner style={{background: `url(${imgURL}) center center`}}></Banner>
    );
}

export default PageBanner;