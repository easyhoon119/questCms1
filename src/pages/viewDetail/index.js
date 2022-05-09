import Header from "../../components/header";
import { PageInner, PageWrap } from "../../styles/commonStyle";
import DetailContent from "./viewDetailComponents/detailContent";

function ViewDetailPage() {
    return (
        <PageWrap>
            <PageInner>
                <Header title="상세보기 페이지" />
                <DetailContent />
            </PageInner>
        </PageWrap>
    );
}

export default ViewDetailPage;
