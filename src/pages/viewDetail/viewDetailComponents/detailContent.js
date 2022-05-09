import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import firestore from "../../../services/firebase";
import DetailBox from "./detailBox";

function DetailContent() {
    const location = useLocation();
    const [detailData, setDetailData] = useState([]);
    const [objectData, setObjectData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFire = async () => {
            const docRef = collection(firestore, "auth");
            const oneDoc = doc(docRef, location.pathname.split("/")[2]);
            const docSnap = await getDoc(oneDoc);

            console.log(docSnap.data());
            setObjectData(docSnap.data());
            console.log(Object.entries(docSnap.data()).sort());
            setDetailData(Object.entries(docSnap.data()).sort());
        };

        fetchFire();
    }, []);

    return (
        <DetailContentStyle>
            {detailData.length === 0 && <p>...loading</p>}
            {detailData?.map(
                (item, index) =>
                    item[0] !== "passwordCheck" && (
                        <DetailBox
                            key={index}
                            data={item}
                            objectData={objectData}
                            detailData={detailData}
                            setData={setDetailData}
                        />
                    )
            )}
            <button
                onClick={() => {
                    navigate("/list");
                }}
                className="back-button"
            >
                뒤로가기
            </button>
        </DetailContentStyle>
    );
}

const DetailContentStyle = styled.div`
    width: 100%;
    padding: 3rem 3rem;
    background-color: white;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 6rem;
    column-gap: 8rem;

    button {
        cursor: pointer;
    }

    .back-button {
        width: 100%;
        height: 3rem;
    }
`;

export default DetailContent;
