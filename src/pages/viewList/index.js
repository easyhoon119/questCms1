import Header from "../../components/header";
import { PageInner, PageWrap } from "../../styles/commonStyle";
import ListContent from "./viewListComponents/listContent";

function ViewListPage() {
    return (
        <PageWrap>
            <PageInner>
                <Header title="리스트 페이지" />
                <ListContent />
            </PageInner>
        </PageWrap>
    );
}

export default ViewListPage;
