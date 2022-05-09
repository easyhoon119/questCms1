import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import firestore from "../../../services/firebase";
import { useLocation } from "react-router-dom";

function DetailBox({ data, objectData, detailData, setData }) {
    const [phoneNumber, setPhoneNumber] = useState("");
    const location = useLocation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [modify, setModify] = useState(false);

    const onHideModify = () => {
        setModify(!modify);
    };

    const onCheckPhone = (e) => {
        setPhoneNumber(
            e.target.value.replace(/^(\d{3})(\d{4})(\d{4})$/, `$1-$2-$3`)
        );
    };

    const onSubmitModify = async (datas, title) => {
        const newArray = [];
        detailData.forEach((item) => {
            if (item[0] === title) {
                newArray.push([title, datas]);
            } else {
                newArray.push(item);
            }
        });
        try {
            await setDoc(
                doc(firestore, "auth", location.pathname.split("/")[2]),
                { ...objectData, [title]: datas }
            );
        } catch (error) {
            console.log(error);
        }

        setData(newArray);
    };

    return (
        <DetailBoxStyle title={data[0]}>
            <div className="detail-box-upper">
                <p className="detail-box-title">{data[0]} : </p>
                <div>
                    {data[0] === "userInfo"
                        ? data[1].map((item, index) => (
                              <p key={index}>
                                  {Object.keys(item)[0]} :{" "}
                                  {item[Object.keys(item)[0]].toString()}
                              </p>
                          )) || "정보 없음"
                        : data[0] === "password"
                        ? data[1].replace(data[1].substr(0, 3), "***") ||
                          "정보 없음"
                        : data[1] || "정보 없음"}{" "}
                </div>
                <button onClick={onHideModify}>수정</button>
            </div>
            {modify &&
                (data[0] === "email" ? (
                    <div className="detail-box-modify">
                        <form
                            onSubmit={handleSubmit((data) => {
                                onSubmitModify(data.email, "email");
                            })}
                        >
                            <input
                                {...register("email", {
                                    required: true,
                                    pattern:
                                        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                                })}
                                type="text"
                            />
                            <div className="button-group">
                                <button type="submit">확인</button>
                                <button type="button" onClick={onHideModify}>
                                    접기
                                </button>
                            </div>
                        </form>
                        <p className="error-check">
                            {errors.email?.type === "required" &&
                                "email is required"}
                        </p>
                        <p className="error-check">
                            {errors.email?.type === "pattern" &&
                                "please check your email pattern"}
                        </p>
                    </div>
                ) : data[0] === "id" ? (
                    <div className="detail-box-modify">
                        <form
                            onSubmit={handleSubmit((data) => {
                                onSubmitModify(data.id, "id");
                            })}
                        >
                            <input
                                {...register("id", {
                                    required: true,
                                    pattern: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/,
                                })}
                                type="text"
                            />
                            <div className="button-group">
                                <button type="submit">확인</button>
                                <button type="button" onClick={onHideModify}>
                                    접기
                                </button>
                            </div>
                        </form>
                        <p className="error-check">
                            {errors.id?.type === "required" && "id is required"}
                        </p>
                        <p className="error-check">
                            {errors.id?.type === "pattern" &&
                                "please check your id pattern"}
                        </p>
                    </div>
                ) : data[0] === "nickname" ? (
                    <div className="detail-box-modify">
                        <form
                            onSubmit={handleSubmit((data) => {
                                onSubmitModify(data.nickname, "nickname");
                            })}
                        >
                            <input
                                {...register("nickname", {
                                    required: true,
                                    pattern: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/,
                                })}
                                type="text"
                            />
                            <div className="button-group">
                                <button type="submit">확인</button>
                                <button type="button" onClick={onHideModify}>
                                    접기
                                </button>
                            </div>
                        </form>
                        <p className="error-check">
                            {errors.nickname?.type === "required" &&
                                "nickname is required"}
                        </p>
                        <p className="error-check">
                            {errors.nickname?.type === "pattern" &&
                                "please check your nickname pattern"}
                        </p>
                    </div>
                ) : data[0] === "job" ? (
                    <div className="detail-box-modify">
                        <form
                            onSubmit={handleSubmit((data) => {
                                onSubmitModify(data.job, "job");
                            })}
                        >
                            <select {...register("job")}>
                                <option value="개발자">개발자</option>
                                <option value="기획자">기획자</option>
                                <option value="디자이너">디자이너</option>
                            </select>
                            <div className="button-group">
                                <button type="submit">확인</button>
                                <button type="button" onClick={onHideModify}>
                                    접기
                                </button>
                            </div>
                        </form>
                    </div>
                ) : data[0] === "password" ? (
                    <div className="detail-box-modify">
                        <form
                            onSubmit={handleSubmit((data) => {
                                onSubmitModify(data.password, "password");
                            })}
                        >
                            <input
                                {...register("password", {
                                    required: true,
                                    pattern:
                                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                                })}
                                type="text"
                            />
                            <div className="button-group">
                                <button type="submit">확인</button>
                                <button type="button" onClick={onHideModify}>
                                    접기
                                </button>
                            </div>
                        </form>
                        <p className="error-check">
                            {errors.password?.type === "required" &&
                                "password is required"}
                        </p>
                        <p className="error-check">
                            {errors.password?.type === "pattern" &&
                                "please check your password pattern"}
                        </p>
                    </div>
                ) : data[0] === "phone" ? (
                    <div className="detail-box-modify">
                        <form
                            onSubmit={handleSubmit((data) => {
                                onSubmitModify(data.phone, "phone");
                            })}
                        >
                            <input
                                value={phoneNumber}
                                {...register("phone", {
                                    required: true,
                                    pattern: /^\d{3}-\d{3,4}-\d{4}$/,
                                })}
                                type="text"
                                onChange={onCheckPhone}
                            />
                            <div className="button-group">
                                <button type="submit">확인</button>
                                <button type="button" onClick={onHideModify}>
                                    접기
                                </button>
                            </div>
                        </form>
                        <p className="error-check">
                            {errors.phone?.type === "required" &&
                                "phone is required"}
                        </p>
                        <p className="error-check">
                            {errors.phone?.type === "pattern" &&
                                "please check your phone pattern"}
                        </p>
                    </div>
                ) : (
                    <div className="detail-box-modify">
                        <form
                            onSubmit={handleSubmit((data) => {
                                onSubmitModify(data.userInfo, "userInfo");
                            })}
                        >
                            <div className="checkbox-agree-conatiner">
                                <div className="checkbox-agree">
                                    <label>개인정보 수집 동의</label>
                                    <input
                                        type="checkbox"
                                        {...register("userInfo.0.Info", {
                                            required: true,
                                        })}
                                    />
                                </div>
                                <div className="checkbox-agree">
                                    <label>마케팅 정보 동의</label>
                                    <input
                                        type="checkbox"
                                        {...register("userInfo.1.marketing")}
                                    />
                                </div>
                                <div className="checkbox-agree">
                                    <label>광고 활용 동의</label>
                                    <input
                                        type="checkbox"
                                        {...register("userInfo.2.advertise")}
                                    />
                                </div>
                            </div>

                            <div className="button-group">
                                <button type="submit">확인</button>
                                <button type="button" onClick={onHideModify}>
                                    접기
                                </button>
                            </div>
                        </form>
                        {errors?.userInfo && (
                            <p className="error-check">
                                information agree checkbox is required
                            </p>
                        )}
                    </div>
                ))}
        </DetailBoxStyle>
    );
}

const DetailBoxStyle = styled.div`
    width: 100%;

    .detail-box-upper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        ${(props) => (props.title === "userInfo" ? "align-items : start;" : "")}

        p.detail-box-title {
            width: 20%;
        }
    }

    .detail-box-modify {
        margin-top: 0.5rem;

        form {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        input,
        select {
            width: 45%;
        }

        .checkbox-agree-conatiner {
            width: 60%;
        }

        .error-check {
            color: red;
            margin-top: 0.5rem;
        }

        .button-group {
            display: flex;
            column-gap: 1rem;
        }

        .checkbox-agree {
            display: flex;
            width: 100%;

            label {
                width: 60%;
            }
        }
    }
`;

export default DetailBox;
