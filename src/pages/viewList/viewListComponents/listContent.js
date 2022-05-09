import ListBox from "./listBox";
import styled from "styled-components";
import ListItem from "./listItem";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import firestore from "../../../services/firebase";
import { useNavigate } from "react-router-dom";

function ListContent() {
    const [listData, setListData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFire = async () => {
            const docRef = collection(firestore, "auth");
            const docSnap = await getDocs(docRef);
            let dummyList = [];

            docSnap.forEach((doc) => {
                dummyList.push([{ id: doc.id, data: doc.data() }]);
            });

            setListData(dummyList);
        };

        fetchFire();
    }, []);

    return (
        <ListContentStyle>
            <div className="listHeader">
                <ListItem name="아이디" />
                <ListItem name="이메일" />
                <ListItem name="닉네임" />
                <ListItem name="직업" />
            </div>
            {listData.length === 0 && <p>...로딩중</p>}
            {listData?.map((item) => (
                <ListBox key={item[0].id} item={item[0].data} id={item[0].id} />
            ))}
            <button
                onClick={() => {
                    navigate("/signUp");
                }}
                className="go-signUp"
            >
                회원가입
            </button>
        </ListContentStyle>
    );
}

const ListContentStyle = styled.div`
    & > div:not(:first-child):hover {
        background-color: lightgrey;
    }

    .listHeader {
        width: 100%;
        height: 60px;
        background-color: darkgray;
        display: flex;

        & > div:not(:last-child) {
            border-right: 1px solid black;
        }
    }

    .go-signUp {
        margin-top: 0.5rem;
    }
`;

export default ListContent;
