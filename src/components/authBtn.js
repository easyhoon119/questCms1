import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function AuthBtn({ type, content, backColor }) {
    const navigate = useNavigate();

    const onGoSignUp = () => {
        if (type !== "submit") {
            if (content === "뒤로가기") {
                navigate("/");
            } else {
                navigate("/signUp");
            }
        }
    };

    return (
        <AuthBtnStyle type={type} backColor={backColor} onClick={onGoSignUp}>
            <p>{content}</p>
        </AuthBtnStyle>
    );
}

const AuthBtnStyle = styled.button`
    background-color: ${(props) => props.backColor};
    width: 100%;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0.5rem;
    padding: 0.5rem;
    border: none;
    cursor: pointer;
    font-weight: bold;
    ${(props) => (props.type === "submit" ? "margin-bottom : 0.5rem;" : "")}
`;

export default AuthBtn;
