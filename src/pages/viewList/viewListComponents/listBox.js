import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ListItem from "./listItem";

function ListBox({ item, id }) {
    const navigate = useNavigate();

    const onGoDetail = () => {
        navigate(`/list/${id}`);
    };

    return (
        <ListBoxStyle onClick={onGoDetail}>
            <ListItem name={item.id} />
            <ListItem name={item.email} />
            <ListItem name={item.nickname} />
            <ListItem name={item.job} />
        </ListBoxStyle>
    );
}

const ListBoxStyle = styled.div`
    width: 100%;
    height: 56px;
    background-color: whitesmoke;
    border-bottom: 1px solid darkgray;
    display: flex;
    cursor: pointer;
`;

export default ListBox;
