import AuthBox from "../../components/authBox";
import { PageInner, PageWrap } from "../../styles/commonStyle";

function SignUpPage() {
    return (
        <PageWrap>
            <PageInner>
                <AuthBox title="회원가입" />
            </PageInner>
        </PageWrap>
    );
}

export default SignUpPage;
