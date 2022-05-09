import styled from "styled-components";

function Header({ title }) {
    return (
        <HeaderStyle>
            <p>{title}</p>
        </HeaderStyle>
    );
}

const HeaderStyle = styled.div`
    width: 100%;
    padding: 1rem 1.5rem;
    background-color: blanchedalmond;

    p {
        font-weight: 500;
        font-size: 1.5rem;
        width: 100%;
        text-align: center;
    }
`;

export default Header;
