import styled from "styled-components";
import AuthBtn from "./authBtn";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import firestore from "../services/firebase";
import { addDoc, collection } from "firebase/firestore";
import { async } from "@firebase/util";

function AuthBox({ title }) {
    const [phoneNumber, setPhoneNumber] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm();
    const password = useRef({});
    password.current = watch("password", "");

    const onCheckPhone = (e) => {
        console.log(errors);
        setPhoneNumber(
            e.target.value.replace(/^(\d{3})(\d{4})(\d{4})$/, `$1-$2-$3`)
        );
    };

    const onSaveUserInfo = async (data) => {
        console.log(data);
        console.log(location.pathname);
        if (location.pathname === "/signUp") {
            const docRef = await addDoc(collection(firestore, "auth"), data);
            console.log(docRef.id);
            navigate("/list");
        }
    };

    return (
        <AuthBoxStyle>
            <div className="authBox-title">
                <p>{title}</p>
            </div>
            <div className="auth-container">
                <form onSubmit={handleSubmit((data) => onSaveUserInfo(data))}>
                    <div className="auth-email auth-content">
                        <label>id</label>
                        <input
                            {...register("id", {
                                required: true,
                                pattern: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/,
                            })}
                            type="text"
                        />
                    </div>
                    <p className="error-check">
                        {errors.id?.type === "required" && "id is required"}
                    </p>
                    <p className="error-check">
                        {errors.id?.type === "pattern" &&
                            "please check your id pattern"}
                    </p>
                    <div className="auth-password auth-content">
                        <label>password</label>
                        <input
                            {...register("password", {
                                required: true,
                                pattern:
                                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                            })}
                            type="text"
                        />
                    </div>
                    <p className="error-check">
                        {errors.password?.type === "required" &&
                            "password is required"}
                    </p>
                    <p className="error-check">
                        {errors.password?.type === "pattern" &&
                            "please check your password pattern"}
                    </p>
                    {title === "회원가입" ? (
                        <>
                            <div className="auth-passwordCheck auth-content">
                                <label>passwordCheck</label>
                                <input
                                    {...register("passwordCheck", {
                                        required: true,
                                        validate: (value) =>
                                            value === password.current ||
                                            "The passwords do not match",
                                    })}
                                    type="text"
                                />
                            </div>
                            <p className="error-check">
                                {errors.passwordCheck?.type === "required" &&
                                    "passwordCheck is required"}
                            </p>
                            <p className="error-check">
                                {errors.passwordCheck?.type === "validate" &&
                                    "passwordCheck do not match password"}
                            </p>
                            <div className="auth-job auth-content">
                                <label>job</label>
                                <select {...register("job")}>
                                    <option value="개발자">개발자</option>
                                    <option value="기획자">기획자</option>
                                    <option value="디자이너">디자이너</option>
                                </select>
                            </div>
                            <div className="auth-nickname auth-content">
                                <label>nickname</label>
                                <input
                                    {...register("nickname", {
                                        required: true,
                                        pattern:
                                            /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/,
                                    })}
                                    type="text"
                                />
                            </div>
                            <p className="error-check">
                                {errors.nickname?.type === "required" &&
                                    "nickname is required"}
                            </p>
                            <p className="error-check">
                                {errors.nickname?.type === "pattern" &&
                                    "please check your nickname pattern"}
                            </p>
                            <div className="auth-email auth-content">
                                <label>email</label>
                                <input
                                    {...register("email", {
                                        required: true,
                                        pattern:
                                            /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                                    })}
                                    type="text"
                                />
                            </div>
                            <p className="error-check">
                                {errors.email?.type === "required" &&
                                    "email is required"}
                            </p>
                            <p className="error-check">
                                {errors.email?.type === "pattern" &&
                                    "please check your email pattern"}
                            </p>
                            <div className="auth-phone auth-content">
                                <label>phone</label>
                                <input
                                    value={phoneNumber}
                                    {...register("phone", {
                                        required: true,
                                        pattern: /^\d{3}-\d{3,4}-\d{4}$/,
                                    })}
                                    type="text"
                                    onChange={onCheckPhone}
                                />
                            </div>
                            <p className="error-check">
                                {errors.phone?.type === "required" &&
                                    "phone is required"}
                            </p>
                            <p className="error-check">
                                {errors.phone?.type === "pattern" &&
                                    "please check your phone pattern"}
                            </p>

                            <div className="auth-userInfo auth-agree">
                                <label>개인정보 수집 동의</label>
                                <input
                                    type="checkbox"
                                    {...register("userInfo.0.Info", {
                                        required: true,
                                    })}
                                />
                            </div>

                            {errors?.userInfo && (
                                <p className="error-check">
                                    this checkbox is required
                                </p>
                            )}

                            <div className="auth-marketing auth-agree">
                                <label>마케팅 정보 동의</label>
                                <input
                                    type="checkbox"
                                    {...register("userInfo.1.marketing")}
                                />
                            </div>
                            <div className="auth-advertise auth-agree">
                                <label>광고 활용 동의</label>
                                <input
                                    type="checkbox"
                                    {...register("userInfo.2.advertise")}
                                />
                            </div>
                        </>
                    ) : (
                        ""
                    )}
                    <AuthBtn type="submit" content={title} backColor="green" />
                </form>
                <AuthBtn
                    type=""
                    content={title === "회원가입" ? "뒤로가기" : "회원가입"}
                    backColor="lightblue"
                />
            </div>
        </AuthBoxStyle>
    );
}

const AuthBoxStyle = styled.div`
    background-color: darkgray;
    width: 30rem;
    margin: 0 auto;
    margin-top: 2rem;
    border-radius: 1rem;
    padding: 1rem 1rem;

    .authBox-title {
        font-weight: bold;
        font-size: 1.5rem;
        margin-bottom: 1.5rem;

        p {
            width: 100%;
            text-align: center;
        }
    }

    .auth-container {
        width: 100%;
        background-color: whitesmoke;
        border-radius: 1rem;
        padding: 1.2rem 1rem;

        .auth-content {
            display: flex;
            flex-direction: column;
            margin-bottom: 0.7rem;

            input,
            select {
                padding: 0.3rem;
            }
        }

        .error-check {
            color: red;
            margin-bottom: 0.7rem;
        }

        .auth-agree {
            width: 40%;
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.2rem;
        }
    }
`;

export default AuthBox;
