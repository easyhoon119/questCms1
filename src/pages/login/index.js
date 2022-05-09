import AuthBox from "../../components/authBox";
import { PageInner, PageWrap } from "../../styles/commonStyle";

function LoginPage() {
    return (
        <PageWrap>
            <PageInner>
                <AuthBox title="로그인" />
            </PageInner>
        </PageWrap>
    );
}

export default LoginPage;
