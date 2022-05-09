import styled from "styled-components";

function ListItem({ name }) {
    return <ListItemStyle>{name}</ListItemStyle>;
}

const ListItemStyle = styled.div`
    width: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default ListItem;
